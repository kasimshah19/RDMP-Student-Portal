const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'A', 'B'
    classGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup', required: true },
    classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    capacity: { type: Number, default: 60 }
}, { timestamps: true });

module.exports = mongoose.model('Division', divisionSchema);
