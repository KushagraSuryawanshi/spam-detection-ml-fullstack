from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.core import state
from app.core.model_loader import load_model_and_tokenizer
from app.schemas.response_models import StatisticsResponse

# Initialize router for management-related endpoints
router = APIRouter(tags=["Management"])

@router.get("/statistics", response_model=StatisticsResponse)
async def get_statistics():
    # Count spam and ham predictions from history
    spam_count = sum(1 for p in state.prediction_history if p["prediction"] == "spam")
    ham_count = sum(1 for p in state.prediction_history if p["prediction"] == "ham")

    # Return model metrics and prediction statistics
    return StatisticsResponse(
        accuracy=state.MODEL_METRICS["accuracy"],
        precision=state.MODEL_METRICS["precision"],
        recall=state.MODEL_METRICS["recall"],
        f1_score=state.MODEL_METRICS["f1_score"],
        total_predictions=len(state.prediction_history),
        spam_count=spam_count,
        ham_count=ham_count,
        recent_predictions=state.prediction_history[-10:],
    )

@router.delete("/history")
async def clear_history():
    # Clear prediction history and confirm action
    state.prediction_history.clear()
    return {
        "message": "Prediction history cleared successfully",
        "timestamp": datetime.now().isoformat(),
    }

@router.put("/model/reload")
async def reload_model():
    # Reload model and tokenizer if possible
    if load_model_and_tokenizer():
        return {
            "message": "Model reloaded successfully",
            "timestamp": datetime.now().isoformat(),
        }

    # Raise error if reload fails
    raise HTTPException(status_code=500, detail="Model reload failed")
