# Code Review AI

An AI-powered code review application that provides instant feedback on your code.

## Features

- Instant code reviews powered by Google's Gemini AI
- Support for multiple programming languages
- Clean, modern UI with dark/light mode
- Code export and sharing capabilities
- Keyboard shortcuts for improved productivity

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/code-review-ai.git
   cd code-review-ai
   ```

2. Install dependencies:
   ```
   npm run install-all
   ```

3. Create a `.env` file in the `BackEnd` directory:
   ```
   GOOGLE_GEMINI_KEY=your_gemini_api_key_here
   ```

4. Start the development servers:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Deploying Backend to Render and Frontend to Netlify

#### Backend (Render)

1. Create a Render account and connect your GitHub repository
2. Create a new Web Service
3. Configure the service:
   - Name: code-review-backend
   - Environment: Node
   - Build Command: `cd BackEnd && npm install`
   - Start Command: `cd BackEnd && node server.js`
   - Environment Variables:
     - `GOOGLE_GEMINI_KEY`: your_gemini_api_key_here
     - `NODE_ENV`: production
     - `CORS_ORIGIN`: Your Netlify URL (once you have it)

4. Click "Create Web Service"
5. Note the URL provided (e.g., https://code-review-backend.onrender.com)

#### Frontend (Netlify)

1. Create a Netlify account and connect your GitHub repository
2. Create a new site from Git
3. Configure build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
   - Environment variables:
     - `VITE_API_URL`: Your Render backend URL

4. Click "Deploy site"
5. Once deployed, go back to Render and update the `CORS_ORIGIN` with your Netlify URL

### Testing Your Deployment

1. Open your Netlify URL in a browser
2. Try using the code review functionality
3. Check the browser console for any errors
4. Verify that the frontend can communicate with the backend

## License

MIT
