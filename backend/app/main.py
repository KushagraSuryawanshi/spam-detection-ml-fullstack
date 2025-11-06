from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.health_routes import router as health_router
from app.routes.predict_routes import router as predict_router
from app.routes.management_routes import router as mgmt_router
from app.core.model_loader import load_model_and_tokenizer
from app.utils.logger import logger

# Initialize FastAPI application
app = FastAPI(
    title="Spam Detection API",
    description="AI-powered spam detection using CNN deep learning model",
    version="1.0.0",
)

# Configure CORS (for production, restrict allowed origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(health_router)
app.include_router(predict_router)
app.include_router(mgmt_router)

@app.on_event("startup")
async def startup_event():
    # Load model and tokenizer when app starts
    ok = load_model_and_tokenizer()
    if ok:
        logger.info("Model & tokenizer loaded on startup")
    else:
        logger.warning("Model/tokenizer failed to load on startup")

# Local run example:
# python -m uvicorn app.main:app --reload
