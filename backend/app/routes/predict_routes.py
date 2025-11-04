from fastapi import APIRouter, HTTPException, UploadFile, File
from datetime import datetime
import io, csv

from app.core import state
from app.core.predictor import predict_spam, save_prediction_history
from app.schemas.request_models import MessageRequest, BatchMessageRequest
from app.schemas.response_models import PredictionResponse

router = APIRouter(prefix="", tags=["Predict"])

@router.post("/predict", response_model=PredictionResponse)
async def predict_message(request: MessageRequest):
    if state.model is None or state.tokenizer is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please try again later.")
    start = datetime.now()
    label, conf = predict_spam(request.message)
    save_prediction_history(request.message, label, conf)
    return PredictionResponse(
        prediction=label,
        confidence=conf,
        timestamp=datetime.now().isoformat(),
        message_preview=(request.message[:100] + "...") if len(request.message) > 100 else request.message,
        processing_time=round((datetime.now() - start).total_seconds(), 4),
    )

@router.post("/predict/batch")
async def predict_batch(request: BatchMessageRequest):
    if state.model is None or state.tokenizer is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please try again later.")
    results = []
    start = datetime.now()
    for msg in request.messages:
        if not msg or not msg.strip():
            continue
        label, conf = predict_spam(msg)
        save_prediction_history(msg, label, conf)
        preview = msg[:50] + "..." if len(msg) > 50 else msg
        results.append({"message": preview, "prediction": label, "confidence": conf})
    return {
        "total_processed": len(results),
        "processing_time": round((datetime.now() - start).total_seconds(), 4),
        "results": results,
    }

@router.post("/predict/file")
async def predict_from_file(file: UploadFile = File(...)):
    if state.model is None or state.tokenizer is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please try again later.")
    content = await file.read()
    text = content.decode("utf-8")

    # Parse messages
    if file.filename.endswith(".csv"):
        reader = csv.reader(io.StringIO(text))
        first = next(reader, None)
        rows = [r[0] for r in reader] if first else []
        messages = rows
    elif file.filename.endswith(".txt"):
        messages = [line.strip() for line in text.splitlines() if line.strip()]
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Use CSV or TXT.")

    results = []
    for msg in messages[:100]:
        label, conf = predict_spam(msg)
        preview = msg[:50] + "..." if len(msg) > 50 else msg
        results.append({"message": preview, "prediction": label, "confidence": conf})

    return {"filename": file.filename, "total_processed": len(results), "results": results}
