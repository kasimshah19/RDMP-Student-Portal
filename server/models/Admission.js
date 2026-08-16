const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    applicationId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    appliedClass: { type: String, enum: ['11th', '12th'], required: true },
    appliedDivision: { type: String }, // optional, admin assigns later

    previousSchool: { type: String, required: true },
    previousPercentage: { type: Number, required: true },
    previousBoard: { type: String, required: true },

    status: {
        type: String,
        enum: ['pending', 'documents_pending', 'approved', 'rejected'],
        default: 'pending'
    },
    remarks: { type: String },

    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],

    appliedAt: { type: Date, default: Date.now },
    linkedStudentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // populated after approval
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
