const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverAccount: String,

    amount: Number,

    type: {
        type: String,
        enum: ['credit', 'debit']
    },

    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },

    reference: {
    type: String,
    unique: true
   
    },

    transferType: {
    type: String,
    enum: ['intra-bank', 'inter-bank']
    
    },

}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);