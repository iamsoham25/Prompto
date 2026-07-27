from fastapi import APIRouter
from datetime import datetime

from app.services.challenge_submission_service import (
    save_challenge_submission
)

router = APIRouter()


@router.post("/submit-challenge")
async def submit_challenge(data: dict):

    document = {
        "user_email": data["user_email"],
        "track": data["track"],
        "challenge_id": data["challenge_id"],
        "challenge_title": data["challenge_title"],
        "difficulty": data["difficulty"],
        "prompt": data["prompt"],
        "evaluation": data["evaluation"],
        "score": data["score"],
        "xp": data["xp"],
        "passed": data["passed"],
        "submitted_at": datetime.utcnow()
    }

    await save_challenge_submission(document)

    return {
        "success": True,
        "message": "Challenge submitted successfully."
    }