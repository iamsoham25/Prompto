from fastapi import APIRouter
from app.config.db import db

router = APIRouter()

xp_collection = db["user_xp"]


@router.get("/xp/{email}")
async def get_user_xp(email: str):

    user = await xp_collection.find_one(
        {
            "user_email": email
        }
    )

    if not user:
        return {
            "xp": 0,
            "level": 1,
            "rank": "Beginner"
        }

    xp = user.get("xp", 0)

    if xp < 200:
        rank = "Beginner"
        level = 1

    elif xp < 500:
        rank = "Intermediate"
        level = 2

    elif xp < 1000:
        rank = "Advanced"
        level = 3

    elif xp < 2000:
        rank = "Expert"
        level = 4

    else:
        rank = "Master"
        level = 5

    return {
        "xp": xp,
        "level": level,
        "rank": rank
    }