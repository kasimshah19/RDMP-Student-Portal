const mongoose = require('mongoose');

const classGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['11th', '12th'],
        required: true
    },
    stream: {
        type: String,
        enum: ['Science', 'Commerce', 'Arts'],
        required: true
    },
    divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Division' }]
}, { timestamps: true });

module.exports = mongoose.model('ClassGroup', classGroupSchema);
