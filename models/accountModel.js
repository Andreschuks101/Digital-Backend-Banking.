const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    accountNumber: { type: String, unique: true },

    balance: { type: Number, default: 15000 },

    bankName: { type: String, default: "Andres Microfinance Bank" }

}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);