import { Request, Response } from 'express';
import { Video } from '../models/video.model';


export const uploadVideo = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const file = req.file;
    const { title, description } = req.body;

    if (!file || !req.userId) return res.status(400).json({ message: 'Missing data' });

    const newVideo = await Video.create({
      title,
      description,
      userId: req.userId,
      videoUrl: file.path,
      publicId: file.filename,
    });

    res.status(201).json({ message: 'Video uploaded', video: newVideo });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err });
  }
};
