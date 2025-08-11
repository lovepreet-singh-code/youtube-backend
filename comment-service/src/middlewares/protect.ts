import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string }; // 👈 correct key from token

    req.userId = decoded._id; // 👈 FIXED HERE
    console.log('Decoded Token:', decoded);
    console.log('Set req.userId:', req.userId);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
