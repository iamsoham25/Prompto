from fastapi import APIRouter
from app.config.db import db
from app.config.db import user_xp_collection
from app.models.challenge_completion import (
    ChallengeCompletionModel
)

router = APIRouter()

challenge_collection = db["challenges"]

completion_collection = db[
    "challenge_completions"
]

users_collection = db["users"]

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
async def get_user_xp(email: str):

    user = await user_xp_collection.find_one(
        {
            "user_email": email
        }
    )

    if not user:
        return {
            "success": True,
            "xp": 0
        }

    return {
        "success": True,
        "xp": user["xp"]
    }

@router.get("/leaderboard")
async def get_leaderboard():

    cursor = completion_collection.find({})

    completions = await cursor.to_list(
        length=1000
    )

    leaderboard = {}

    for item in completions:

        email = item["user_email"]

        xp = item["xp_earned"]

        if email not in leaderboard:

            leaderboard[email] = 0

        leaderboard[email] += xp

    ranking = []

    for email, xp in leaderboard.items():

        ranking.append({
            "email": email,
            "xp": xp
        })

    ranking.sort(
        key=lambda x: x["xp"],
        reverse=True
    )

    return {
        "success": True,
        "leaderboard": ranking[:10]
    }

@router.get("/leaderboard")
async def get_leaderboard():

    cursor = completion_collection.find({})

    completions = await cursor.to_list(
        length=1000
    )

    xp_map = {}

    for item in completions:

        email = item["user_email"]

        xp = item["xp_earned"]

        if email not in xp_map:

            xp_map[email] = 0

        xp_map[email] += xp

    leaderboard = []

    for email, xp in xp_map.items():

        user = await users_collection.find_one(
            {"email": email}
        )

        username = (
            user["username"]
            if user
            else email
        )

        leaderboard.append(
            {
                "username": username,
                "xp": xp
            }
        )

    leaderboard.sort(
        key=lambda x: x["xp"],
        reverse=True
    )

    return {
        "success": True,
        "leaderboard": leaderboard[:10]
    }

@router.get("/achievements/{email}")
async def get_achievements(
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

    badges = []

    if total_xp >= 50:

        badges.append(
            "Beginner Explorer"
        )

    if total_xp >= 100:

        badges.append(
            "Prompt Apprentice"
        )

    if total_xp >= 250:

        badges.append(
            "Prompt Engineer"
        )

    if total_xp >= 500:

        badges.append(
            "AI Architect"
        )

    return {
        "success": True,
        "badges": badges
    }

@router.get("/daily-challenge")
async def get_daily_challenge():

    cursor = challenge_collection.find(
        {},
        {"_id": 0}
    )

    challenges = await cursor.to_list(
        length=100
    )

    if len(challenges) == 0:

        return {
            "success": False,
            "message": "No challenges found"
        }

    return {
        "success": True,
        "challenge": challenges[0]
    }

@router.get("/daily-challenge")
async def get_daily_challenge():

    cursor = challenge_collection.find(
        {},
        {"_id": 0}
    )

    challenges = await cursor.to_list(
        length=100
    )

    if len(challenges) == 0:

        return {
            "success": False,
            "message": "No challenges found"
        }

    return {
        "success": True,
        "challenge": challenges[0]
    }

@router.get("/user-rank/{email}")
async def get_user_rank(
    email: str
):

    cursor = completion_collection.find({})

    completions = await cursor.to_list(
        length=1000
    )

    xp_map = {}

    for item in completions:

        user_email = item["user_email"]

        xp = item["xp_earned"]

        if user_email not in xp_map:

            xp_map[user_email] = 0

        xp_map[user_email] += xp

    ranking = sorted(
        xp_map.items(),
        key=lambda x: x[1],
        reverse=True
    )

    rank = None

    for index, (
        user_email,
        _
    ) in enumerate(ranking):

        if user_email == email:

            rank = index + 1

            break

    return {
        "success": True,
        "rank": rank
    }