import { Request, Response } from 'express';
import { Playlist } from '../models/playlist.model';
import mongoose from 'mongoose';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const createPlaylist = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const playlist = await Playlist.create({ name, description, userId: req.userId, videos: [] });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const addVideoToPlaylist = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { id: playlistId, videoId } = req.params;
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      return res.status(400).json({ message: 'Invalid id(s)' });
    }

    const playlist = await Playlist.findOneAndUpdate(
      { _id: playlistId, userId: req.userId },
      { $addToSet: { videos: videoId } },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ message: 'Playlist not found or not owned by user' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const removeVideoFromPlaylist = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { id: playlistId, videoId } = req.params;
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      return res.status(400).json({ message: 'Invalid id(s)' });
    }

    const playlist = await Playlist.findOneAndUpdate(
      { _id: playlistId, userId: req.userId },
      { $pull: { videos: videoId } },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ message: 'Playlist not found or not owned by user' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const getPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid playlist id' });

    const playlist = await Playlist.findById(id).populate('videos');
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const getUserPlaylists = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!isValidObjectId(userId)) return res.status(400).json({ message: 'Invalid user id' });
    const playlists = await Playlist.find({ userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const deletePlaylist = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid playlist id' });

    const deleted = await Playlist.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Playlist not found or not owned by user' });
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};
