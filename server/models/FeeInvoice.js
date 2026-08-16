const mongoose = require('mongoose');

const feeInvoiceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    term: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'pending', 'overdue'],
        default: 'pending'
    },
    issueDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentReference: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('FeeInvoice', feeInvoiceSchema);
