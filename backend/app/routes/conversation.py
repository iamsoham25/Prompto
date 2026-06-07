from fastapi import APIRouter
from app.config.db import db

router = APIRouter()

conversation_collection = db["conversations"]


@router.post("/new-conversation")
async def new_conversation(data: dict):

    conversation = {
        "user_email": data["user_email"],
        "title": "New Chat",
        "messages": []
    }

    result = await conversation_collection.insert_one(
        conversation
    )

    return {
        "success": True,
        "conversation_id": str(
            result.inserted_id
        )
    }


from bson import ObjectId


@router.post("/add-message")
async def add_message(data: dict):

    conversation_id = data["conversation_id"]

    message = {
        "role": data["role"],
        "content": data["content"]
    }

    await conversation_collection.update_one(
        {
            "_id": ObjectId(conversation_id)
        },
        {
            "$push": {
                "messages": message
            }
        }
    )

    return {
        "success": True
    }