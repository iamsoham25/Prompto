from fastapi import APIRouter
from app.config.db import db

print("Dashboard V2 Loaded")

router = APIRouter()

analytics_collection = db["prompt_analytics"]

prompt_collection = db["prompt_submissions"]


@router.get("/analytics/{email}")
async def get_dashboard_analytics(
    email: str
):

    analytics = await analytics_collection.find_one(
        {
            "user_email": email
        }
    )

    if not analytics:

        return {
            "success": False,
            "message": "No analytics found"
        }

    return {

        "success": True,

        "data": {

            "total_prompts":
                analytics.get(
                    "total_prompts",
                    0
                ),

            "average_score":
                analytics.get(
                    "average_score",
                    0
                ),

            "best_score":
                analytics.get(
                    "best_score",
                    0
                ),

            "clarity":
                analytics.get(
                    "clarity_avg",
                    0
                ),

            "context":
                analytics.get(
                    "context_avg",
                    0
                ),

            "constraints":
                analytics.get(
                    "constraints_avg",
                    0
                ),

            "specificity":
                analytics.get(
                    "specificity_avg",
                    0
                )
        }
    }


@router.get("/prompt-mastery/{email}")
async def get_prompt_mastery(
    email: str
):

    analytics = await analytics_collection.find_one(
        {
            "user_email": email
        }
    )

    if not analytics:

        return {
            "success": False
        }

    improvement = round(

        analytics.get(
            "best_score",
            0
        )
        -
        analytics.get(
            "average_score",
            0
        ),

        2
    )

    level = "Beginner"

    avg = analytics.get(
        "average_score",
        0
    )

    if avg >= 8:
        level = "Prompt Engineer"

    elif avg >= 6:
        level = "Advanced"

    elif avg >= 3:
        level = "Intermediate"

    return {

        "success": True,

        "total_prompts":
            analytics.get(
                "total_prompts",
                0
            ),

        "average_clarity":
            analytics.get(
                "clarity_avg",
                0
            ),

        "average_context":
            analytics.get(
                "context_avg",
                0
            ),

        "average_constraints":
            analytics.get(
                "constraints_avg",
                0
            ),

        "average_specificity":
            analytics.get(
                "specificity_avg",
                0
            ),

        "average_overall":
            analytics.get(
                "average_score",
                0
            ),

        "best_score":
            analytics.get(
                "best_score",
                0
            ),

        "improvement":
            improvement,

        "mastery_level":
            level
    }


@router.get("/prompt-trend/{email}")
async def get_prompt_trend(
    email: str
):

    cursor = prompt_collection.find(
        {
            "user_email": email
        }
    ).sort(
        "created_at",
        1
    )

    prompts = await cursor.to_list(length=None)

    for p in prompts:
        print(p)

    print(prompts)

    scores = [
        p.get(
            "score",
            0
        )
        for p in prompts
    ]

    return {

        "success": True,

        "scores": scores
    }