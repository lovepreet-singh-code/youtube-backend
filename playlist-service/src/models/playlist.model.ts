import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylist extends Document {
  name: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
  videos: mongoose.Types.ObjectId[];
}

const playlistSchema = new Schema<IPlaylist>(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Removed `ref: 'Video'` to avoid Mongoose model registration error
    videos: [{ type: Schema.Types.ObjectId }]
  },
  { timestamps: true }
);

export const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema);
