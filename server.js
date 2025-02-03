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

// CORS debugging middleware
app.use((req, res, next) => {
  console.log('Incoming request from origin:', req.headers.origin);
  next();
});

// Middleware
app.use(cors({
  origin: [
    'https://anointed-ai.vercel.app',  // Remove trailing slash
    'http://localhost:3001',           // Add local development
    'http://localhost:3002'            // Add alternative local port
  ],
  methods: ['GET', 'POST'],            // Specify allowed methods
  allowedHeaders: ['Content-Type'],    // Specify allowed headers
  credentials: false                   // Since we're not using credentials
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'OpenAI API server is running',
    allowedOrigins: [
      'https://anointed-ai.vercel.app',
      'http://localhost:3001',
      'http://localhost:3002'
    ]
  });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    origin: req.headers.origin
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Allowed origins:', [
    'https://anointed-ai.vercel.app',
    'http://localhost:3001',
    'http://localhost:3002'
  ]);
}); 