require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 5001;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for image uploading
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Root route for GET requests
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// POST route to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  // Upload the image to Cloudinary
  cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
    res.status(200).json({ imageUrl: result.secure_url });
  }).end(req.file.buffer);
});

// Start the server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));