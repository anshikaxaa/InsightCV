# InsightCV

A web application for analyzing CVs against job descriptions using Google's Gemini AI.

## Features

- Upload CV and job description files (PDF, DOC, DOCX)
- AI-powered analysis of CV-job match percentage
- Markdown-formatted analysis results
- Full report modal view
- PDF export of analysis results

## Tech Stack

- **Frontend:** React, React Router, React Markdown, jsPDF
- **Backend:** Node.js, Express, Google Generative AI (Gemini)
- **File Processing:** PDF parsing

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anshikaxaa/InsightCV.git
   cd InsightCV
   ```

2. Install dependencies:
   ```bash
   # Root directory
   npm install

   # Server dependencies
   cd server
   npm install

   # Client dependencies
   cd ../client
   npm install
   cd ..
   ```

3. Set up environment variables:
   - Copy `server/config.env.example` to `server/config.env`
   - Add your Google Gemini API key: `GEMINI_API_KEY=your_api_key_here`

4. Run the application:
   ```bash
   # Start server (in one terminal)
   cd server
   npm run dev

   # Start client (in another terminal)
   cd ../client
   npm start
   ```

5. Open http://localhost:3001 in your browser

