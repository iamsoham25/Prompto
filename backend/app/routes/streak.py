from fastapi import APIRouter
from datetime import datetime, timedelta

from app.config.db import db

router = APIRouter()

streak_collection = db[
    "user_learning_streak"
]


@router.post("/streak/update")
async def update_streak(
    data: dict
):

    email = data.get(
        "user_email"
    )

    today = datetime.utcnow().date()

    streak = await streak_collection.find_one(
        {
            "user_email": email
        }
    )

    if not streak:

        await streak_collection.insert_one(
            {
                "user_email": email,
                "current_streak": 1,
                "best_streak": 1,
                "last_active": str(today)
            }
        )

        return {
            "success": True
        }

    last_active = datetime.strptime(
        streak["last_active"],
        "%Y-%m-%d"
    ).date()

    difference = (
        today - last_active
    ).days

    current = streak[
        "current_streak"
    ]

    if difference == 1:

        current += 1

    elif difference > 1:

        current = 1

    best = max(
        current,
        streak["best_streak"]
    )

    await streak_collection.update_one(

        {
            "user_email": email
        },

        {
            "$set": {

                "current_streak": current,

                "best_streak": best,

                "last_active": str(today)
            }
        }
    )

    return {
        "success": True
    }

@router.get("/streak/{email}")
async def get_streak(
    email: str
):

    streak = await streak_collection.find_one(
        {
            "user_email": email
        }
    )

    if not streak:

        return {
            "current_streak": 0,
            "best_streak": 0
        }

    return {

        "current_streak":
            streak.get(
                "current_streak",
                0
            ),

        "best_streak":
            streak.get(
                "best_streak",
                0
            )
    }