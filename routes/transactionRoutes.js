const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transfer', authMiddleware, transactionController.transfer);

router.get('/transaction/:ref', authMiddleware, transactionController.getTransaction);

// ✅ ADD THIS
router.get('/transaction/sync/:ref', authMiddleware, transactionController.syncTransactionStatus);

module.exports = router;