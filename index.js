const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;  // Or your preferred port

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'db-container-c185626f-2482-44ba-9c5f-3c8bde16ff3b',      // Replace with your MySQL host
    user: 'root',           // Replace with your MySQL username
    password: 'gt8jmu8x1olar0v68s443r', // Replace with your MySQL password
    database: 'db_u65kukeo'  // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define the /health route
app.get('/', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),       // Server uptime
        message: 'OK',
        timestamp: Date.now(),
    };

    // Check if the database is connected
    db.ping((err) => {
        if (err) {
            healthcheck.message = 'Database connection failed';
            return res.status(500).json(healthcheck);
        }
        healthcheck.message = 'Database connected successfully';
        res.status(200).json(healthcheck);
    });
});

// Define the /users route
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';  // Query to get all users
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
