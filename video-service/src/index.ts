import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import videoRoutes from './routes/video.route';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);

// Port from .env
const PORT = process.env.PORT || 5001;

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Video service running on port ${PORT}`);
  });
});
