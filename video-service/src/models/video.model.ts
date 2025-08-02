import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    videoUrl: String,
    publicId: String,
  },
  { timestamps: true }
);

export const Video = mongoose.model('Video', videoSchema);
