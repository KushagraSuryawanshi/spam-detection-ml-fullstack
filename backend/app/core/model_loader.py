import pickle
from tensorflow import keras
from app.core import state
from app.utils.logger import logger

def load_model_and_tokenizer() -> bool:
    """
    Loads the CNN model and tokenizer from disk into global state.
    Returns True on success, False otherwise.
    """
    try:
        logger.info(f"Loading model from {state.MODEL_PATH}")
        state.model = keras.models.load_model(state.MODEL_PATH)
        logger.info("Model loaded successfully")

        logger.info(f"Loading tokenizer from {state.TOKENIZER_PATH}")
        with open(state.TOKENIZER_PATH, "rb") as f:
            state.tokenizer = pickle.load(f)
        logger.info("Tokenizer loaded successfully")

        return True
    except Exception as e:
        logger.error(f"Failed to load model/tokenizer: {e}")
        state.model = None
        state.tokenizer = None
        return False
