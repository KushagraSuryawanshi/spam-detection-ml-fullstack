from fastapi import APIRouter
from datetime import datetime
from app.core import state
from app.schemas.response_models import HealthResponse

router = APIRouter(tags=["Health"])

@router.get("/", response_model=dict)
async def root():
    return {
        "message": "Spam Detection API",
        "version": "1.0.0",
        "endpoints": {
            "POST /predict": "Predict single message",
            "POST /predict/batch": "Predict multiple messages",
            "POST /predict/file": "Predict from file",
            "GET /statistics": "Get model statistics",
            "GET /health": "Health check",
            "DELETE /history": "Clear prediction history",
            "PUT /model/reload": "Reload model",
        },
    }

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy" if state.model is not None else "unhealthy",
        model_loaded=state.model is not None,
        timestamp=datetime.now().isoformat(),
    )
