from pydantic import BaseModel, validator
from typing import List

class MessageRequest(BaseModel):
    message: str

    @validator("message")
    def validate_message(cls, v: str):
        if not v or not v.strip():
            raise ValueError("Message cannot be empty")
        if len(v) > 5000:
            raise ValueError("Message too long (max 5000 characters)")
        return v.strip()

class BatchMessageRequest(BaseModel):
    messages: List[str]

    @validator("messages")
    def validate_messages(cls, v: list[str]):
        if not v:
            raise ValueError("Messages list cannot be empty")
        if len(v) > 100:
            raise ValueError("Maximum 100 messages per batch")
        return v
