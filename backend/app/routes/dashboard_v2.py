from fastapi import APIRouter
from app.config.db import db

print("Dashboard V2 Loaded")

router = APIRouter()

analytics_collection = db["prompt_analytics"]
prompt_collection = db["prompt_submissions"]


# ==========================================================
# Dashboard Analytics
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
            "success": False,
            "message": "No analytics found"
        }

    return {

        "success": True,

        # ----------------------------
        # KPI Cards
        # ----------------------------

        "cards": {

            "total_prompts":
                analytics.get("total_prompts", 0),

            "average_score":
                analytics.get("average_score", 0),

            "best_score":
                analytics.get("best_score", 0),

            "lowest_score":
                analytics.get("lowest_score", 0)

        },

        # ----------------------------
        # Radar Chart
        # ----------------------------

        "radar": [

            {
                "skill": "Clarity",
                "score": analytics.get("clarity_avg", 0)
            },

            {
                "skill": "Specificity",
                "score": analytics.get("specificity_avg", 0)
            },

            {
                "skill": "Context",
                "score": analytics.get("context_avg", 0)
            },

            {
                "skill": "Constraints",
                "score": analytics.get("constraints_avg", 0)
            },

            {
                "skill": "Role",
                "score": analytics.get("role_avg", 0)
            },

            {
                "skill": "Output",
                "score": analytics.get("output_avg", 0)
            },

            {
                "skill": "Examples",
                "score": analytics.get("examples_avg", 0)
            }

        ],

        # ----------------------------
        # Bar Chart
        # ----------------------------

        "bar_chart": [

            {
                "name": "Clarity",
                "value": analytics.get("clarity_avg", 0)
            },

            {
                "name": "Specificity",
                "value": analytics.get("specificity_avg", 0)
            },

            {
                "name": "Context",
                "value": analytics.get("context_avg", 0)
            },

            {
                "name": "Constraints",
                "value": analytics.get("constraints_avg", 0)
            },

            {
                "name": "Role",
                "value": analytics.get("role_avg", 0)
            },

            {
                "name": "Output",
                "value": analytics.get("output_avg", 0)
            },

            {
                "name": "Examples",
                "value": analytics.get("examples_avg", 0)
            }

        ],

        # ----------------------------
        # Distribution
        # ----------------------------

        "distribution":
            analytics.get(
                "distribution",
                {}
            ),

        # ----------------------------
        # AI Insights
        # ----------------------------

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

        # ----------------------------
        # Prompt Mastery
        # ----------------------------

        "mastery_level":
            analytics.get(
                "mastery_level",
                "Beginner"
            ),

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

                "score":
                    prompt.get(
                        "overall_score",
                        0
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

            "success": False

        }

    average = analytics.get(
        "average_score",
        0
    )

    best = analytics.get(
        "best_score",
        0
    )

    improvement = round(
        best - average,
        2
    )

    if average >= 90:

        level = "Master"

    elif average >= 80:

        level = "Advanced"

    elif average >= 60:

        level = "Intermediate"

    else:

        level = "Beginner"

    return {

        "success": True,

        "mastery_level": level,

        "average_score": average,

        "best_score": best,

        "improvement": improvement

    }