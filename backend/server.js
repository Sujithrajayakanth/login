const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); 
const app = express();
require('dotenv').config();


const PORT = process.env.PORT||5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle CORS
app.use(cors());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});
// SIGNUP//
// Check if the email is already registered
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body; // 
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
const checkQuery = 'SELECT * FROM users WHERE email = ?';
db.query(checkQuery, [email], async (error, results) => {
  if (error) {
    return res.status(500).json({ error: 'Database error' });
  }
  
  if (results.length > 0) {
    return res.json({ message: 'Credentials already registered. Use new credentials to register.' });
  }

  // If not registered, hash the password and store the new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?)';
  const values = [name, email, hashedPassword];

  db.query(insertQuery, [values], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'User registered successfully' });
  });
});
});


// * LOGIN *//
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Query to check if the user exists
    const query = 'SELECT * FROM users WHERE email = ?';
  
    db.query(query, [email], async (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      const user = results[0];
  
  
// Compare password with the hashed password stored in the database
const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful' });
  });
});

    
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
