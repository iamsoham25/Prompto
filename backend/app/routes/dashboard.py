from fastapi import APIRouter  # type: ignore[import]
from app.config.db import db

router = APIRouter()

user_xp_collection = db["user_xp"]
users_collection = db["users"]
lesson_collection = db["lesson_completions"]
challenge_collection = db["challenge_completions"]
challenge_master_collection = db["challenges"]
prompt_collection = db["prompt_analytics"]


@router.get("/user-xp/{email}")
async def get_user_xp(email: str):

    user = await user_xp_collection.find_one(
        {"user_email": email}
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

    leaderboard = []

    async for user in user_xp_collection.find().sort("xp", -1):

        username = user["user_email"]

        user_data = await users_collection.find_one(
            {"email": user["user_email"]}
        )

        if user_data:
            username = user_data["username"]

        leaderboard.append({
            "name": username,
            "xp": user["xp"]
        })

    return {
        "success": True,
        "leaderboard": leaderboard
    }


@router.get("/user-rank/{email}")
async def get_user_rank(email: str):

    users = []

    async for user in user_xp_collection.find().sort("xp", -1):
        users.append(user)

    rank = 1

    for user in users:

        if user["user_email"] == email:

            return {
                "success": True,
                "rank": rank
            }

        rank += 1

    return {
        "success": True,
        "rank": "-"
    }


@router.get("/achievements/{email}")
async def get_achievements(email: str):

    achievements = []

    lessons_completed = await lesson_collection.count_documents(
        {"user_email": email}
    )

    challenge_completed = await challenge_collection.count_documents(
        {"user_email": email}
    )

    prompts_analyzed = await prompt_collection.count_documents(
        {"user_email": email}
    )

    if lessons_completed >= 1:
        achievements.append("First Lesson Completed")

    if lessons_completed >= 10:
        achievements.append("Lesson Master")

    if challenge_completed >= 1:
        achievements.append("First Challenge Completed")

    if challenge_completed >= 5:
        achievements.append("Challenge Champion")

    if prompts_analyzed >= 5:
        achievements.append("Prompt Beginner")

    if prompts_analyzed >= 10:
        achievements.append("Prompt Engineer")

    return {
        "success": True,
        "achievements": achievements
    }


@router.get("/daily-challenge")
async def get_daily_challenge():

    challenge = await challenge_master_collection.find_one()

    if not challenge:

        return {
            "success": False,
            "message": "No challenge found"
        }

    return {
        "success": True,
        "challenge": {
            "title": challenge["title"],
            "description": challenge["description"],
            "difficulty": challenge["difficulty"],
            "xp": challenge["xp_reward"]
        }
    }