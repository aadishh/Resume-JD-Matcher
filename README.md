# Resume & Job Description Matcher

An intelligent application that analyzes and matches resumes with job descriptions using AI-powered natural language processing.

## Tech Stack

- **Frontend**: Next.js - React framework for building the user interface
- **Backend**: Flask - Python web framework for API endpoints
- **AI/ML**: LangChain - Framework for building LLM-powered applications

## Features

- Upload and parse resumes (PDF, DOCX, TXT)
- Input or paste job descriptions
- AI-powered matching analysis
- Skill gap identification
- Match score calculation
- Keyword extraction and comparison
- Actionable recommendations for resume improvement

## Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+
- OpenAI API key (or other LLM provider)

## Installation

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_api_key_here
FLASK_ENV=development
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Application

### Start the Backend

```bash
cd backend
source venv/bin/activate
python app.py
```

The Flask API will run on `http://localhost:5000`

### Start the Frontend

```bash
cd frontend
npm run dev
```

The Next.js app will run on `http://localhost:3000`

## Project Structure

```
.
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── requirements.txt    # Python dependencies
│   ├── services/           # Business logic and LangChain integration
│   └── utils/              # Helper functions
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   └── lib/           # Utility functions
│   ├── package.json
│   └── next.config.js
└── README.md
```

## API Endpoints

- `POST /api/match` - Analyze resume against job description
- `POST /api/upload` - Upload resume file
- `GET /api/health` - Health check endpoint

## How It Works

1. User uploads a resume and provides a job description
2. LangChain processes both documents using LLM
3. The system extracts key information (skills, experience, requirements)
4. AI compares and calculates match percentage
5. Results display match score, skill gaps, and recommendations

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
