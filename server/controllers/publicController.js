const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Division = require('../models/Division');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const Notice = require('../models/Notice');

// @desc    Get public portal statistics
// @route   GET /api/public/stats
// @access  Public
exports.getStats = async (req, res) => {
    try {
        const [totalStudents, totalTeachers, totalClasses] = await Promise.all([
            Student.countDocuments(),
            Teacher.countDocuments(),
            Division.countDocuments()
        ]);

        // Upcoming Exams (where startDate is in the future)
        const upcomingExams = await Exam.countDocuments({
            startDate: { $gte: new Date() }
        });

        // Attendance Percentage (find most recent attendance date if today is empty)
        let targetDate = new Date();
        targetDate.setUTCHours(0, 0, 0, 0);

        let todayCount = await Attendance.countDocuments({ date: targetDate });
        if (todayCount === 0) {
            const latestAtt = await Attendance.findOne().sort({ date: -1 });
            if (latestAtt) targetDate = latestAtt.date;
        }

        const totalAtt = await Attendance.countDocuments({ date: targetDate });
        const presentAtt = await Attendance.countDocuments({ date: targetDate, status: 'present' });

        let attendancePercentage = 0;
        if (totalAtt > 0) {
            attendancePercentage = Math.round((presentAtt / totalAtt) * 100);
        }

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                totalClasses,
                upcomingExams,
                attendancePercentage
            }
        });
    } catch (error) {
        console.error('Error fetching public stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get public active notices
// @route   GET /api/public/notices
// @access  Public
exports.getPublicNotices = async (req, res) => {
    try {
        const notices = await Notice.find({ status: 'active' }).sort({ createdAt: -1 }).limit(4);
        res.status(200).json({
            success: true,
            data: notices
        });
    } catch (error) {
        console.error('Error fetching public notices:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
