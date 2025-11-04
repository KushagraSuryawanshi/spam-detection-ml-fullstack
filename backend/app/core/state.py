from typing import Any, List, Dict

# Global (in-memory) state. For prod, move to DB/Redis.
model: Any = None
tokenizer: Any = None

# Where your files live
MODEL_PATH = "models/cnn_spam_model.keras"
TOKENIZER_PATH = "models/cnn_tokenizer.pkl"

# History + metrics
prediction_history: List[Dict] = []
MODEL_METRICS = {
    "accuracy": 0.9847,
    "precision": 0.9823,
    "recall": 0.9756,
    "f1_score": 0.9789,
}
