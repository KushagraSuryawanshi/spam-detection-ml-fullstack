from fastapi import HTTPException
import numpy as np
import tensorflow as tf
from app.core import state
from app.utils.logger import logger

def preprocess_message(message: str, max_length: int = 100) -> np.ndarray:
    """
    Tokenizes and pads a single message for model input.
    """
    try:
        # Convert input message to sequence of tokens
        sequence = state.tokenizer.texts_to_sequences([message])

        # Pad or truncate the token sequence to fixed length
        padded = tf.keras.preprocessing.sequence.pad_sequences(
            sequence, maxlen=max_length, padding="post", truncating="post"
        )

        # Return the preprocessed array
        return padded

    except Exception as e:
        # Log and raise error if preprocessing fails
        logger.error(f"Preprocessing failed: {e}")
        raise HTTPException(status_code=500, detail="Preprocessing failed")
