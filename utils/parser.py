from pypdf import PdfReader
import docx
from io import BytesIO

def parse_resume_file(file):
    filename = file.filename.lower()
    
    if filename.endswith('.pdf'):
        return parse_pdf(file)
    elif filename.endswith('.docx'):
        return parse_docx(file)
    elif filename.endswith('.txt'):
        return file.read().decode('utf-8')
    else:
        raise ValueError("Unsupported file format. Please upload PDF, DOCX, or TXT")

def parse_pdf(file):
    pdf_reader = PdfReader(BytesIO(file.read()))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def parse_docx(file):
    doc = docx.Document(BytesIO(file.read()))
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text
