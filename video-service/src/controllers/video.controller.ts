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

// GET all videos
export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ videos });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos', error: err });
  }
};

// GET single video by ID
export const getVideoById = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ video });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch video', error: err });
  }
};

export const getUserVideos = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const videos = await Video.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: 'User videos fetched', videos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateVideo = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.userId.toString() !== req.userId)
      return res.status(403).json({ message: 'Not authorized' });

    const { title, description } = req.body;
    if (title) video.title = title;
    if (description) video.description = description;

    await video.save();

    res.status(200).json({ message: 'Video updated', video });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteVideo = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.userId.toString() !== req.userId)
      return res.status(403).json({ message: 'Not authorized' });

    await video.deleteOne();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const searchVideos = async (req: Request, res: Response) => {
  try {
    const query = req.query.q?.toString() || '';
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' },
    });
    res.status(200).json({ message: 'Search results', videos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
