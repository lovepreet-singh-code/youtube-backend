// middlewares/protect.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import redis from '../config/redis'; // make sure this file exists and is correct

interface JwtPayload {
  _id: string;
}

export const protect = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // 1. Check if token is blacklisted in Redis
    const isBlacklisted = await redis.get(`bl_${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been blacklisted. Please log in again.' });
    }

    // 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
