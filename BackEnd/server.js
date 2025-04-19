require('dotenv').config()
const path = require('path')
const express = require('express')
const app = require('./src/App')

// Serve static files from the React frontend app in production
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    // Handle React routing, return all requests to React app
    app.use((req, res, next) => {
        // Skip API routes
        if (req.path.startsWith('/ai')) {
            return next();
        }

        // For all other routes, serve the React app
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}

// Use PORT environment variable for production or default to 3000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})