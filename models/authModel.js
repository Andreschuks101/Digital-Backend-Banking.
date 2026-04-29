const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,

    password: { type: String, required: true }, // ✅ ADD THIS

    bvn: String,
    nin: String,

    isVerified: { type: Boolean, default: false },

    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
