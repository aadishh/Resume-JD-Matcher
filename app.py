from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
from services.matcher import ResumeMatcherService

load_dotenv()

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
CORS(app)

matcher_service = ResumeMatcherService()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'API is running'})

@app.route('/api/match', methods=['POST'])
def match_resume():
    try:
        data = request.json
        resume_text = data.get('resume')
        job_description = data.get('jobDescription')
        
        if not resume_text or not job_description:
            return jsonify({'error': 'Resume and job description are required'}), 400
        
        result = matcher_service.analyze_match(resume_text, job_description)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload', methods=['POST'])
def upload_resume():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        from utils.parser import parse_resume_file
        resume_text = parse_resume_file(file)
        
        return jsonify({'text': resume_text})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
