const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    admissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true },
    documentType: {
        type: String,
        enum: ['photo', 'aadhar', '10th_marksheet', 'birth_certificate', 'tc', 'caste_certificate', 'other'],
        required: true
    },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    verifiedAt: { type: Date },
    rejectionReason: { type: String }, // if admin rejects this specific document
    uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
