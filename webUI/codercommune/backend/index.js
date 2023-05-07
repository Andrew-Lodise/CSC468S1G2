// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

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

  // Verify the user's credentials against the MySQL database
  connection.query('SELECT * FROM CoderCommune.Users WHERE UserName=? AND Password=?', [user, password], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.log(error)
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      console.log(error)
    } else {
      console.log(results);
      const UserID = results[0].UserID; 
      const UserName = results[0].UserName;
      const token = jwt.sign({ UserID, UserName }, 'werglikeujbawp4io4ewfo9', { expiresIn: '1h' });
      res.json({ token });
      console.log('User Login Successfull! ' + UserID);
    }
  });
});

// Register route
   app.post('/api/register', (req, res) => {
    const { user, password } = req.body;
    const query = 'INSERT INTO CoderCommune.Users (UserName, Password) VALUES (?, ?)';
    connection.query(query, [user, password], (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.json({ message: 'User registered successfully' });
    });
  });

  // User Checker
  app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization;
  
    // Verify the JWT token
    try {
      const decoded = jwt.verify(token, 'werglikeujbawp4io4ewfo9');
      const UserID = decoded.UserID;
      // Do something with the authenticated user ID
      res.json({ message: 'Authenticated!' + UserID });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });


  const getUsernameFromDatabase = (userID) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT UserName FROM Users WHERE UserID = ?', [userID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].UserName);
        }
      });
    });
  };
  
  app.get('/api/posts', async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Posts ORDER BY DatePublished DESC', (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      const myPosts = results;
  
      for (const element of myPosts) {
        const userID = element.UserID;
        const UserName = 'UserName';
        const UserName2 = await getUsernameFromDatabase(userID);
        element[UserName] = UserName2;
        console.log(UserName2);
      }
  
      res.json(myPosts);
      console.log(myPosts);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  


// Create a new post
app.post('/api/posts', (postreq, res) => {
  const { userVariable, content } = postreq.body;
  console.log(userVariable, content)

  if (!userVariable || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO Posts (UserID, Content) VALUES (?, ?)';
  connection.query(query, [userVariable, content], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
      console.log("Could not post" + err);
    }
    res.json({ success: true });
  });
});


  

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});