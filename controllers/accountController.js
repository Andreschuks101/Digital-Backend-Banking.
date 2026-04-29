const Account = require('../models/accountModel');
const Customer = require('../models/authModel');
const nibbsService = require('../services/nibbsService');


// ✅ GET /api/accounts
exports.getAllAccounts = async (req, res) => {
    const accounts = await Account.find().populate('user', 'firstName lastName email');
    res.json(accounts);
};


// ✅ GET /api/account/balance/:accountNumber
exports.getBalance = async (req, res) => {
    const { accountNumber } = req.params;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.json({
        accountNumber,
        balance: account.balance
    });
};


// ✅ GET /api/account/name-enquiry/:accountNumber
exports.nameEnquiry = async (req, res) => {
    try {
        const { accountNumber } = req.params;

        const response = await nibbsService.nameEnquiry(accountNumber);

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


