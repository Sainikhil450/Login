const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

// Create a connection to the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Use your actual password if needed
    database: "signup"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Handle POST requests to /signup
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(201).json({ message: "User registered successfully" });
    });
});

// Start the server
app.listen(8081, () => {
    console.log("listening on port 8081");
});
