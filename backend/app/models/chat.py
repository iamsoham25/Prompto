from pydantic import BaseModel

class ChatModel(BaseModel):
    user_email: str
    prompt: str
    response: str