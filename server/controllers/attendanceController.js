const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const { calculateAttendance } = require('../utils/attendanceCalculator');

// Helper to normalize Date string to Midnight UTC
const normalizeDate = (dateStr) => {
    const d = new Date(dateStr);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

// @desc Mark Attendance for entire division securely
// @route POST /api/attendance/mark
// @access Teacher Only
exports.markAttendanceForDivision = async (req, res) => {
    try {
        const { divisionId, date, attendanceData } = req.body;
        // Verify teacher belongs to the Division
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher.assignedDivisions.includes(divisionId)) {
            return res.status(403).json({ success: false, message: 'Not authorized for this specific Division' });
        }

        const normalizedDate = normalizeDate(date);
        const operations = attendanceData.map(record => ({
            updateOne: {
                filter: { studentId: record.studentId, date: normalizedDate },
                update: {
                    $set: {
                        divisionId,
                        status: record.status,
                        remarks: record.remarks || '',
                        markedBy: req.user.id
                    }
                },
                upsert: true
            }
        }));

        await Attendance.bulkWrite(operations);
        res.json({ success: true, message: 'Attendance accurately routed and finalized.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get tracking mapping targeted Date exactly
// @route GET /api/attendance/division/:divisionId/date/:date
// @access Admin & Teacher (Scoped)
exports.getAttendanceForDivisionByDate = async (req, res) => {
    try {
        const { divisionId, date } = req.params;

        if (req.user.role === 'teacher') {
            const teacher = await Teacher.findById(req.user.id);
            if (!teacher.assignedDivisions.includes(divisionId)) {
                return res.status(403).json({ success: false, message: 'Access purely restricted to your explicit cohorts' });
            }
        }

        const normalizedDate = normalizeDate(date);

        // Fetch students in division
        const students = await Student.find({ divisionId }).select('name rollNumber');
        const attendances = await Attendance.find({ divisionId, date: normalizedDate });

        // Map status cleanly
        const mappedRoster = students.map(student => {
            const record = attendances.find(a => a.studentId.toString() === student._id.toString());
            return {
                studentId: student._id,
                name: student.name,
                rollNumber: student.rollNumber,
                status: record ? record.status : 'present', // fallback assumption for UI render
                remarks: record ? record.remarks : '',
                isExisting: !!record
            };
        });

        res.json({ success: true, data: mappedRoster });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Own student tracker bounds
// @route GET /api/attendance/me
// @access Student
exports.getMyAttendance = async (req, res) => {
    try {
        const records = await Attendance.find({ studentId: req.user.id }).sort('-date');
        const aggregated = calculateAttendance(records);
        res.json({ success: true, data: { history: records, stats: aggregated } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get student explicit metrics
// @route GET /api/attendance/student/:studentId
// @access Admin & Teacher (Scoped)
exports.getStudentAttendance = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student) return res.status(404).json({ success: false, message: 'Student not localized' });

        if (req.user.role === 'teacher') {
            const teacher = await Teacher.findById(req.user.id);
            if (!teacher.assignedDivisions.includes(student.divisionId)) {
                return res.status(403).json({ success: false, message: 'Forbidden access outside cohorts' });
            }
        }

        const records = await Attendance.find({ studentId: student._id }).sort('-date');
        const aggregated = calculateAttendance(records);
        res.json({ success: true, data: { history: records, stats: aggregated, student } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get Global Div Array
// @route GET /api/attendance/report/division/:divisionId
// @access Admin & Teacher (Scoped)
exports.getDivisionAttendanceReport = async (req, res) => {
    try {
        const { divisionId } = req.params;

        if (req.user.role === 'teacher') {
            const teacher = await Teacher.findById(req.user.id);
            if (!teacher.assignedDivisions.includes(divisionId)) {
                return res.status(403).json({ success: false, message: 'Forbidden division access' });
            }
        }

        const students = await Student.find({ divisionId }).select('name rollNumber');
        const records = await Attendance.find({ divisionId });

        const fullReport = students.map(student => {
            const stuRecords = records.filter(r => r.studentId.toString() === student._id.toString());
            return {
                student: { _id: student._id, name: student.name, rollNumber: student.rollNumber },
                stats: calculateAttendance(stuRecords)
            };
        });

        // Lowest sorts forward efficiently
        fullReport.sort((a, b) => a.stats.percentage - b.stats.percentage);

        res.json({ success: true, count: fullReport.length, data: fullReport });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Low array metrics fetch
// @route GET /api/attendance/low-attendance
// @access Admin Only
exports.getLowAttendanceStudents = async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 75;

        // Fetching entire metrics
        const allStudents = await Student.find()
            .select('name rollNumber classGroupId divisionId')
            .populate('classGroupId', 'name stream')
            .populate('divisionId', 'name');

        const allRecords = await Attendance.find();
        const lowStudentsList = [];

        allStudents.forEach(student => {
            const stuRecords = allRecords.filter(r => r.studentId.toString() === student._id.toString());
            const stats = calculateAttendance(stuRecords);

            // Only aggregate if records exist actively otherwise mapping false
            if (stats.totalDays > 0 && stats.percentage < threshold) {
                lowStudentsList.push({ student, stats });
            }
        });

        res.json({ success: true, count: lowStudentsList.length, data: lowStudentsList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
