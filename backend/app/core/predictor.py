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
        # Preprocess the input message
        processed = preprocess_message(message)

        # Run model prediction
        prob = float(state.model.predict(processed, verbose=0)[0][0])

        # Determine if the message is spam
        is_spam = prob > 0.5
        label = "spam" if is_spam else "ham"

        # Calculate confidence percentage
        conf = prob if is_spam else (1 - prob)

        # Return label and confidence
        return label, round(conf * 100, 2)

    except Exception as e:
        # Log and raise error if prediction fails
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")

def save_prediction_history(message: str, prediction: str, confidence: float) -> None:
    # Create message preview for history
    preview = message[:50] + "..." if len(message) > 50 else message

    # Append prediction record to history
    state.prediction_history.append({
        "message": preview,
        "prediction": prediction,
        "confidence": confidence,
        "timestamp": datetime.now().isoformat()
    })

    # Keep only last 100 records
    if len(state.prediction_history) > 100:
        state.prediction_history.pop(0)
