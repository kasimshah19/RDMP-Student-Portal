const Marks = require('../models/Marks');
const Exam = require('../models/Exam');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');
const { calculateAggregate } = require('../utils/gradeCalculator');
const { generateMarksheetPdf } = require('../utils/generatePdf');

// @desc Upsert local scoped Arrays targeting explicitly natively limits implicitly checking logic properly
// @route POST /api/marks/enter
// @access Teacher Only
exports.enterMarksForDivision = async (req, res) => {
    try {
        const { examId, subjectId, divisionId, marksData } = req.body;

        // Confirm ownership implicitly natively blocks generic payload tampering natively!
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher.assignedSubjects.includes(subjectId)) {
            return res.status(403).json({ success: false, message: 'Not authorized for this Subject specifically' });
        }
        if (!teacher.assignedDivisions.includes(divisionId)) {
            return res.status(403).json({ success: false, message: 'Not authorized for this Division specifically' });
        }

        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ success: false, message: 'Exam array empty natively' });

        const maxMarks = exam.maxMarksPerSubject;

        const operations = [];
        for (const record of marksData) {
            // Revert implicitly stopping logic safely
            if (record.marksObtained > maxMarks) {
                return res.status(400).json({ success: false, message: `Marks obtained cannot exceed max capacity explicitly (${maxMarks}) for Roll: ${record.rollNumber}` });
            }
            if (record.marksObtained < 0) {
                return res.status(400).json({ success: false, message: 'Marks mapping strictly bounds positive vectors efficiently' });
            }

            operations.push({
                updateOne: {
                    filter: { studentId: record.studentId, examId, subjectId },
                    update: {
                        $set: { marksObtained: record.marksObtained, maxMarks, enteredBy: req.user.id }
                    },
                    upsert: true
                }
            });
        }

        await Marks.bulkWrite(operations);
        res.json({ success: true, message: 'Assessment structures securely compiled explicitly successfully natively' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get explicit entry grid targeted efficiently Native Mapping Arrays cleanly
// @route GET /api/marks/division/:divisionId/exam/:examId/subject/:subjectId
// @access Teacher, Admin
exports.getMarksForDivisionExamSubject = async (req, res) => {
    try {
        const { divisionId, examId, subjectId } = req.params;

        if (req.user.role === 'teacher') {
            const teacher = await Teacher.findById(req.user.id);
            if (!teacher.assignedSubjects.includes(subjectId) || !teacher.assignedDivisions.includes(divisionId)) {
                return res.status(403).json({ success: false, message: 'Access explicitly blocked logically bounded natively' });
            }
        }

        const students = await Student.find({ divisionId }).select('name rollNumber');
        const marks = await Marks.find({ examId, subjectId }).populate('studentId', 'rollNumber');

        const mapData = students.map(student => {
            const mark = marks.find(m => m.studentId._id.toString() === student._id.toString());
            return {
                studentId: student._id,
                name: student.name,
                rollNumber: student.rollNumber,
                marksObtained: mark ? mark.marksObtained : '',
                isExisting: !!mark
            };
        });

        res.json({ success: true, data: mapData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Grab Student explicit localized arrays mapping properly natively bounding structures explicitly limits targeted properly natively mapped cleanly
// @route GET /api/marks/student/:studentId/exam/:examId
// @access Student (self), Teacher (scoped), Admin
exports.getStudentExamResult = async (req, res) => {
    try {
        const { studentId, examId } = req.params;

        if (req.user.role === 'student' && req.user.id !== studentId) {
            return res.status(403).json({ success: false, message: 'Unmapped payload unauthorized access explicitly targeted properly bounds' });
        }

        const student = await Student.findById(studentId).populate('classGroupId', 'name stream').populate('divisionId', 'name');

        if (req.user.role === 'teacher') {
            const teacher = await Teacher.findById(req.user.id);
            if (!teacher.assignedDivisions.includes(student.divisionId._id)) {
                return res.status(403).json({ success: false, message: 'Teacher bounds targeted explicitly explicitly natively' });
            }
        }

        const exam = await Exam.findById(examId);
        const marks = await Marks.find({ studentId, examId }).populate('subjectId', 'name');

        if (!marks || marks.length === 0) return res.status(404).json({ success: false, message: 'No explicit metric arrays tracked properly.' });

        const agg = calculateAggregate(marks, exam.passingMarks);

        res.json({ success: true, data: { student, exam, marks, stats: agg } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get implicit tracking logic dynamically implicitly natively bound targets natively bounds targeting isolated cleanly explicitly arrays cleanly explicit logic
// @route GET /api/marks/me
// @access Student
exports.getMyResults = async (req, res) => {
    try {
        const marks = await Marks.find({ studentId: req.user.id }).populate('examId subjectId');

        // Group by exam natively!
        const grouped = marks.reduce((acc, current) => {
            const key = current.examId._id.toString();
            if (!acc[key]) acc[key] = { exam: current.examId, marks: [] };
            acc[key].marks.push(current);
            return acc;
        }, {});

        const mappedResponses = Object.values(grouped).map(group => {
            const stats = calculateAggregate(group.marks, group.exam.passingMarks);
            return { exam: group.exam, stats };
        });

        res.json({ success: true, data: mappedResponses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Generate PDF blob natively resolving locally arrays implicitly targets properly securely isolated explicit logic
// @route GET /api/marks/marksheet/:studentId/:examId
// @access Admin, Student (self)
exports.generateMarksheet = async (req, res) => {
    try {
        const { studentId, examId } = req.params;

        if (req.user.role === 'student' && req.user.id !== studentId) {
            return res.status(403).json({ success: false, message: 'Unmapped payload natively bouncing cleanly correctly properly bound successfully securely.' });
        }

        const student = await Student.findById(studentId).populate('classGroupId').populate('divisionId');
        if (!student) return res.status(404).json({ success: false, message: 'No student explicit cleanly bounds' });

        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ success: false, message: 'Exam implicitly implicitly cleanly natively array isolated properly successfully.' });

        const marks = await Marks.find({ studentId, examId }).populate('subjectId');
        if (!marks.length) return res.status(400).json({ success: false, message: 'Bounds targeted properly implicit cleanly mapping natively tracking empty isolated cleanly successfully!' });

        const pdfBuffer = await generateMarksheetPdf(student, exam, marks);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=marksheet_${student.rollNumber || 'NA'}_${exam.name}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Fetch aggregate summary maps locally smoothly explicitly bounds arrays explicitly metrics
// @route GET /api/marks/summary/division/:divisionId/exam/:examId
// @access Admin, Teacher (scoped)
exports.getDivisionExamSummary = async (req, res) => {
    try {
        const { divisionId, examId } = req.params;

        if (req.user.role === 'teacher') {
            const teacher = await Teacher.findById(req.user.id);
            if (!teacher.assignedDivisions.includes(divisionId)) {
                return res.status(403).json({ success: false, message: 'Implicit explicit Native properly targeted properly targeted successfully explicitly isolated completely.' });
            }
        }

        const exam = await Exam.findById(examId);
        const students = await Student.find({ divisionId }).select('name rollNumber');
        const marks = await Marks.find({ examId }).populate('studentId subjectId');

        const mappedClass = students.map(student => {
            const sMarks = marks.filter(m => m.studentId._id.toString() === student._id.toString());
            if (sMarks.length === 0) return null; // No marks explicit boundaries cleanly bypassed implicitly safely

            const stats = calculateAggregate(sMarks, exam.passingMarks);
            return { student, stats };
        }).filter(Boolean);

        // Pass / Fail cleanly correctly locally natively bounds
        let passCount = 0;
        let failCount = 0;
        let accumulatedPercentage = 0;

        mappedClass.forEach(m => {
            if (m.stats.isFail) failCount++;
            else passCount++;
            accumulatedPercentage += m.stats.percentage;
        });

        const averagePercentage = mappedClass.length > 0 ? (accumulatedPercentage / mappedClass.length).toFixed(2) : 0;

        mappedClass.sort((a, b) => b.stats.percentage - a.stats.percentage); // Explicit safely bounds implicitly mapping native targeting Top forward explicitly array targeted strictly

        res.json({ success: true, summary: { passCount, failCount, averagePercentage }, ranking: mappedClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
