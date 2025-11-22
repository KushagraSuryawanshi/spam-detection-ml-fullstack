from pydantic import BaseModel, validator
from typing import List

# Schema for single message prediction request
class MessageRequest(BaseModel):
    message: str

    @validator("message")
    def validate_message(cls, v: str):
        # Validate message is not empty
        if not v or not v.strip():
            raise ValueError("Message cannot be empty")
        # Validate message length

        cleaned = v.strip()

        if len(cleaned) < 10:
            raise ValueError("Message too short (minimum 10 characters required for accurate analysis)")
        
        if len(cleaned) > 5000:
            raise ValueError("Message too long (maximum 5000 characters)")
        
        return cleaned

# Schema for batch message prediction request
class BatchMessageRequest(BaseModel):
    messages: List[str]

    @validator("messages")
    def validate_messages(cls, v: list[str]):
        # Validate messages list is not empty
        if not v:
            raise ValueError("Messages list cannot be empty")
        # Validate batch size limit
        if len(v) > 100:
            raise ValueError("Maximum 100 messages per batch")
        return v
