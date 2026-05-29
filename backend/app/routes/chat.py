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

    cursor = chat_collection.find(
        {"user_email": email},
        {"_id": 0}
    )

    chats = await cursor.to_list(length=100)

    return {
        "success": True,
        "history": chats
    }


@router.get("/chat-count/{email}")
async def get_chat_count(email: str):

    count = await chat_collection.count_documents(
        {"user_email": email}
    )

    return {
        "success": True,
        "count": count
    }