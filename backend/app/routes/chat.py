from fastapi import APIRouter
from app.config.db import db
from app.models.chat import ChatModel

router = APIRouter()

chat_collection = db["chat_history"]

@router.post("/save-chat")
async def save_chat(chat: ChatModel):

    data = {
        "user_email": chat.user_email,
        "prompt": chat.prompt,
        "response": chat.response
    }

    result = await chat_collection.insert_one(data)

    return {
        "success": True,
        "id": str(result.inserted_id)
    }


@router.get("/chat-history/{email}")
async def get_chat_history(email: str):

    chats = list(
        chat_collection.find(
            {"user_email": email},
            {"_id": 0}
        )
    )

    return {
        "success": True,
        "history": chats
    }