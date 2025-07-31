import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
