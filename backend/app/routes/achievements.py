from fastapi import APIRouter
from app.config.db import db

router = APIRouter()

@router.post("/achievements/check/{email}")
async def check_achievements(email: str):

    xp_doc = await db.user_xp.find_one(
        {"user_email": email}
    )

    streak_doc = await db.user_learning_streak.find_one(
        {"user_email": email}
    )

    prompt_count = await db.prompt_submissions.count_documents(
        {"user_email": email}
    )

    xp = xp_doc.get("xp", 0) if xp_doc else 0

    streak = (
        streak_doc.get("current_streak", 0)
        if streak_doc else 0
    )

    achievements = []

    if prompt_count >= 1:
        achievements.append({
            "title": "First Prompt",
            "icon": "🎯",
            "unlocked": True
        })

    if prompt_count >= 5:
        achievements.append({
            "title": "Prompt Explorer",
            "icon": "🚀",
            "unlocked": True
        })

    if xp >= 250:
        achievements.append({
            "title": "Prompt Engineer",
            "icon": "⚡",
            "unlocked": True
        })

    if xp >= 500:
        achievements.append({
            "title": "Prompt Guru",
            "icon": "👑",
            "unlocked": True
        })

    if streak >= 7:
        achievements.append({
            "title": "Consistency Master",
            "icon": "🔥",
            "unlocked": True
        })

    await db.achievements.update_one(
        {"user_email": email},
        {
            "$set": {
                "achievements": achievements
            }
        },
        upsert=True
    )

    return {
        "success": True,
        "achievements": achievements
    }


@router.get("/achievements/{email}")
async def get_achievements(email: str):

    data = await db.achievements.find_one(
        {"user_email": email}
    )

    if not data:
        return {
            "success": True,
            "achievements": []
        }

    return {
        "success": True,
        "achievements": data["achievements"]
    }