// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,

});


// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

   // Create an Express app
   const app = express();

   // Middleware
   app.use(cors({ origin: '*' }));
   app.use(bodyParser.json());

// Login route
app.post('/api/login', (req, res) => {
  const { user, password } = req.body;
  const query = 'SELECT * FROM codercommune.userTable WHERE user = ? AND password = ?';
  connection.query(query, [user, password], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid user or password' });
    }
  });
});

// Register route
   app.post('/api/register', (req, res) => {
    const { user, password } = req.body;
    const query = 'INSERT INTO codercommune.userTable (user, password) VALUES (?, ?)';
    connection.query(query, [user, password], (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.json({ message: 'User registered successfully' });
    });
  });

// Start the server
const PORT = process.env.PORT || 5545;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});