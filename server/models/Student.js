const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },

    // New Relational mapping
    classGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup' },
    divisionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
    rollNumber: { type: String }, // Can be auto-generated

    // Demographics/Contacts
    dob: { type: Date },
    gender: { type: String },
    bloodGroup: { type: String },
    phone: { type: String },
    address: { type: String },
    guardianName: { type: String },
    guardianPhone: { type: String },
    emergencyContact: { type: String },

    admissionStatus: { type: String, default: 'active' }
}, { timestamps: true });

// Pre-save to hash password
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match password
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
