import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import playlistRouter from './routes/playlist.routes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/playlist', playlistRouter);

// simple error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Playlist service running on ${PORT}`));
});
