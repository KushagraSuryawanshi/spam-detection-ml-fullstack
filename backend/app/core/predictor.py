from datetime import datetime
from fastapi import HTTPException
from app.core import state
from app.core.preprocessor import preprocess_message
from app.utils.logger import logger
import numpy as np

def predict_spam(message: str) -> tuple[str, float]:
   
    # Runs spam detection inference on input message.

    # Validate model is loaded
    if state.model is None:
        logger.error("Prediction attempted with no model loaded")
        raise HTTPException(
            status_code=503, 
            detail="AI model not loaded. Please wait for initialization or reload the model."
        )
    
    try:
        # Preprocess the input message with error handling
        try:
            processed = preprocess_message(message)
        except ValueError as ve:
            logger.warning(f"Preprocessing validation error: {ve}")
            raise HTTPException(status_code=422, detail=f"Invalid message format: {str(ve)}")
        except Exception as pe:
            logger.error(f"Preprocessing failed: {pe}")
            raise HTTPException(status_code=422, detail="Failed to process message. Check input format.")

        # Validate preprocessed output shape
        if processed is None or processed.shape[0] == 0:
            logger.error("Preprocessing returned empty result")
            raise HTTPException(status_code=422, detail="Message preprocessing resulted in empty output")

        # Run model prediction with error handling
        try:
            prediction_result = state.model.predict(processed, verbose=0)
            prob = float(prediction_result[0][0])
        except Exception as me:
            logger.error(f"Model inference failed: {me}")
            raise HTTPException(
                status_code=500, 
                detail="Model inference error. The AI model may be corrupted. Try reloading."
            )

        # Validate probability output
        if not isinstance(prob, (int, float)) or not (0 <= prob <= 1):
            logger.error(f"Invalid probability output: {prob}")
            raise HTTPException(
                status_code=500, 
                detail=f"Model returned invalid probability: {prob}"
            )

        # Determine if the message is spam
        is_spam = prob > 0.5
        label = "spam" if is_spam else "ham"

        # Calculate confidence percentage (higher confidence for the predicted class)
        confidence = prob if is_spam else (1 - prob)

        # Log successful prediction
        logger.info(f"Prediction successful: {label} ({confidence*100:.2f}% confidence)")

        # Return label and confidence percentage
        return label, round(confidence * 100, 2)

    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        # Catch any unexpected errors
        logger.error(f"Unexpected error in predict_spam: {type(e).__name__}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected prediction error: {type(e).__name__}"
        )

def save_prediction_history(message: str, prediction: str, confidence: float) -> None:

    # Saves prediction result to in-memory history.
    

    try:
        # Create message preview for history (max 100 chars)
        preview = message[:100] + "..." if len(message) > 100 else message

        # Create prediction record with full metadata
        prediction_record = {
            "message_preview": preview,
            "prediction": prediction,
            "confidence": confidence,  # Store as decimal (0-1)
            "timestamp": datetime.now().isoformat(),
            "processing_time": 0  # Will be updated by route handler
        }

        # Append prediction record to history
        state.prediction_history.append(prediction_record)

        # Maintain maximum history size of 100 records
        if len(state.prediction_history) > 100:
            state.prediction_history.pop(0)
            
        logger.debug(f"Saved prediction to history: {prediction} ({confidence}%)")

    except Exception as e:
        # Log error but don't fail the prediction
        logger.error(f"Failed to save prediction history: {e}")
        # Don't raise exception - history saving failure shouldn't break prediction