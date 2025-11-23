let resumeText = '';
let jobDescText = '';
let activeTab = 'text';

document.getElementById('resumeFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    document.getElementById('resumeFileName').textContent = file.name;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        showLoader(true);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        resumeText = data.text;
        showLoader(false);
    } catch (err) {
        showLoader(false);
        showError('Failed to upload resume file');
    }
});

document.getElementById('jobDescFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    document.getElementById('jdFileName').textContent = file.name;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        showLoader(true);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        jobDescText = data.text;
        showLoader(false);
    } catch (err) {
        showLoader(false);
        showError('Failed to upload job description file');
    }
});

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'text') {
        document.querySelector('.tab:first-child').classList.add('active');
        document.getElementById('jd-text').classList.add('active');
    } else {
        document.querySelector('.tab:last-child').classList.add('active');
        document.getElementById('jd-file').classList.add('active');
    }
}

async function analyze() {
    const resume = resumeText;
    const jobDesc = activeTab === 'text' 
        ? document.getElementById('jobDescText').value 
        : jobDescText;
    
    if (!resume) {
        showError('Please upload a resume file');
        return;
    }
    
    if (!jobDesc) {
        showError('Please provide a job description');
        return;
    }
    
    hideError();
    document.getElementById('results').style.display = 'none';
    showLoader(true);
    
    try {
        const res = await fetch('/api/match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume, jobDescription: jobDesc })
        });
        
        const result = await res.json();
        showLoader(false);
        displayResults(result);
    } catch (err) {
        showLoader(false);
        showError('Failed to analyze. Please try again.');
    }
}

function displayResults(data) {
    document.getElementById('score').textContent = data.match_score + '%';
    document.getElementById('score').style.color = 
        data.match_score >= 70 ? '#28a745' : data.match_score >= 50 ? '#ffc107' : '#dc3545';
    
    document.getElementById('summary').textContent = data.summary || 'N/A';
    
    const matchedSkills = document.getElementById('matchedSkills');
    matchedSkills.innerHTML = '';
    if (data.matched_skills && data.matched_skills.length > 0) {
        data.matched_skills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill matched';
            span.textContent = skill;
            matchedSkills.appendChild(span);
        });
    } else {
        matchedSkills.textContent = 'No matched skills found';
    }
    
    const missingSkills = document.getElementById('missingSkills');
    missingSkills.innerHTML = '';
    if (data.missing_skills && data.missing_skills.length > 0) {
        data.missing_skills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill missing';
            span.textContent = skill;
            missingSkills.appendChild(span);
        });
    } else {
        missingSkills.textContent = 'No missing skills';
    }
    
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';
    if (data.recommendations && data.recommendations.length > 0) {
        data.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendations.appendChild(li);
        });
    } else {
        recommendations.innerHTML = '<li>No recommendations available</li>';
    }
    
    document.getElementById('results').style.display = 'block';
}

function showLoader(show) {
    document.getElementById('loader').classList.toggle('active', show);
    document.querySelector('.analyze-btn').disabled = show;
}

function showError(msg) {
    const error = document.getElementById('error');
    error.textContent = msg;
    error.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}
