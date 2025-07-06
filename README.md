# AI Snippet Service

A full-stack app that generates and stores AI summaries of text.

Backend: Node.js 20, Express, TypeScript, MongoDB, OpenAI API
Frontend: React, Remix, Tailwind CSS

## Notes
- The OpenAI API key must be kept secret — do not commit it to source control.
- This service assumes an AI provider (e.g. OpenAI) is available and responsive.
- The UI and API are structured in separate folders, as per the challenge requirements. If preferred, these could easily be split into separate repositories.

---

## 🚀 Setup

### Local setup
-  Create a .env file at the root of the mono-repo (above frontend/ and backend/):

## Environment variables
  - Variable	Example / Default
    `MONGO_URI`	mongodb://mongo:27017/ai-snippet
    `OPENAI_API_KEY`	your OpenAI key
    `BACKEND_PORT`	3000
    `FRONTEND_PORT`	3030
    `REMIX_API_URL`	http://localhost:3000

- Replace `OPENAI_API_KEY` with a valid key (see instructions at the end).

- Backend
    cd backend
    npm install
    npm run dev         # Run in dev mode
    npm run test        # Run tests

- Frontend
    cd frontend
    npm install
    npm run dev         # Run in dev mode
    npm run test        # Run tests


## Docker
To build, run tests, start the API (port 3000) and also the UI project (port 3030):

- docker compose up --build

This will:
✅ Build the app
✅ Run API tests
✅ MongoDB is available on port 27017
✅ Start the API server on port 3000
✅ Run UI tests
✅ Start the UI server on port 3030

## Environment variables
- MONGO_URI=mongodb://mongo:27017/ai-snippet
- OPENAI_API_KEY=your-openai-api-key
- BACKEND_PORT=3000 (3000 will be the default if none is given)
- FRONTEND_PORT=3030 (3030 will be the default if none is given)
- REMIX_API_URL=http://localhost:3000 (default will be 3000 if none is given)

OBS: Replace `OPENAI_API_KEY` value with a valid OpenAI API key
👉 You can obtain a key at https://platform.openai.com/account/api-keys
Or step by step in the end of this file

## API Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /snippets | Create & save a snippet, return AI summary |
| GET |  /snippets:id | Retrieve a single snippet by ID |
| GET | /snippets | Retrieve list of all snippets |

## UI features
 - Submit text → receive AI-generated summary
 - List all snippets in a table (scrollable)
 - Search snippet by ID
 - Clean UI with Tailwind CSS
 - TDD discipline — tests alongside implementation

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
/backend
  /src
    /routes
    /services
    /models
    /__tests__
  Dockerfile

/frontend
  /app
    /components
    /routes
      /__tests__
      /snippets
  Dockerfile

docker-compose.yml
README.md
.env


## Post-challenge reflection
  - Backend
    - Add proper error handling layers (e.g., global error middleware)
    - Add input validation (e.g., using Zod or Joi)
    - Implement simple authentication (e.g., JWT for snippet ownership)
    - Write more integration and edge case tests (e.g., large payloads, AI API timeouts)
    - Set up a CI pipeline with GitHub Actions for linting, testing, and Docker build (as requested)
    - Explore caching AI summaries to reduce external API calls

  - Frontend
    - If I had more time, I would:
    - Add client-side form validation with more nuanced error messages and better UX (e.g. inline feedback rather than alerts).
    - Enhance UI/UX: loading indicators for all async actions, pagination for snippets, and smoother transitions.
    - Add e2e tests (e.g. Playwright or Cypress) to cover user flows.

## Trade-offs made
 - Backend
    - Focused on core functionality within time budget; kept prompt to OpenAI simple.
    - Minimal validation and no auth to prioritize clean API structure and Docker integration.
    - Did not implement streaming summaries (Server-Sent Events) or roles.

  - Frontend
    - Chose simplicity over full error handling: e.g., some API failure states are shown via basic alert rather than UI components.
    - Focused on functionality over polish: UI is clean but minimal, with room for visual refinement.

## How to generate an OpenAI API key
1) Go to OpenAI’s platform
2) Log in or create an account
3) Once you’re logged in: click on your profile icon (top-right corner), in the dropdown menu, click "View API keys"
4) Create a new API key: On the API keys page click the "Create new secret key" button, optionally, give your key a name (e.g. ai-snippet-service), the platform will generate the key
5) Copy and store the key safely: IMPORTANT You’ll only see the key once. Copy it immediately and store it in a safe place (e.g., your .env file, a password manager).
6) Use the key in your app: Your app will read this value from your .env file or environment variable.


## Final notes
  The project meets the core challenge goals:
    - Clean separation of API & UI
    - Dockerized and tested
    - Clear setup instructions
