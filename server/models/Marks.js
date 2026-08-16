const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    marksObtained: { type: Number, required: true },
    maxMarks: { type: Number, required: true }, // Snapshotted from Exam struct safely
    enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
}, { timestamps: true });

// Prevent generic explicit duplicate inputs tracking mapped structures natively avoiding data corruption
marksSchema.index({ studentId: 1, examId: 1, subjectId: 1 }, { unique: true });

module.exports = mongoose.model('Marks', marksSchema);
