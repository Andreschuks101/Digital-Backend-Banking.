const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware');

// 🔒 Protected routes
router.get('/accounts', authMiddleware, accountController.getAllAccounts);
router.get('/account/balance/:accountNumber', authMiddleware, accountController.getBalance);
router.get('/account/name-enquiry/:accountNumber', authMiddleware, accountController.nameEnquiry);

module.exports = router;

