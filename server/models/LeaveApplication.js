const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema({
    applicantType: {
        type: String,
        enum: ['Student', 'Teacher'],
        required: true
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'applicantType'
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('LeaveApplication', leaveApplicationSchema);
