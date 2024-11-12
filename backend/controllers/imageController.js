const cloudinary = require('cloudinary').v2;
const Image = require('../models/imageModel');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image controller
const uploadImage = (req, res) => {
  const stream = cloudinary.uploader.upload_stream(
    { resource_type: 'image' },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
      }
      const newImage = new Image({
        imageUrl: result.secure_url,
      });
      newImage.save()
        .then(() => res.status(200).json({ imageUrl: result.secure_url }))
        .catch((saveError) => res.status(500).json({ error: 'Failed to save image to database' }));
    }
  );
  if (req.file) {
    stream.end(req.file.buffer);
  } else {
    res.status(400).json({ error: 'No image file provided' });
  }
};

module.exports = { uploadImage };