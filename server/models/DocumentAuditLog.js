const mongoose = require('mongoose');

const documentAuditLogSchema = new mongoose.Schema({
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentDocument',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    action: {
        type: String, // e.g. "Uploaded", "Verified", "Rejected", "Re-uploaded"
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true // either Student ID or Admin ID depending on the action
    },
    performedByRole: {
        type: String, // 'Student', 'Admin', or 'System'
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Object // Flexible structure to hold reason strings or version tags
    }
});

// Logs are heavily read by documentId directly
documentAuditLogSchema.index({ documentId: 1, timestamp: -1 });

module.exports = mongoose.model('DocumentAuditLog', documentAuditLogSchema);
