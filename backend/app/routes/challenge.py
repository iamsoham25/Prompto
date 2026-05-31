from fastapi import APIRouter
from app.config.db import db
from app.models.challenge_completion import (
    ChallengeCompletionModel
)

router = APIRouter()

challenge_collection = db["challenges"]

completion_collection = db[
    "challenge_completions"
]


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

@router.post("/complete-challenge")
async def complete_challenge(
    data: ChallengeCompletionModel
):

    existing = await (
        completion_collection.find_one(
            {
                "user_email":
                data.user_email,

                "challenge_id":
                data.challenge_id
            }
        )
    )

    if existing:

        return {
            "success": False,
            "message":
            "Challenge already completed"
        }

    await completion_collection.insert_one(
        {
            "user_email":
            data.user_email,

            "challenge_id":
            data.challenge_id,

            "xp_earned":
            data.xp_earned
        }
    )

    return {
        "success": True,
        "xp_earned":
        data.xp_earned
    }

@router.get("/user-xp/{email}")
async def get_user_xp(
    email: str
):

    cursor = (
        completion_collection.find(
            {
                "user_email": email
            }
        )
    )

    completions = await (
        cursor.to_list(length=100)
    )

    total_xp = sum(
        item["xp_earned"]
        for item in completions
    )

    return {
        "success": True,
        "xp": total_xp
    }