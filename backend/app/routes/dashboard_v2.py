from fastapi import APIRouter

from app.config.db import db


print("Dashboard V2 Loaded")


router = APIRouter()


# ==========================================================
# MongoDB Collections
# ==========================================================

analytics_collection = db["prompt_analytics"]

prompt_collection = db["prompt_submissions"]


# ==========================================================
# Helper
# ==========================================================

def calculate_mastery_level(average_score: float):

    if average_score >= 90:

        return "Master"

    elif average_score >= 80:

        return "Advanced"

    elif average_score >= 60:

        return "Intermediate"

    return "Beginner"


# ==========================================================
# Dashboard Prompt Analytics
# ==========================================================

@router.get("/analytics/{email}")
async def get_dashboard_analytics(email: str):

    analytics = await analytics_collection.find_one(
        {
            "user_email": email
        }
    )

    if not analytics:

        return {

            "success": True,

            "cards": {

                "total_prompts": 0,

                "average_score": 0,

                "best_score": 0,

                "lowest_score": 0

            },

            "radar": [],

            "bar_chart": [],

            "distribution": {},

            "insights": {

                "strongest": "-",

                "weakest": "-",

                "recommendation":
                    "Analyze prompts to receive personalized recommendations."

            },

            "mastery_level": "Beginner",

            "improvement": 0

        }

    average_score = float(
        analytics.get(
            "average_score",
            0
        )
    )

    mastery_level = calculate_mastery_level(
        average_score
    )

    skills = [

        (
            "Clarity",
            analytics.get(
                "clarity_avg",
                0
            )
        ),

        (
            "Specificity",
            analytics.get(
                "specificity_avg",
                0
            )
        ),

        (
            "Context",
            analytics.get(
                "context_avg",
                0
            )
        ),

        (
            "Constraints",
            analytics.get(
                "constraints_avg",
                0
            )
        ),

        (
            "Role",
            analytics.get(
                "role_avg",
                0
            )
        ),

        (
            "Output",
            analytics.get(
                "output_avg",
                0
            )
        ),

        (
            "Examples",
            analytics.get(
                "examples_avg",
                0
            )
        )

    ]

    radar = [

        {
            "skill": name,
            "score": score
        }

        for name, score in skills

    ]

    bar_chart = [

        {
            "name": name,
            "value": score
        }

        for name, score in skills

    ]

    return {

        "success": True,

        # ==================================================
        # KPI Cards
        # ==================================================

        "cards": {

            "total_prompts":
                analytics.get(
                    "total_prompts",
                    0
                ),

            "average_score":
                average_score,

            "best_score":
                analytics.get(
                    "best_score",
                    0
                ),

            "lowest_score":
                analytics.get(
                    "lowest_score",
                    0
                )

        },

        # ==================================================
        # Charts
        # ==================================================

        "radar": radar,

        "bar_chart": bar_chart,

        "distribution":
            analytics.get(
                "distribution",
                {}
            ),

        # ==================================================
        # AI Insights
        # ==================================================

        "insights": {

            "strongest":
                analytics.get(
                    "strongest_skill",
                    "-"
                ),

            "weakest":
                analytics.get(
                    "weakest_skill",
                    "-"
                ),

            "recommendation":
                analytics.get(
                    "recommendation",
                    "Keep practicing Prompt Engineering."
                )

        },

        # ==================================================
        # Mastery
        # ==================================================

        "mastery_level":
            mastery_level,

        "improvement":
            analytics.get(
                "improvement",
                0
            )

    }


# ==========================================================
# Prompt Trend
# ==========================================================

@router.get("/prompt-trend/{email}")
async def get_prompt_trend(email: str):

    prompts = await prompt_collection.find(

        {
            "user_email": email
        }

    ).sort(

        "created_at",
        1

    ).to_list(length=None)

    trend = []

    for index, prompt in enumerate(prompts):

        trend.append(

            {

                "prompt": index + 1,

                "score": float(
                    prompt.get(
                        "overall_score",
                        0
                    )
                ),

                "created_at":
                    prompt.get(
                        "created_at"
                    )

            }

        )

    return {

        "success": True,

        "trend": trend

    }


# ==========================================================
# Prompt Mastery
# ==========================================================

@router.get("/prompt-mastery/{email}")
async def get_prompt_mastery(email: str):

    analytics = await analytics_collection.find_one(

        {
            "user_email": email
        }

    )

    if not analytics:

        return {

            "success": True,

            "mastery_level":
                "Beginner",

            "average_score":
                0,

            "best_score":
                0,

            "improvement":
                0

        }

    average = float(
        analytics.get(
            "average_score",
            0
        )
    )

    best = float(
        analytics.get(
            "best_score",
            0
        )
    )

    stored_improvement = analytics.get(
        "improvement"
    )

    if stored_improvement is not None:

        improvement = float(
            stored_improvement
        )

    else:

        improvement = round(
            best - average,
            2
        )

    level = calculate_mastery_level(
        average
    )

    return {

        "success": True,

        "mastery_level":
            level,

        "average_score":
            average,

        "best_score":
            best,

        "improvement":
            improvement

    }