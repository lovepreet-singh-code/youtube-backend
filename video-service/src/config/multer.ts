import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'youtube/videos',
    resource_type: 'video',
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

export default upload;
