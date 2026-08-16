const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    timeSlot: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Lecture', 'Practical', 'Break', 'Lunch'],
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    room: {
        type: String,
        trim: true
    }
});

const timetableSchema = new mongoose.Schema({
    divisionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division',
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    periods: [periodSchema]
}, { timestamps: true });

// Prevent duplicate days for a single division
timetableSchema.index({ divisionId: 1, dayOfWeek: 1 }, { unique: true });

module.exports = mongoose.model('Timetable', timetableSchema);
