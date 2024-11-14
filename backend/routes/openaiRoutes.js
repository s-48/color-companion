const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/api/generate-text', async (req, res) => {
  try {
    const { systemMessage, userMessage } = req.body;

    const messages = [
      { role: 'system', content: systemMessage }, 
      { role: 'user', content: userMessage }  
    ];

    const response = await openai.createChatCompletion({
      model: 'gpt-4o', 
      messages: messages,
    });

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: 'Error generating text' });
  }
});

module.exports = router;