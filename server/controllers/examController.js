const Exam = require('../models/Exam');

// @desc Create a new Global examination natively
// @route POST /api/exams
// @access Admin Only
exports.createExam = async (req, res) => {
    try {
        const { name, classGroupId, academicYear, term, maxMarksPerSubject, passingMarks, startDate, endDate } = req.body;

        const exam = await Exam.create({
            name, classGroupId, academicYear, term, maxMarksPerSubject, passingMarks, startDate, endDate, createdBy: req.user.id
        });

        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get entire Global Arrays for list
// @route GET /api/exams
// @access Admin Only
exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find().populate('classGroupId', 'name stream');
        res.json({ success: true, count: exams.length, data: exams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Find Explicit Exam targeting parameters mapping strictly natively
// @route GET /api/exams/:id
// @access Admin Only
exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('classGroupId', 'name stream');
        if (!exam) return res.status(404).json({ success: false, message: 'Invalid Scope' });
        res.json({ success: true, data: exam });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Scope fetching exclusively mappings targeted ClassGroups natively pulling bounds efficiently
// @route GET /api/exams/classgroup/:classGroupId
// @access Admin & Teacher
exports.getExamsByClassGroup = async (req, res) => {
    try {
        const exams = await Exam.find({ classGroupId: req.params.classGroupId }).sort('-createdAt');
        res.json({ success: true, data: exams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
