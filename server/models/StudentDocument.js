const mongoose = require('mongoose');

const studentDocumentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    documentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocumentType',
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    storageKey: {
        type: String, // E.g., Cloudinary public_id
        required: true
    },
    originalFileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending Verification', 'Verified', 'Rejected', 'Re-upload Required'],
        default: 'Pending Verification'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    verifiedAt: {
        type: Date
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin' // Or Staff
    },
    rejectionReason: {
        type: String
    },
    reuploadReason: {
        type: String
    },
    version: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

// Prevent multiple active overlapping documents of the exact same type for a single student
studentDocumentSchema.index({ studentId: 1, documentTypeId: 1 });

module.exports = mongoose.model('StudentDocument', studentDocumentSchema);
