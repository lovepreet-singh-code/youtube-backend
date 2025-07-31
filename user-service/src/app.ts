import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'User Service is running' });
});

app.listen(PORT, () => {
  console.log(`User Service is listening on port ${PORT}`);
});
