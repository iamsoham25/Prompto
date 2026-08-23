from datetime import datetime

from app.config.db import db


challenge_progress_collection = db["challenge_progress"]


async def save_challenge_progress(
    user_email: str,
    track: str,
    challenge_id: int,
    score: float,
    xp: int,
    completed: bool
):
    await challenge_progress_collection.update_one(
        {
            "user_email": user_email,
            "track": track,
            "challenge_id": challenge_id
        },
        {
            "$set": {
                "user_email": user_email,
                "track": track,
                "challenge_id": challenge_id,
                "score": score,
                "xp": xp,
                "completed": completed,
                "completed_at": datetime.utcnow()
            }
        },
        upsert=True
    )


async def get_track_progress(
    user_email: str,
    track: str
):
    cursor = challenge_progress_collection.find(
        {
            "user_email": user_email,
            "track": track
        },
        {
            "_id": 0
        }
    )

    return await cursor.to_list(length=None)