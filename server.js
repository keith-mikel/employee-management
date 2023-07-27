const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create a connection pool to manage database connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware to add the database pool to the request object
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(express.json());

// Routes
const routes = require('./routes');
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});


// Export the pool object
module.exports = pool;