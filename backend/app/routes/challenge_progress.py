from fastapi import APIRouter

from app.services.challenge_progress_service import (
    save_challenge_progress,
    get_track_progress
)

router = APIRouter()


@router.post("/challenge-progress")
async def save_progress(data: dict):

    await save_challenge_progress(

        user_email=data["user_email"],

        track=data["track"],

        challenge_id=data["challenge_id"],

        score=data["score"],

        xp=data["xp"],

        completed=data["completed"]

    )

    return {
        "success": True
    }


@router.get("/challenge-progress/{email}/{track}")
async def progress(
    email: str,
    track: str
):

    data = await get_track_progress(
        email,
        track
    )

    return {

        "success": True,

        "progress": data

    }