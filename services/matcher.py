import google.generativeai as genai
import os
import json

class ResumeMatcherService:
    def __init__(self):
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def analyze_match(self, resume_text, job_description):
        prompt = f"""You are a professional career advisor helping a candidate understand if they are eligible for a job.

Analyze this candidate's resume against the job description and tell them clearly:
- Are they eligible for this job?
- What skills do they already have that match?
- What skills are they missing?
- What should they do to improve their chances?

Resume:
{resume_text}

Job Description:
{job_description}

Provide your response as JSON with these fields:
1. match_score: A number from 0-100 indicating how well they match
2. matched_skills: List of skills they have that the job needs
3. missing_skills: List of skills the job needs but they don't have
4. summary: A friendly 2-3 sentence explanation telling them if they're eligible and why
5. recommendations: List of 3-5 specific actions they should take (like "Learn Python", "Get AWS certification", "Add project management experience")

Be honest but encouraging. If they're not fully qualified, tell them what they need to work on.

Return ONLY valid JSON, no other text."""
        
        response = self.model.generate_content(prompt)
        
        try:
            # Clean the response text
            text = response.text.strip()
            # Remove markdown code blocks if present
            if text.startswith('```json'):
                text = text[7:]
            if text.startswith('```'):
                text = text[3:]
            if text.endswith('```'):
                text = text[:-3]
            text = text.strip()
            
            result = json.loads(text)
            return result
        except (json.JSONDecodeError, Exception) as e:
            return {
                "match_score": 0,
                "matched_skills": [],
                "missing_skills": [],
                "recommendations": ["Unable to parse AI response"],
                "summary": response.text if hasattr(response, 'text') else str(e)
            }
