require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DeepSeek API endpoint
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'DeepSeek API server is running' });
});

// DeepSeek chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error calling DeepSeek API',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 