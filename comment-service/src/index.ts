import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import commentRoutes from './routes/comment.routes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Comment Service running on port ${PORT}`);
});
