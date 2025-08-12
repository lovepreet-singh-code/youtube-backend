import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import likeRoutes from './routes/like.routes';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// DB Connection
connectDB();

app.use('/api/likes', likeRoutes);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Like Service Running...');
});

app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Like Service running on port ${PORT}`));
