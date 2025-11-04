from datetime import datetime
from fastapi import HTTPException
from app.core import state
from app.core.preprocessor import preprocess_message
from app.utils.logger import logger

def predict_spam(message: str) -> tuple[str, float]:
    """
    Runs inference and returns (label, confidence_percent).
    """
    try:
        processed = preprocess_message(message)
        prob = float(state.model.predict(processed, verbose=0)[0][0])
        is_spam = prob > 0.5
        label = "spam" if is_spam else "ham"
        conf = prob if is_spam else (1 - prob)
        return label, round(conf * 100, 2)
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")

def save_prediction_history(message: str, prediction: str, confidence: float) -> None:
    preview = message[:50] + "..." if len(message) > 50 else message
    state.prediction_history.append({
        "message": preview,
        "prediction": prediction,
        "confidence": confidence,
        "timestamp": datetime.now().isoformat()
    })
    if len(state.prediction_history) > 100:
        state.prediction_history.pop(0)
