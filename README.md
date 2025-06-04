# 📄 FileFormat - PDF Compressor Web App

![Banner]([https://github.com/Vignesh-V06/FileFormat/blob/main/fileformatlogo.png])

**FileFormat** is a web-based PDF compressor tool that allows users to upload PDF files and reduce their file size using selectable compression levels. This project includes both a frontend (built with HTML, CSS, and JS) and a backend powered by Flask and Ghostscript.

🌐 **Live Demo**: [FileFormat on GitHub Pages](https://vignesh-v06.github.io/FileFormat/)  
🚀 **API Server**: [PDF Compressor Backend on Render](https://fileformat-2.onrender.com)

---

## 🔧 Features

- 📤 Upload PDF files (single-file support)
- 🧠 Auto-generates thumbnail previews for PDFs
- 📉 Compress using three levels:
  - Low
  - Medium
  - High
- 🧼 Clear uploaded files or list
- 📥 Download compressed PDF
- 🌓 Responsive UI with smooth dropdown and toggle animations

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- PDF.js (for rendering thumbnails)
- Ionicons
- Hosted on GitHub Pages

### Backend
- Python (Flask)
- Ghostscript (for PDF compression)
- CORS enabled
- Hosted on Render

---

<pre> ``` FileFormat/ ├── index.html ├── styles/ │ └── style.css ├── scripts/ │ └── fscript.js ├── assets/ │ ├── logo.png │ └── other images/icons ``` </pre>


Backend (hosted separately):
<pre> server/ ├── app.py # Flask backend for PDF compression ├── requirements.txt # Python dependencies (Flask, Flask-CORS, etc.) ├── Dockerfile # Docker config for containerizing the server </pre>

---

## 🧪 Running Locally

### Frontend

No setup needed—just open `index.html` in your browser, or serve via:

```bash
npx serve
git clone https://github.com/vignesh-v06/FileFormat.git
cd FileFormat/server
pip install -r requirements.txt
Ensure Ghostscript is installed:

Windows: Set GS_PATH in app.py to the path of gswin64c.exe

Linux (with Docker): Use 'gs' as GS_PATH

Run the server:

bash
Copy
Edit
python app.py
FROM python:3.10-slim

RUN apt-get update && apt-get install -y ghostscript && apt-get clean

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

CMD ["python", "app.py"]

