from fastapi import APIRouter
from app.config.db import db
from app.models.chat import ChatModel
from app.config.db import db

users_collection = db["users"]

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


@router.get("/dashboard-stats/{email}")
async def dashboard_stats(email: str):

    user = await users_collection.find_one(
        {"email": email}
    )

    total_chats = await chat_collection.count_documents(
        {"user_email": email}
    )

    if total_chats <= 10:
        skill_level = "Beginner"

    elif total_chats <= 25:
        skill_level = "Intermediate"

    else:
        skill_level = "Advanced"

    return {
        "success": True,
        "username": user["username"] if user else "User",
        "email": email,
        "total_chats": total_chats,
        "completed_lessons": 0,
        "skill_level": skill_level
    }

@router.get("/recent-chats/{email}")
async def recent_chats(email: str):

    cursor = chat_collection.find(
        {"user_email": email},
        {"_id": 0, "prompt": 1}
    ).sort("_id", -1).limit(5)

    chats = await cursor.to_list(length=5)

    return {
        "success": True,
        "chats": chats
    }