require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors({
  origin: ['https://anointed-ai.vercel.app/']
}));
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'OpenAI API server is running' });
});

// OpenAI chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
    });

    res.json(completion);
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    res.status(500).json({
      error: 'Error calling OpenAI API',
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 