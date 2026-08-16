const mongoose = require('mongoose');

const documentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Identity Documents',
            'Previous Education Documents',
            'Date of Birth / Personal Documents',
            'Category / Reservation Documents',
            'Address / Residence Documents',
            'Scholarship / Financial Documents',
            'Special Category Documents',
            'College-Specific Documents',
            'Other'
        ]
    },
    description: {
        type: String,
        default: ''
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    // Allows scoping this document to specific academic classes
    // Empty array implies it applies universally across all classes unless constrained.
    applicableClasses: [{
        type: String // e.g. "Class 11th - Science", "Class 12th - Commerce"
    }],
    // Explicit targeting for Reserved students or EWS students
    applicableCategories: [{
        type: String // e.g., "SC", "ST", "OBC", "EWS", "General"
    }],
    allowedFileTypes: [{
        type: String,
        default: ['application/pdf', 'image/jpeg', 'image/png']
    }],
    maxFileSize: {
        type: Number,
        default: 5242880 // 5MB default limit
    },
    verificationRequired: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Basic compound index to avoid duplicated document names under the same category
documentTypeSchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('DocumentType', documentTypeSchema);
