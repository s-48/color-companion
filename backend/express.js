const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/image', (req, res) => {
  // Handle image processing logic here
  res.send('Image processing endpoint');
});

app.post('/ask', async (req, res) => {
  const question = req.body.question;
  
  // Call OpenAI API to get response
  const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
    prompt: question,
    max_tokens: 100
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  res.send(openaiResponse.data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});