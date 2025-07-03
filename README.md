# AI Snippet Service

A simple backend service to create and retrieve AI-generated summaries of text.  
Built with Node.js (v20.10.0), Express, TypeScript, MongoDB, and OpenAI API.

## Notes
- The OpenAI API key must be kept secret — do not commit it to source control.
- This service assumes an AI provider (e.g. OpenAI) is available and responsive.
- The UI and API are structured in separate folders, as per the challenge requirements. If preferred, these could easily be split into separate repositories.

---

## 🚀 Setup

### Local setup
```bash
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
npm run test
npm run start
```

## Docker
To build, run tests, and start the API:

- docker compose up --build api

This will:
✅ Build the app
✅ Run tests
✅ Start the API server on port 3000
✅ MongoDB is available on port 27017

## Environment variables
- MONGO_URI=mongodb://mongo:27017/ai-snippet
- OPENAI_API_KEY=your-openai-api-key
- BACKEND_PORT=3000 (3000 will be the default if none is given)

OBS: Replace `OPENAI_API_KEY` value with a valid OpenAI API key
👉 You can obtain a key at https://platform.openai.com/account/api-keys
Or step by step in the end of this file

## API Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /snippets | Create & save a snippet, return AI summary |
| GET |  /snippets:id | Retrieve a single snippet by ID |
| GET | /snippets | Retrieve list of all snippets |

## Example request with curl
Create a snippet and get its summary:
curl -X POST http://localhost:3000/snippets \
  -H "Content-Type: application/json" \
  -d '{"text": "This is the raw text to summarize."}'

Retrieve a specific snippet:
curl http://localhost:3000/snippets/<snippet-id>
- Replace <snippet-id> with the actual ID returned by the POST call.

Retrieve all snippets:
curl http://localhost:3000/snippets

## Run tests
 - npm run test (LOCAL)
 - docker compose run --build api (Docker)

## Project structure

/src
  /routes
  /services
  /models
  /__tests__
Dockerfile
docker-compose.yml
README.md
.env

## Post-challenge reflection
- Add proper error handling layers (e.g., global error middleware)
- Add input validation (e.g., using Zod or Joi)
- Implement simple authentication (e.g., JWT for snippet ownership)
- Write more integration and edge case tests (e.g., large payloads, AI API timeouts)
- Set up a CI pipeline with GitHub Actions for linting, testing, and Docker build (as requested)
- Explore caching AI summaries to reduce external API calls

## Trade-offs made
- Focused on core functionality within time budget; kept prompt to OpenAI simple.
- Minimal validation and no auth to prioritize clean API structure and Docker integration.
- Did not implement streaming summaries (Server-Sent Events) or roles.

## How to generate an OpenAI API key
1) Go to OpenAI’s platform
2) Log in or create an account
3) Once you’re logged in: click on your profile icon (top-right corner), in the dropdown menu, click "View API keys"
4) Create a new API key: On the API keys page click the "Create new secret key" button, optionally, give your key a name (e.g. ai-snippet-service), the platform will generate the key
5) Copy and store the key safely: IMPORTANT You’ll only see the key once. Copy it immediately and store it in a safe place (e.g., your .env file, a password manager).
6) Use the key in your app: Your app will read this value from your .env file or environment variable.
