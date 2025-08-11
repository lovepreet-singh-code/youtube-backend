import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export const addComment = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { videoId, text } = req.body;
    const comment = await commentService.addComment(req.userId!, videoId, text);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};


export const getVideoComments = async (req: Request, res: Response) => {
  const comments = await commentService.getCommentsByVideo(req.params.videoId);
  res.json(comments);
};

export const updateComment = async (req: Request & { userId?: string }, res: Response) => {
  const updated = await commentService.updateComment(req.params.id, req.userId!, req.body.text);
  res.json(updated);
};

export const deleteComment = async (req: Request & { userId?: string }, res: Response) => {
  await commentService.deleteComment(req.params.id, req.userId!);
  res.status(204).send();
};
