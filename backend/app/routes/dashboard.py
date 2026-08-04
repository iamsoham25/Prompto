from fastapi import APIRouter
from datetime import datetime, timezone

from app.config.db import db


router = APIRouter()


# ==========================================================
# MongoDB Collections
# ==========================================================

user_xp_collection = db["user_xp"]

users_collection = db["users"]

lesson_collection = db["lesson_completions"]

challenge_progress_collection = db["challenge_progress"]

challenge_submission_collection = db["challenge_submissions"]

challenge_master_collection = db["challenges"]


# ==========================================================
# Helper
# ==========================================================

def calculate_xp_profile(xp: int):

    """
    Central XP level calculation.

    Beginner:
        0 - 199 XP

    Intermediate:
        200 - 499 XP

    Advanced:
        500 - 999 XP

    Expert:
        1000 - 1999 XP

    Master:
        2000+ XP
    """

    if xp < 200:

        return {
            "level": 1,
            "rank": "Beginner",
            "current_level_xp": xp,
            "next_level_xp": 200,
            "progress": round((xp / 200) * 100, 2)
        }

    elif xp < 500:

        current = xp - 200
        required = 300

        return {
            "level": 2,
            "rank": "Intermediate",
            "current_level_xp": current,
            "next_level_xp": required,
            "progress": round((current / required) * 100, 2)
        }

    elif xp < 1000:

        current = xp - 500
        required = 500

        return {
            "level": 3,
            "rank": "Advanced",
            "current_level_xp": current,
            "next_level_xp": required,
            "progress": round((current / required) * 100, 2)
        }

    elif xp < 2000:

        current = xp - 1000
        required = 1000

        return {
            "level": 4,
            "rank": "Expert",
            "current_level_xp": current,
            "next_level_xp": required,
            "progress": round((current / required) * 100, 2)
        }

    else:

        return {
            "level": 5,
            "rank": "Master",
            "current_level_xp": xp,
            "next_level_xp": xp,
            "progress": 100
        }


# ==========================================================
# User XP Profile
# ==========================================================

@router.get("/xp/{email}")
async def get_xp_profile(email: str):

    user = await user_xp_collection.find_one(
        {
            "user_email": email
        }
    )

    xp = 0

    if user:

        xp = int(
            user.get(
                "xp",
                0
            )
        )

    profile = calculate_xp_profile(xp)

    return {

        "success": True,

        "xp": xp,

        "level": profile["level"],

        "rank": profile["rank"],

        "current_level_xp":
            profile["current_level_xp"],

        "next_level_xp":
            profile["next_level_xp"],

        "progress":
            profile["progress"]

    }


# ==========================================================
# Backward Compatible User XP
# ==========================================================

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
        "xp": int(
            user.get(
                "xp",
                0
            )
        )
    }


# ==========================================================
# Leaderboard
# ==========================================================

@router.get("/leaderboard")
async def get_leaderboard():

    leaderboard = []

    cursor = user_xp_collection.find().sort(
        "xp",
        -1
    )

    position = 1

    async for user in cursor:

        email = user.get(
            "user_email",
            ""
        )

        username = email

        user_data = await users_collection.find_one(
            {
                "email": email
            }
        )

        if user_data:

            username = (
                user_data.get("username")
                or user_data.get("name")
                or email
            )

        leaderboard.append({

            "position": position,

            "name": username,

            "user_email": email,

            "xp": int(
                user.get(
                    "xp",
                    0
                )
            )

        })

        position += 1

    return {

        "success": True,

        "leaderboard": leaderboard

    }


# ==========================================================
# User Rank
# ==========================================================

@router.get("/user-rank/{email}")
async def get_user_rank(email: str):

    users = await user_xp_collection.find().sort(
        "xp",
        -1
    ).to_list(length=None)

    for index, user in enumerate(users):

        if user.get("user_email") == email:

            return {

                "success": True,

                "rank": index + 1

            }

    return {

        "success": True,

        "rank": "-"

    }


# ==========================================================
# Challenge Statistics
# ==========================================================

@router.get("/challenge-stats/{email}")
async def get_challenge_stats(email: str):

    """
    Real challenge statistics.

    Completed challenges are read from challenge_progress.

    Attempts are read from challenge_submissions.

    XP is NOT used to estimate completed challenges.
    """

    completed = await challenge_progress_collection.count_documents(

        {
            "user_email": email,
            "completed": True
        }

    )

    attempts = await challenge_submission_collection.count_documents(

        {
            "user_email": email
        }

    )

    passed_attempts = await challenge_submission_collection.count_documents(

        {
            "user_email": email,
            "passed": True
        }

    )

    return {

        "success": True,

        "completed": completed,

        "attempts": attempts,

        "passed_attempts": passed_attempts

    }





# ==========================================================
# Dashboard Summary
# ==========================================================

@router.get("/dashboard-summary/{email}")
async def get_dashboard_summary(email: str):

    """
    Lightweight summary for Dashboard.

    All values come from MongoDB.
    """

    user = await users_collection.find_one(
        {
            "email": email
        }
    )

    xp_document = await user_xp_collection.find_one(
        {
            "user_email": email
        }
    )

    xp = 0

    if xp_document:

        xp = int(
            xp_document.get(
                "xp",
                0
            )
        )

    xp_profile = calculate_xp_profile(xp)

    completed_lessons = await lesson_collection.count_documents(
        {
            "user_email": email
        }
    )

    completed_challenges = (
        await challenge_progress_collection.count_documents(
            {
                "user_email": email,
                "completed": True
            }
        )
    )

    username = email.split("@")[0]

    if user:

        username = (
            user.get("username")
            or user.get("name")
            or username
        )

    return {

        "success": True,

        "username": username,

        "email": email,

        "xp": xp,

        "level": xp_profile["level"],

        "rank": xp_profile["rank"],

        "xp_progress":
            xp_profile["progress"],

        "completed_lessons":
            completed_lessons,

        "completed_challenges":
            completed_challenges

    }