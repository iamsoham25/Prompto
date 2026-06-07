from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str
    content: str

class ConversationModel(BaseModel):
    user_email: str
    title: str
    messages: List[Message] = []