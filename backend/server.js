require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors'); 
const { OpenAI } = require('openai');
// const openaiRoutes = require('./routes/openaiRoutes'); 

const app = express();
const PORT = process.env.PORT || 5001;

// Debugging line to verify Cloudinary configuration
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this specific origin
  methods: 'GET,POST',             // Allow specific HTTP methods
  allowedHeaders: 'Content-Type',  // Allow specific headers
}));
// app.use(openaiRoutes)
app.use(express.json());

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
    console.error('No file provided');
    return res.status(400).json({ error: 'No file provided' });
  }

  // Upload the image to Cloudinary
  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'image' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);  // Log Cloudinary error details
        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
      }
      res.status(200).json({ imageUrl: result.secure_url });
    }
  );

  if (req.file.buffer) {
    console.log('Uploading file to Cloudinary...');
    uploadStream.end(req.file.buffer);
  } else {
    console.error('No file buffer found');
    res.status(500).json({ error: 'File buffer missing' });
  }
});



// POST route to upload an image (color assist)
app.post('/process-image', upload.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }

  const result1 = `File ${file.originalname} uploaded successfully!`;
  const result2 = 'This is the second response for the uploaded image.';

  res.json({ result1, result2 });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-text', async (req, res) => {
  try {
    const { systemMessage, userMessage, imageUrl } = req.body;

    // Construct the prompt with imageUrl and personality
    const prompt = `${systemMessage} The user asks: "${userMessage}" about the image: ${imageUrl}`;

    // Call OpenAI API (chat-completions)
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4o', // Specify the model (gpt-4 or gpt-3.5)
      messages: [
        { role: 'system', content: systemMessage },  // System message to set context
        { role: 'user', content: userMessage },      // User's question
        {
          "role": "user",
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": `${imageUrl}`
              },
            },
          ],
        }
      ],
      max_tokens: 300,
    });
    // Send the response from OpenAI back to the client
    res.json({ response: openaiResponse.choices[0].message.content });

  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: 'Error generating response' });
  }

});

app.post('/get-color', async (req, res) => {
  try {
    const { rgbValue } = req.body;

    if (!rgbValue) {
      return res.status(400).json({ error: "RGB value is required" });
    }

    // Construct the prompt
    const prompt = `What color does this RGB value represent? ${rgbValue} Respond ONLY with the name of the color`;

    // Call OpenAI API
    const openaiResponse2 = await openai.chat.completions.create({
      model: 'gpt-4', // Specify the model
      messages: [
        { role: 'system', content: "You are an expert in color identification." },
        { role: 'user', content: prompt}
      ],
      max_tokens: 100, 
    });

    // Send the response from OpenAI back to the client
    res.json({ response: openaiResponse2.choices[0].message.content });

  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});


// Start the server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));