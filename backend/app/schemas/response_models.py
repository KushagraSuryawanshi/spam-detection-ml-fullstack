from pydantic import BaseModel
from typing import List, Dict

# Response model for single prediction result
class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    timestamp: str
    message_preview: str
    processing_time: float

# Response model for model statistics and prediction history summary
class StatisticsResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    total_predictions: int
    spam_count: int
    ham_count: int
    recent_predictions: List[Dict]

# Response model for health check endpoint
class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    timestamp: str
