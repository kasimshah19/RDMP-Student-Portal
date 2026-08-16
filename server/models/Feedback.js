const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    category: {
        type: String,
        required: true,
        enum: ['Academic', 'Facilities', 'Hostel', 'Library', 'Extracurricular', 'Other']
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
