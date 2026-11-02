<<<<<<< HEAD
# MERN AI Resume Analyzer

A beginner-friendly MERN project that uploads a PDF resume, compares it with a job description, and returns an AI-generated match score, strengths, missing skills, and improvement suggestions using Google Gemini.

## Requirements
- Node.js 18+
- MongoDB local or MongoDB Atlas
- Google Gemini API key from https://aistudio.google.com/app/apikey

## 1. Install dependencies

Open two terminals:

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd frontend
npm install
```

## 2. Configure backend

Create `backend/.env` by copying `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_analyzer
GEMINI_API_KEY=PASTE_YOUR_REAL_API_KEY_HERE
GEMINI_MODEL=gemini-2.5-flash
```

Do not put quotes around the API key. Never upload `.env` to GitHub.

## 3. Run the project

Start MongoDB, then run the backend:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Features
- PDF resume upload
- Job description input
- Gemini-powered resume analysis
- Match score, strengths, missing skills, and recommendations
- Recent analysis history saved in MongoDB
- Responsive React interface

## Notes
- This starter accepts PDF files only (up to 5 MB).
- The resume text is sent to Google Gemini for analysis. Do not upload sensitive documents unless you are comfortable with that.
- If Gemini returns a 503/high-demand error, wait and retry. If the model is unavailable for your API key, change `GEMINI_MODEL` to a model enabled in your Google AI Studio project.
=======
# mern-ai-resume-analyzer
>>>>>>> d097f894a32afac3263c043dd3203a41238763b0
