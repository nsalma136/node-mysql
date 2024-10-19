const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import cors package

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db-container-bf9018fe-4c68-4e72-9821-e9aa7cb521f1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'uli1xpu4gxplrwoz9nei9',
  database: process.env.MYSQL_DATABASE || 'db_s4dzkh2d'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all routes

// Default / route
app.get('/', (req, res) => {
  res.send('API is working! Welcome to the MySQL Node.js API.');
});

// API to fetch all categories
app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err.stack);
      return res.status(500).json({ message: 'Failed to fetch categories' });
    }
    res.json(results);
  });
});

// API to fetch all posts
app.get('/posts', (req, res) => {
  connection.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err.stack);
      return res.status(500).json({ message: 'Failed to fetch posts' });
    }
    res.json(results);
  });
});

// API to fetch posts by category
app.get('/posts/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  connection.query('SELECT * FROM posts WHERE category_id = ?', [categoryId], (err, results) => {
    if (err) {
      console.error('Error fetching posts for category:', err.stack);
      return res.status(500).json({ message: 'Failed to fetch posts for category' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
