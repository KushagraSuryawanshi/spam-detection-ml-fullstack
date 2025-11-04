from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.health_routes import router as health_router
from app.routes.predict_routes import router as predict_router
from app.routes.management_routes import router as mgmt_router
from app.core.model_loader import load_model_and_tokenizer
from app.utils.logger import logger

app = FastAPI(
    title="Spam Detection API",
    description="AI-powered spam detection using CNN deep learning model",
    version="1.0.0",
)

# CORS (tighten these in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health_router)
app.include_router(predict_router)
app.include_router(mgmt_router)

@app.on_event("startup")
async def startup_event():
    ok = load_model_and_tokenizer()
    if ok:
        logger.info("Model & tokenizer loaded on startup")
    else:
        logger.warning("Model/tokenizer failed to load on startup")

# For local debug: python -m uvicorn app.main:app --reload
