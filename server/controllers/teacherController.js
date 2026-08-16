const Teacher = require('../models/Teacher');
const Division = require('../models/Division');
const Subject = require('../models/Subject');

// @desc Get teacher profile (self)
// @route GET /api/teacher/me
// @access Teacher
exports.getMe = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id)
            .select('-password')
            .populate({ path: 'assignedDivisions', populate: { path: 'classGroupId' } })
            .populate({ path: 'assignedSubjects', populate: { path: 'classGroupId' } });

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        res.json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get all teachers
// @route GET /api/teacher/all
// @access Admin Only
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
            .select('-password')
            .populate({ path: 'assignedDivisions', select: 'name classGroupId', populate: { path: 'classGroupId', select: 'name stream' } })
            .populate({ path: 'assignedSubjects', select: 'name classGroupId', populate: { path: 'classGroupId', select: 'name stream' } });
        res.json({ success: true, count: teachers.length, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Assign Division (ClassTeacher Mapping)
// @route PATCH /api/teacher/:id/assign-division
// @access Admin Only
exports.assignDivision = async (req, res) => {
    try {
        const { divisionId, action } = req.body;
        // action: 'assign' | 'remove'

        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });

        // Two-way mapping updates
        if (action === 'assign') {
            if (!teacher.assignedDivisions.includes(divisionId)) teacher.assignedDivisions.push(divisionId);
            await Division.findByIdAndUpdate(divisionId, { classTeacherId: teacher._id });
        } else {
            teacher.assignedDivisions = teacher.assignedDivisions.filter(d => d.toString() !== divisionId);
            await Division.findByIdAndUpdate(divisionId, { classTeacherId: null });
        }

        await teacher.save();
        res.json({ success: true, message: `Division ${action}ed mapping logic.` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Assign Subject mapping
// @route PATCH /api/teacher/:id/assign-subject
// @access Admin Only
exports.assignSubject = async (req, res) => {
    try {
        const { subjectId, action } = req.body;

        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });

        if (action === 'assign') {
            if (!teacher.assignedSubjects.includes(subjectId)) teacher.assignedSubjects.push(subjectId);
            await Subject.findByIdAndUpdate(subjectId, { teacherId: teacher._id });
        } else {
            teacher.assignedSubjects = teacher.assignedSubjects.filter(s => s.toString() !== subjectId);
            await Subject.findByIdAndUpdate(subjectId, { teacherId: null });
        }

        await teacher.save();
        res.json({ success: true, message: `Subject ${action}ed mapping logic.` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
