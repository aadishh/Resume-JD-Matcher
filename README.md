# Resume-JD Matcher

An AI-powered application that analyzes resumes against job descriptions to help candidates understand their eligibility and what skills they need to develop.

## 🎯 Features

- **Resume Analysis**: Upload your resume (PDF, DOCX, TXT) for instant analysis
- **Job Description Matching**: Paste or upload job descriptions to compare
- **Match Score**: Get a percentage score showing how well you match the job
- **Skills Assessment**: See which skills you have and which you're missing
- **Actionable Recommendations**: Receive specific advice on what to learn next
- **Beautiful UI**: Modern, responsive interface with smooth animations

## 🛠️ Tech Stack

- **Backend**: Flask (Python)
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Frontend**: HTML, CSS, JavaScript
- **File Parsing**: PyPDF, python-docx

## 📋 Prerequisites

- Python 3.9+
- Google API Key (for Gemini)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd resume-jd-matcher
```

2. **Create virtual environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Google API key:
```
GOOGLE_API_KEY=your_google_api_key_here
FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=1
```

## 🎮 Usage

1. **Start the application**
```bash
source venv/bin/activate
flask run
```

Or:
```bash
python app.py
```

2. **Open your browser**
```
http://localhost:5000
```

3. **Upload and analyze**
   - Upload your resume (required)
   - Paste or upload a job description
   - Click "Analyze Match"
   - View your results!

## 📁 Project Structure

```
.
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (not in git)
├── .env.example          # Example environment file
├── services/
│   └── matcher.py        # AI matching logic
├── utils/
│   └── parser.py         # File parsing utilities
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Styles
│   └── js/
│       └── script.js     # Frontend logic
└── README.md
```

## 🔑 Getting a Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 🎨 Features Explained

### Match Score
- **70-100%**: Excellent match - you're highly qualified
- **50-69%**: Good match - you meet most requirements
- **0-49%**: Needs improvement - focus on missing skills

### Skills Assessment
- **Green badges**: Skills you already have
- **Red badges**: Skills you need to learn

### Recommendations
Personalized advice on:
- Skills to learn
- Certifications to get
- Experience to gain

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🐛 Troubleshooting

**Issue**: Flask won't start
```bash
# Make sure you're in the virtual environment
source venv/bin/activate
# Try running directly
python app.py
```

**Issue**: API errors
- Check your Google API key in `.env`
- Ensure you have API quota remaining
- Verify internet connection

**Issue**: File upload fails
- Check file size (max 16MB)
- Ensure file format is PDF, DOCX, or TXT
- Try a different file

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ using Flask and Google Gemini AI
