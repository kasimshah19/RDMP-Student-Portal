const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup', required: true },
    stream: {
        type: String,
        enum: ['Science', 'Commerce', 'Arts', 'Common'],
        required: true
    },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
