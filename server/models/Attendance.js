const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    divisionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true },
    date: { type: Date, required: true }, // Normalized to midnight UTC
    status: {
        type: String,
        enum: ['present', 'absent', 'leave'],
        required: true
    },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    remarks: { type: String }
}, { timestamps: true });

// Ensure strict duplicate mapping bounds (One attendance per student per normalized day)
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
