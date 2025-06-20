from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import subprocess
import os
import tempfile

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all origins

# ✅ Update this path ONLY if you run this locally. Render won't use this path.
GS_PATH ="gs"

COMPRESSION_SETTINGS = {
    'Low': ['/screen', '-dDownsampleColorImages=true', '-dColorImageResolution=50', '-dGrayImageResolution=50', '-dMonoImageResolution=50'],
    'Medium': ['/ebook', '-dDownsampleColorImages=true', '-dColorImageResolution=100', '-dGrayImageResolution=100', '-dMonoImageResolution=100'],
    'High': ['/printer', '-dDownsampleColorImages=true', '-dColorImageResolution=300', '-dGrayImageResolution=300', '-dMonoImageResolution=300']
}

def compress_pdf(input_path, output_path, level):
    setting = COMPRESSION_SETTINGS.get(level, ['/ebook'])
    cmd = [
        GS_PATH,
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        f'-dPDFSETTINGS={setting[0]}',
        '-dNOPAUSE',
        '-dQUIET',
        '-dBATCH',
        f'-sOutputFile={output_path}',
        input_path
    ] + setting[1:]

    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    if result.returncode != 0:
        print("Ghostscript Error:", result.stderr.decode())

    return result.returncode == 0

@app.route('/compress', methods=['POST'])
def compress():
    if 'file' not in request.files or 'level' not in request.form:
        return jsonify({'error': 'File and level required'}), 400

    file = request.files['file']
    level = request.form['level']

    if level not in COMPRESSION_SETTINGS:
        return jsonify({'error': 'Invalid compression level'}), 400

    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as input_temp:
        file.save(input_temp.name)

    output_temp = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    output_temp.close()

    success = compress_pdf(input_temp.name, output_temp.name, level)

    os.unlink(input_temp.name)

    if not success:
        os.unlink(output_temp.name)
        return jsonify({'error': 'Compression failed.'}), 500

    return send_file(output_temp.name, as_attachment=True, download_name='compressed.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
