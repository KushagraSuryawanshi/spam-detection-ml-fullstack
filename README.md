# Spam Detection using Deep Learning and Full-Stack Web Application

This project implements a spam detection system using Deep Learning (CNN) integrated with a full-stack web application to classify spam messages in real time.  
It provides interactive visualizations, analytics, and a modern user interface.

---

## Project Overview

The system leverages a **Convolutional Neural Network (CNN)** for deep text pattern recognition, combined with a responsive **React-based frontend** and **FastAPI backend**.  
It supports single-message analysis, real-time statistics, and dynamic data visualization.

---

## Features

### Deep Learning (CNN)
- Custom Keras-based CNN model for textual message classification.  
- Real-time spam prediction with confidence scores.  
- Single message analysis support.  
- Model hot-reload capability without restarting the server.

### Backend (FastAPI)
- High-performance RESTful API built with FastAPI and Uvicorn.  
- Endpoints for prediction, statistics, health check, and model reload.  
- Automatic OpenAPI documentation at `/docs`.  
- CORS-enabled for smooth integration with the frontend.  
- Comprehensive logging and structured response models.

### Frontend (React + Vite)
- Responsive, modern UI with dark and light mode support.  
- Real-time message analysis and visualization of results.  
- Dynamic dashboard featuring:
  - **Radar Chart** – Accuracy, Precision, Recall, and F1-Score
  - **Timeline Chart** – Confidence trends for recent predictions
  - **Pie Chart** – Spam vs Ham message distribution
  - **Bar Chart** – Confidence distribution  
- Recent prediction history panel (up to 20 messages).  
- Interactive statistics cards displaying key metrics.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/predict` | Analyze a single message |
| GET | `/statistics` | Retrieve model metrics and recent prediction stats |
| DELETE | `/history` | Clear stored prediction history |
| PUT | `/model/reload` | Reload the CNN model dynamically |
| GET | `/health` | Check API and model status |

---

## Technology Stack

### Backend
- FastAPI  
- TensorFlow / Keras  
- Uvicorn  
- NumPy  
- Pydantic  

### Frontend
- React 19  
- Vite  
- Axios  
- Chart.js 
- react-chartjs-2
- Tailwind CSS  
- Lucide React  

---

## Environment Setup

### Prerequisites
- Python 3.11 or higher  
- Node.js 20 or higher  
- npm or yarn package manager  

---
### Virtual Environment Setup
You can set up a Python virtual environment using either venv or conda.
Using venv
#### Windows
```bash 
cd SpamDetection-fullstack-main/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
##### Note: Make sure Windows long paths are enabled, or TensorFlow installation may fail. More info: https://sarvesh42.hashnode.dev/vscode-tensorflow-installation-error-system-does-not-have-windows-long-path-support-enabled


#### MacOS
```bash 
cd SpamDetection-fullstack-main/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
#### Using Conda
```bash
conda create -n spamdetect python=3.11
conda activate spamdetect
pip install -r requirements.txt
```
---
### Frontend Setup

```bash
cd SpamDetection-fullstack-main/frontend

# Install dependencies
npm install
```
---

## How to Run the Application
Run two terminals simultaneously:
### Terminal 1 – Backend Server
```bash
cd SpamDetection-fullstack-main/backend
python -m uvicorn app.main:app --reload
```
- API available at: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
---
### Terminal 1 – Frontend Server
```bash
cd SpamDetection-fullstack-main/frontend
npm run dev
```
- Web App: http://localhost:5173
---
### Project Structure 
```
SpamDetection-fullstack-main/
├── backend/
│ ├── app/
│ │ ├── core/
│ │ │ ├── model_loader.py
│ │ │ ├── predictor.py
│ │ │ ├── preprocessor.py
│ │ │ └── state.py
│ │ ├── routes/
│ │ │ ├── predict_routes.py
│ │ │ ├── management_routes.py
│ │ │ └── health_routes.py
│ │ ├── schemas/
│ │ │ ├── request_models.py
│ │ │ └── response_models.py
│ │ ├── utils/
│ │ │ ├── helpers.py
│ │ │ └── logger.py
│ │ └── main.py
│ ├── models/
│ │ ├── cnn_spam_model.keras
│ │ └── cnn_tokenizer.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Charts/
│ │ │ │ ├── ConfidenceChart.jsx
│ │ │ │ ├── DistributionChart.jsx
│ │ │ │ ├── PerformanceChart.jsx
│ │ │ │ └── TimelineChart.jsx
│ │ │ ├── NavBar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── PredictionForm.jsx
│ │ │ ├── PredictionResult.jsx
│ │ │ ├── StatsCards.jsx
│ │ │ └── HistoryPanel.jsx
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── utils/
│ │ │ └── exportUtils.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
└── README.md
└── architecture.md

```
---
## Usage Example
### Single Message Analysis
1. Open the web interface
2. Paste a message
3. Click Analyze Message
4. See prediction and confidence score
---

## Model information
### CNN Architecture
- Input: Tokenized and padded text sequences (max length 100)
- Embedding Layer for semantic representation
- Convolutional + Pooling Layers for pattern recognition
- Dense Layers with sigmoid output
- Output: Binary spam/ham classification with confidence

### Preprocessing Pipeline
1. Text normalization and cleaning
2. Tokenization using pre-trained tokenizer
3. Sequence padding to fixed length (100 tokens)
4. NumPy array conversion for model input

### Evaluation Metrics

| Metric                | Description |
| -------------------- | ---------- |
| Accuracy | Overall correctness  |
| Precision        | Accuracy of spam predictions  |
| Recall | Sensitivity to detecting spam  |
| F1-Score | Balance between precision and recall |

All metrics are displayed dynamically in the dashboard and via ```/statistics``` API.

---

## Features in Detail
### Real-Time Anaytics
- Live updating stats dashboard
- Visualization of prediction confidence
- Interactive charts for insights

## Data Visualization (Chart.js)
### Interactive Charts using Chart.:
  - Performance Radar Chart - Model metrics visualization
  - Timeline Line Chart - Confidence trends with zoom/filter
  - Distribution Pie Chart - Spam vs Ham ratio
  - Confidence Bar Chart - Distribution across ranges
- Export all charts to CSV
- Dark mode support for all visualizations
- Responsive design for all devices

### Light/Dark Mode
- Toggle between light and dark
- Persistent user preference
- Enhances User visualization

### Model Management
- Reload model without restart
- Clear history
- Health check endpoint
---
## Performance
| Task               | Speed |
| -------------------- | ---------- |
| Single message prediction | 20–50 ms  |
| Model load        | ~3 seconds  |
| Frontend load | <1 second 
---
## Future Enhancements
- Multi-language spam detection
- Model retraining interface
- Email spam filter integration
- Report export (PDF/CSV)
- Authentication and user sessions
---

## Troubleshooting

### Backend
- **Model not loading**: Ensure .keras and .pkl files exist in models/
- **Port conflict**: Change port in the Uvicorn command
- **Import errors**: Check Python dependency versions

### Frontend
- **API not connecting**: Confirm backend is running on port 8000
- **Charts missing**: Check browser console logs
- **Dark mode issue**: Clear browser cache
---
## Summary
This project delivers a complete AI-powered spam detection system that integrates deep learning with a full-stack architecture. It provides real-time message classification, analytics, and a clean, responsive UI for end users and researchers.

---