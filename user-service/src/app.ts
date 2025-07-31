import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Middleware
app.use(express.json());

// Health Route
app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'User Service is running' });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
