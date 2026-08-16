const fs = require('fs');

const teacherDashboardLogic = `
// @route GET /api/dashboard/teacher
exports.getTeacherDashboardSummary = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id)
            .populate({ path: 'assignedDivisions', populate: { path: 'classGroupId' } })
            .populate({ path: 'assignedSubjects', populate: { path: 'classGroupId' } });

        if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const divisionIds = teacher.assignedDivisions.map(d => d._id);
        const classGroupIds = [...new Set(teacher.assignedDivisions.map(d => d.classGroupId?._id?.toString()).filter(Boolean))];

        // 1. Student counts per division
        const studentCountsAggr = await Student.aggregate([
            { $match: { division: { $in: divisionIds }, status: 'active' } },
            { $group: { _id: "$division", count: { $sum: 1 } } }
        ]);
        const studentCountMap = {};
        let totalStudents = 0;
        studentCountsAggr.forEach(s => {
            studentCountMap[s._id.toString()] = s.count;
            totalStudents += s.count;
        });

        // 2. Attendance Marked Today count
        const todayAttendance = await Attendance.find({
            divisionId: { $in: divisionIds },
            date: { $gte: today, $lt: tomorrow }
        }).distinct('divisionId');
        
        // 3. Average Attendance this week
        const weekAttendance = await Attendance.aggregate([
            { $match: { divisionId: { $in: divisionIds }, date: { $gte: lastWeek, $lt: tomorrow } } },
            { $group: {
                _id: null,
                present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
                total: { $sum: 1 }
            }}
        ]);
        const averageAttendanceThisWeek = weekAttendance.length > 0 && weekAttendance[0].total > 0
            ? Math.round((weekAttendance[0].present / weekAttendance[0].total) * 100) : 0;

        // 4. Overall Attendance for My Classes
        const allTimeAttendance = await Attendance.aggregate([
            { $match: { divisionId: { $in: divisionIds } } },
            { $group: {
                _id: "$divisionId",
                present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
                total: { $sum: 1 }
            }}
        ]);
        const attnMap = {};
        allTimeAttendance.forEach(a => {
            attnMap[a._id.toString()] = a.total > 0 ? Math.round((a.present / a.total) * 100) : 0;
        });

        // 5. Recent Attendance Taken
        const recentAttdRaw = await Attendance.aggregate([
            { $match: { divisionId: { $in: divisionIds } } },
            { $group: {
                _id: { divisionId: "$divisionId", date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
                present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
                total: { $sum: 1 },
                actualDate: { $max: "$date" }
            }},
            { $sort: { actualDate: -1 } },
            { $limit: 5 }
        ]);

        const recentAttendance = recentAttdRaw.map(r => {
            const div = teacher.assignedDivisions.find(d => d._id.toString() === r._id.divisionId.toString());
            return {
                divisionId: r._id.divisionId,
                classGroupName: div ? div.classGroupId?.name : 'Unknown',
                divisionName: div ? div.name : 'Unknown',
                date: r._id.date,
                presentCount: r.present,
                totalCount: r.total,
                percentage: r.total > 0 ? Math.round((r.present / r.total) * 100) : 0
            };
        });

        // 6. Recent Marks Entry
        const recentMarksRaw = await Marks.aggregate([
            { $match: { divisionId: { $in: divisionIds } } },
            { $group: {
                _id: { examId: "$examId", subjectId: "$subjectId", divisionId: "$divisionId" },
                enteredAt: { $max: "$createdAt" },
                studentCount: { $sum: 1 }
            }},
            { $sort: { enteredAt: -1 } },
            { $limit: 5 }
        ]);

        const mongoose = require('mongoose');
        await mongoose.model('Exam').populate(recentMarksRaw, { path: '_id.examId', select: 'name' });
        await mongoose.model('Subject').populate(recentMarksRaw, { path: '_id.subjectId', select: 'name' });
        
        const recentMarksEntry = recentMarksRaw.map(r => {
            const div = teacher.assignedDivisions.find(d => d._id.toString() === r._id.divisionId.toString());
            return {
                examName: r._id.examId?.name || 'Unknown',
                subjectName: r._id.subjectId?.name || 'Unknown',
                divisionName: div ? div.name : 'Unknown',
                enteredAt: r.enteredAt,
                studentCount: r.studentCount
            };
        });

        // 7. Upcoming Exams
        const upcomingExamsRaw = await Exam.find({
            classGroupId: { $in: classGroupIds },
            startDate: { $gte: today }
        }).sort({ startDate: 1 }).limit(5).populate('classGroupId');

        const upcomingExams = upcomingExamsRaw.map(e => ({
            examName: e.name,
            classGroupName: e.classGroupId?.name || 'Unknown',
            startDate: e.startDate
        }));

        // 8. Notices
        const activeNotices = await Notice.find({
            targetAudience: { $in: ['all', 'teachers'] },
            $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: new Date() } }]
        }).sort({ isPinned: -1, createdAt: -1 }).limit(3);

        // 9. My Classes Formatted
        const myClasses = teacher.assignedDivisions.map(d => {
            const subjectNames = teacher.assignedSubjects
                .filter(s => s.classGroupId?._id?.toString() === d.classGroupId?._id?.toString())
                .map(s => s.name);
            return {
                divisionId: d._id,
                classGroupName: d.classGroupId?.name,
                divisionName: d.name,
                stream: d.classGroupId?.stream || '',
                subjectNames: subjectNames,
                studentCount: studentCountMap[d._id.toString()] || 0,
                attendancePercentage: attnMap[d._id.toString()] || 0
            };
        }).sort((a, b) => a.attendancePercentage - b.attendancePercentage);

        // 10. Pending Tasks
        const pendingTasks = [];
        teacher.assignedDivisions.forEach(d => {
            if (!todayAttendance.includes(d._id.toString())) {
                pendingTasks.push({
                    type: 'attendance',
                    label: \`Mark attendance — \${d.classGroupId?.name} \${d.name} (\${d.classGroupId?.stream || '-'})\`,
                    link: \`/teacher/attendance/mark?division=\${d._id}\`
                });
            }
        });
        
        const allRelevantExams = await Exam.find({ classGroupId: { $in: classGroupIds } });
        let pendingMarksEntryCount = 0;
        
        for (const exam of allRelevantExams) {
            const teacherSubjectsForGroup = teacher.assignedSubjects.filter(
                s => s.classGroupId?._id?.toString() === exam.classGroupId?.toString()
            );
            const teacherDivisionsForGroup = teacher.assignedDivisions.filter(
                d => d.classGroupId?._id?.toString() === exam.classGroupId?.toString()
            );

            for (const subject of teacherSubjectsForGroup) {
                for (const division of teacherDivisionsForGroup) {
                    const marksCount = await Marks.countDocuments({
                        examId: exam._id,
                        subjectId: subject._id,
                        divisionId: division._id
                    });
                    
                    const expectedStudents = studentCountMap[division._id.toString()] || 0;
                    if (expectedStudents > 0 && marksCount < expectedStudents) {
                        pendingMarksEntryCount++;
                        if (pendingTasks.length < 6) {
                            pendingTasks.push({
                                type: 'marks',
                                label: \`Enter marks — \${exam.name}, \${subject.name}, \${division.classGroupId?.name} \${division.name}\`,
                                link: \`/teacher/marks/enter?exam=\${exam._id}&subject=\${subject._id}&division=\${division._id}\`
                            });
                        }
                    }
                }
            }
        }

        res.json({
            success: true,
            data: {
                teacher: { name: teacher.name },
                summary: {
                    totalDivisions: teacher.assignedDivisions.length,
                    totalStudents: totalStudents,
                    attendanceMarkedToday: todayAttendance.length,
                    averageAttendanceThisWeek: averageAttendanceThisWeek,
                    pendingMarksEntryCount: pendingMarksEntryCount
                },
                myClasses: myClasses,
                recentAttendance: recentAttendance,
                recentMarksEntry: recentMarksEntry,
                pendingTasks: pendingTasks,
                upcomingExams: upcomingExams,
                notices: { recent: activeNotices }
            }
        });
    } catch (error) {
        console.error("Dashboard error", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
`;

let code = fs.readFileSync('controllers/dashboardController.js', 'utf8');
const startIdx = code.indexOf('exports.getTeacherDashboardSummary = async');
const endIdx = code.indexOf('exports.getStudentDashboardSummary', startIdx);
if (startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + teacherDashboardLogic + '\n' + code.substring(endIdx);
    fs.writeFileSync('controllers/dashboardController.js', code);
    console.log("Updated dashboardController.js");
} else {
    console.log("Could not find function markers.");
}
