const ClassGroup = require('../models/ClassGroup');
const Division = require('../models/Division');
const Subject = require('../models/Subject');

// @desc Get all ClassGroups with Divisions
// @route GET /api/classes
// @access Admin Only
exports.getClasses = async (req, res) => {
    try {
        const classes = await ClassGroup.find()
            .populate({ path: 'divisions', populate: { path: 'classTeacherId', select: 'name email' } });
        res.json({ success: true, data: classes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Create a ClassGroup
// @route POST /api/classes
// @access Admin Only
exports.createClass = async (req, res) => {
    try {
        const { name, stream } = req.body;
        const newClass = await ClassGroup.create({ name, stream });
        res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Create a Division and link to ClassGroup
// @route POST /api/divisions
// @access Admin Only
exports.createDivision = async (req, res) => {
    try {
        const { name, classGroupId, classTeacherId, capacity } = req.body;
        const division = await Division.create({ name, classGroupId, classTeacherId, capacity });

        // push to class group
        await ClassGroup.findByIdAndUpdate(classGroupId, { $push: { divisions: division._id } });

        res.status(201).json({ success: true, data: division });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get all Subjects
// @route GET /api/subjects
// @access Admin Only
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('classGroupId teacherId', 'name stream');
        res.json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Create a Subject
// @route POST /api/subjects
// @access Admin Only
exports.createSubject = async (req, res) => {
    try {
        const { name, classGroupId, stream, teacherId } = req.body;
        const subject = await Subject.create({ name, classGroupId, stream, teacherId });
        res.status(201).json({ success: true, data: subject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
