# Node.js Open AI API Server

A simple Node.js server that provides an API endpoint to interact with Open AI's models.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Add your DeepSeek API key to the `.env` file:
```
DEEPSEEK_API_KEY=your_api_key_here
```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Test Endpoint
- GET `/`
- Returns a simple message to confirm the server is running

### Chat Completion
- POST `/api/chat`
- Request body:
```json
{
  "messages": [
    {"role": "user", "content": "Hello, how are you?"}
  ]
}
```
- Returns the DeepSeek API response

## Error Handling
The server includes error handling for:
- Invalid request format
- Missing API key
- DeepSeek API errors
- Network issues 
