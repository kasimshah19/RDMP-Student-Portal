const Student = require('../models/Student');
const Admission = require('../models/Admission');
const Attendance = require('../models/Attendance');

exports.getClassWiseStrengthReport = async (req, res) => {
    try {
        const stats = await Student.aggregate([
            { $lookup: { from: 'divisions', localField: 'divisionId', foreignField: '_id', as: 'division' } },
            { $unwind: "$division" },
            { $lookup: { from: 'classgroups', localField: 'classGroupId', foreignField: '_id', as: 'classGroup' } },
            { $unwind: "$classGroup" },
            {
                $group: {
                    _id: { classStream: { $concat: ["$classGroup.name", " ", "$classGroup.stream"] }, division: "$division.name" },
                    count: { $sum: 1 }
                }
            },
            { $project: { _id: 0, classGroup: "$_id.classStream", division: "$_id.division", studentsCount: "$count" } },
            { $sort: { classGroup: 1, division: 1 } }
        ]);

        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAdmissionFunnelReport = async (req, res) => {
    try {
        const stats = await Admission.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $project: { status: "$_id", count: 1, _id: 0 } }
        ]);
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAttendanceTrendReport = async (req, res) => {
    try {
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 30); // 30 Day tracking boundary implicitly

        const stats = await Attendance.aggregate([
            { $match: { date: { $gte: thresholdDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalPresent: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
                    totalMarked: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: "$_id",
                    percentage: { $round: [{ $multiply: [{ $divide: ["$totalPresent", { $cond: [{ $eq: ["$totalMarked", 0] }, 1, "$totalMarked"] }] }, 100] }, 2] },
                    _id: 0
                }
            },
            { $sort: { date: 1 } }
        ]);

        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
