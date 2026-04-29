const express = require('express');
const app = express();
require('dotenv').config();

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/accountRoutes'));
app.use('/api', require('./routes/transactionRoutes'));

// ✅ Health check (optional but smart)
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// ❌ NO server.listen HERE

module.exports = app;