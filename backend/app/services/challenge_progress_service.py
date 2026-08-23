from datetime import datetime, timezone

from app.config.db import db


challenge_progress_collection = db["challenge_progress"]
user_xp_collection = db["user_xp"]


async def save_challenge_progress(
    user_email: str,
    track: str,
    challenge_id: int,
    score: float,
    xp: int,
    completed: bool
):

    # ---------------------------------------------------------
    # Check existing progress
    # ---------------------------------------------------------

    existing = await challenge_progress_collection.find_one(
        {
            "user_email": user_email,
            "track": track,
            "challenge_id": challenge_id
        }
    )

    # ---------------------------------------------------------
    # Determine whether this is a NEW completion
    # ---------------------------------------------------------

    new_completion = (
        completed
        and (
            existing is None
            or not existing.get("completed", False)
        )
    )

    # ---------------------------------------------------------
    # Save / update challenge progress
    # ---------------------------------------------------------

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
                "completed_at": (
                    datetime.now(timezone.utc)
                    if completed
                    else None
                )
            }
        },
        upsert=True
    )

    # ---------------------------------------------------------
    # Add XP ONLY when challenge is completed for first time
    # ---------------------------------------------------------

    if new_completion:

        await user_xp_collection.update_one(
            {
                "user_email": user_email
            },
            {
                "$inc": {
                    "xp": int(xp)
                },

                "$set": {
                    "user_email": user_email,
                    "updated_at": datetime.now(timezone.utc)
                }
            },
            upsert=True
        )

    return {
        "success": True,
        "xp_added": int(xp) if new_completion else 0,
        "new_completion": new_completion
    }


async def get_track_progress(
    user_email: str,
    track: str
):

    cursor = challenge_progress_collection.find(
        {
            "user_email": user_email,
            "track": track
        }
    )

    progress = await cursor.to_list(length=None)

    # ---------------------------------------------------------
    # Convert MongoDB ObjectId to string
    # ---------------------------------------------------------

    for item in progress:

        if "_id" in item:

            item["_id"] = str(item["_id"])

    return progress