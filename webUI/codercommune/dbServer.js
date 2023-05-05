   // Import required modules
   const mysql = require('mysql');
   const dotenv = require('dotenv');

   // Load environment variables from .env file
   dotenv.config();

   // Create a MySQL connection using environment variables
   const connection = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
   });

   // Connect to the MySQL server
   connection.connect((err) => {
     if (err) {
       console.error('Error connecting to MySQL:', err);
       return;
     }
     console.log('Connected to MySQL');
   });

   // Don't forget to close the connection when you're done
   // connection.end();