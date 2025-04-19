const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const AppError = require('./utils/AppError');

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// Apply rate limiting to AI routes
app.use('/ai', rateLimiter);

// Routes
app.get('/', (req, res) => {
    res.send('Code Review API')
});

app.use('/ai', aiRoutes);

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;