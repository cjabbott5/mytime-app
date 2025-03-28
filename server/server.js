// Load dotenv and explicitly set the path to the .env file in the server folder
import dotenv from 'dotenv';
console.log("Current working directory:", process.cwd()); // Debug: Should print /Users/apple/mytime-app
dotenv.config({ path: './server/.env' });

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Get the port from .env (or default to 5000)
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
