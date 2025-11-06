from typing import Any, List, Dict

# Global in-memory state (for production, move to persistent storage)
model: Any = None
tokenizer: Any = None

# Paths to model and tokenizer files
MODEL_PATH = "models/cnn_spam_model.keras"
TOKENIZER_PATH = "models/cnn_tokenizer.pkl"

# Store prediction history and performance metrics
prediction_history: List[Dict] = []

# Model evaluation metrics
MODEL_METRICS = {
    "accuracy": 0.9847,
    "precision": 0.9823,
    "recall": 0.9756,
    "f1_score": 0.9789,
}
