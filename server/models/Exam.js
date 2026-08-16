const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g. "Unit Test 1", "Final Exam"
    classGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup', required: true },
    academicYear: { type: String, required: true }, // e.g. "2025-26"
    term: { type: String, enum: ['Term 1', 'Term 2', 'Annual'], required: true },
    maxMarksPerSubject: { type: Number, default: 100 },
    passingMarks: { type: Number, default: 35 },
    startDate: { type: Date },
    endDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
