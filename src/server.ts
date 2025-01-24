import express from 'express';
import db from './config/connection'; // Import the database connection
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Connect to the MongoDB database
db();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB connection is working!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});