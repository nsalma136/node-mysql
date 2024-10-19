// Import MySQL library
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql_server',  // use 'mysql_server' as host when running in Docker
  user: process.env.MYSQL_USER || 'stacknow_user',
  password: process.env.MYSQL_PASSWORD || 'stacknow_password',
  database: process.env.MYSQL_DATABASE || 'stacknow_db'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

// Simple query example
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }
  console.log('The solution is:', results[0].solution);
});

// Close the connection
connection.end();
