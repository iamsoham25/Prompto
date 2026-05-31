from fastapi import APIRouter
from app.config.db import db

router = APIRouter()

challenge_collection = db["challenges"]


@router.get("/challenges")
async def get_challenges():

    cursor = challenge_collection.find(
        {},
        {"_id": 0}
    )

    challenges = await cursor.to_list(
        length=100
    )

    return {
        "success": True,
        "challenges": challenges
    }

@router.get("/challenge/{index}")
async def get_challenge(index: int):

    cursor = challenge_collection.find(
        {},
        {"_id": 0}
    )

    challenges = await cursor.to_list(
        length=100
    )

    if index >= len(challenges):

        return {
            "success": False,
            "message": "Challenge not found"
        }

    return {
        "success": True,
        "challenge": challenges[index]
    }