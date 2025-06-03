# Base image
FROM python:3.10-slim

# Install dependencies (Ghostscript included)
RUN apt-get update && apt-get install -y \
    ghostscript \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Run app
CMD ["python", "app.py"]
