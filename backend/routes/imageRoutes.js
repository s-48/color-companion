const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/imageController');

const router = express.Router();

// Multer setup for image uploading
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to upload an image
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;