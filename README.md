# AI Snippet Service

A simple service to create and retrieve AI-generated summaries of text.

# Run with Docker:
- To run the API via docker use -> docker compose up --build -api
- TO run the tests via docker use -> docker compose up --build -api-test
The API will run on :3000, MongoDB on :27017

## Setup
- Requires MongoDB (local or docker)

## Environment Variables
- MONGO_URI	- MongoDB connection URI (default: mongodb://localhost:27017/ai-snippet)
- OPENAI_API_KEY - Your OpenAI API key

### Local
```bash
npm install
cp .env.example .env
# edit .env with your OpenAI API key
docker compose up --build -api
```

## API Endpoints
- POST `/snippets` - Create / save a snippet with AI-generated summary based on the given text
- GET `/snippets/:id` - Retrieve a single snippet by ID
- GET `/snippets` - Retrieve the list of all snippets
