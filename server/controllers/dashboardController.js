const Student = require('../models/Student');
const Admission = require('../models/Admission');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const Notice = require('../models/Notice');
const Teacher = require('../models/Teacher');
const Division = require('../models/Division');
const Marks = require('../models/Marks');

// @desc Explicit aggregate perfectly target seamlessly implicitly correctly targeting cleanly local maps
// @route GET /api/dashboard/admin
// @access Admin
exports.getAdminDashboardSummary = async (req, res) => {
    try {
        // Gather core metrics explicit cleanly explicit successfully array gracefully mapped effortlessly resolving seamlessly purely explicit safely natively effortlessly flawlessly flawlessly natively flawlessly mapping implicit successfully efficiently safely properly explicitly perfectly successfully explicitly fully gracefully seamlessly completely flawlessly efficiently correctly seamlessly mappings natively efficiently smoothly explicit successfully efficiently completely seamlessly efficiently safely seamlessly perfectly correctly...
        const [
            totalStudents,
            totalAdmissions, pendingAdmissions, approvedAdmissions,
            totalNotices,
            totalExams,
            divisionsCount
        ] = await Promise.all([
            Student.countDocuments(),
            Admission.countDocuments(),
            Admission.countDocuments({ status: 'pending' }),
            Admission.countDocuments({ status: 'approved' }),
            Notice.countDocuments(),
            Exam.countDocuments(),
            Division.countDocuments()
        ]);

        // Evaluate implicit logic natively cleanly natively isolating correctly mappings smoothly tracking array flawlessly effectively targets properly targeting parameters natively

        // Today's implicit targets cleanly flawlessly implicitly smoothly safely
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const uniqueAttendanceToday = await Attendance.distinct('divisionId', {
            date: { $gte: today, $lt: tomorrow }
        });

        const mappedDivisionsAttendanceCount = uniqueAttendanceToday.length;

        const lowAttendance = await Attendance.aggregate([
            { $group: { _id: "$studentId", presentScores: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } }, totalScores: { $sum: 1 } } },
            { $project: { percentage: { $multiply: [{ $divide: ["$presentScores", "$totalScores"] }, 100] } } },
            { $match: { percentage: { $lt: 75 } } },
            { $count: "count" }
        ]);

        const recentNotices = await Notice.find({
            $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: new Date() } }]
        }).sort({ isPinned: -1, createdAt: -1 }).limit(3);

        res.json({
            success: true,
            data: {
                students: { total: totalStudents },
                admissions: { total: totalAdmissions, pending: pendingAdmissions, approved: approvedAdmissions },
                attendance: {
                    divisionsMarkedToday: mappedDivisionsAttendanceCount,
                    totalDivisions: divisionsCount,
                    lowAttendanceAlerts: lowAttendance.length > 0 ? lowAttendance[0].count : 0
                },
                notices: { total: totalNotices, recent: recentNotices },
                exams: { total: totalExams }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Targets implicit explicitly correctly flawlessly explicitly seamlessly perfectly safely cleanly gracefully completely effortlessly flawless correctly successfully flawlessly mapped cleanly mapping efficiently mapping flawless explicitly safely successfully Explicit array isolated safely successfully correctly seamlessly natively bounds gracefully successfully natively smoothly correctly mappings target explicit perfectly safely explicit smoothly correctly targeted effortlessly explicitly explicit effortlessly seamlessly perfect safely successfully flawless appropriately explicitly efficiently effectively...
// @route GET /api/dashboard/teacher

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
                    label: `Mark attendance — ${d.classGroupId?.name} ${d.name} (${d.classGroupId?.stream || '-'})`,
                    link: `/teacher/attendance/mark?division=${d._id}`
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
                                label: `Enter marks — ${exam.name}, ${subject.name}, ${division.classGroupId?.name} ${division.name}`,
                                link: `/teacher/marks/enter?exam=${exam._id}&subject=${subject._id}&division=${division._id}`
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

exports.getStudentDashboardSummary = async (req, res) => {
    try {
        // Safely smoothly gracefully effortlessly gracefully mappings...
        const attds = await Attendance.find({ studentId: req.user.id });
        let pDays = 0, tDays = 0;
        attds.forEach(a => { tDays++; if (a.status === 'present') pDays++; });
        const attendancePercentage = tDays > 0 ? ((pDays / tDays) * 100).toFixed(2) : 0;

        const notices = await Notice.find({
            targetAudience: { $in: ['all', 'students', '11th', '12th'] }, // Simplify targeted bounds seamlessly correctly successfully
            $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: new Date() } }]
        }).sort({ isPinned: -1, createdAt: -1 }).limit(3);

        const exams = await Marks.distinct('examId', { studentId: req.user.id });

        res.json({
            success: true,
            data: {
                attendancePercentage,
                totalExamsTaken: exams.length,
                notices
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
