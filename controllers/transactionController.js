const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');
const nibbsService = require('../services/nibbsService');

exports.transfer = async (req, res) => {
    try {
        const { receiverAccount, amount, bankCode } = req.body;

        const sender = await Account.findOne({ user: req.user.id });

        if (!sender) {
            return res.status(404).json({ message: 'Sender account not found' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const ref = "TXN_" + Date.now();

        // 🔍 CHECK IF ACCOUNT EXISTS INTERNALLY
        const receiver = await Account.findOne({ accountNumber: receiverAccount });

        let type;

        if (receiver) {
            // ✅ INTRA-BANK TRANSFER
            sender.balance -= amount;
            receiver.balance += amount;

            await sender.save();
            await receiver.save();

            type = "intra-bank";

        } else {
            // 🌍 INTER-BANK TRANSFER (PHOENIX)
            const response = await phoenix.transfer({
                fromAccount: sender.accountNumber,
                toAccount: receiverAccount,
                amount,
                bankCode,
                reference: ref
            });

            if (!response.data.success) {
                return res.status(400).json({ message: 'External transfer failed' });
            }

            sender.balance -= amount;
            await sender.save();

            type = "inter-bank";
        }

        // 💾 SAVE TRANSACTION
        const transaction = await Transaction.create({
            sender: req.user.id,
            receiverAccount,
            amount,
            reference: ref,
            type: 'debit',
            status: 'pending',
            transferType: type
        });

        res.json({
            message: `${type} transfer successful`,
            reference: ref,
            transaction
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a transaction by reference
exports.getTransaction = async (req, res) => {
    try {
        const { ref } = req.params;
        const transaction = await Transaction.findOne({ reference: ref });

        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        res.json({ transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Placeholder to sync transaction status (external provider integration)
exports.syncTransactionStatus = async (req, res) => {
    try {
        const { ref } = req.params;
        const transaction = await Transaction.findOne({ reference: ref });

        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        // For now just return current status; implement external sync later
        res.json({ reference: ref, status: transaction.status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};