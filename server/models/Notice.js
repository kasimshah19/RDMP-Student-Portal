const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    targetAudience: {
        type: String,
        enum: ['all', 'students', 'teachers', '11th', '12th'],
        default: 'all'
    },
    isPinned: { type: Boolean, default: false },
    expiresAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
