const User = require('../models/authModel');
const Account = require('../models/accountModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nibbsService = require('../services/nibbsService');

// 🔐 REGISTER
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, bvn, nin } = req.body;

        if (!bvn && !nin) {
            return res.status(400).json({ message: 'BVN or NIN required' });
        }

        // 🔑 HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔥 VERIFY WITH NIBBS
        let verification;

        if (bvn) {
            await nibbsService.insertBVN(bvn);
            verification = await nibbsService.validateBVN(bvn);
        } else {
            await nibbsService.insertNIN(nin);
            verification = await nibbsService.validateNIN(nin);
        }

        if (!verification.data.success) {
            return res.status(400).json({ message: 'Verification failed' });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            bvn,
            nin,
            isVerified: true
        });

        // 🏦 CREATE ACCOUNT
        const account = await Account.create({
            user: user._id,
            accountNumber: Math.floor(1000000000 + Math.random() * 9000000000)
        });

        user.account = account._id;
        await user.save();

        res.status(201).json({
            message: 'Registered successfully',
            user,
            account
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 🎟️ GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
