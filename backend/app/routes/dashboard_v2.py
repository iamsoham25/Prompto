from fastapi import APIRouter
from app.config.db import db


print("🔥 Dashboard V2 Loaded")


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
# Dashboard Analytics
# ==========================================================

@router.get("/analytics/{email}")
async def get_dashboard_analytics(email: str):

    analytics = await analytics_collection.find_one(
        {
            "user_email": email
        }
    )

    # ======================================================
    # NO ANALYTICS YET
    # ======================================================

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

            "distribution": {
                "excellent": 0,
                "good": 0,
                "average": 0,
                "poor": 0
            },

            "trend": [],

            "insights": {
                "strongest": "-",
                "weakest": "-",
                "recommendation":
                    "Analyze your first prompt to receive personalized recommendations."
            },

            "mastery_level": "Beginner",

            "improvement": 0
        }


    # ======================================================
    # BASIC ANALYTICS
    # ======================================================

    average_score = float(
        analytics.get(
            "average_score",
            0
        )
    )

    best_score = float(
        analytics.get(
            "best_score",
            0
        )
    )

    lowest_score = float(
        analytics.get(
            "lowest_score",
            0
        )
    )

    total_prompts = int(
        analytics.get(
            "total_prompts",
            0
        )
    )


    # ======================================================
    # MASTERY
    # ======================================================

    mastery_level = calculate_mastery_level(
        average_score
    )


    # ======================================================
    # SKILLS
    # ======================================================

    skills = [

        (
            "Clarity",
            float(
                analytics.get(
                    "clarity_avg",
                    0
                )
            )
        ),

        (
            "Specificity",
            float(
                analytics.get(
                    "specificity_avg",
                    0
                )
            )
        ),

        (
            "Context",
            float(
                analytics.get(
                    "context_avg",
                    0
                )
            )
        ),

        (
            "Constraints",
            float(
                analytics.get(
                    "constraints_avg",
                    0
                )
            )
        ),

        (
            "Role",
            float(
                analytics.get(
                    "role_avg",
                    0
                )
            )
        ),

        (
            "Output Format",
            float(
                analytics.get(
                    "output_avg",
                    0
                )
            )
        ),

        (
            "Examples",
            float(
                analytics.get(
                    "examples_avg",
                    0
                )
            )
        )

    ]


    # ======================================================
    # RADAR DATA
    # ======================================================

    radar = [

        {
            "skill": name,
            "score": score
        }

        for name, score in skills

    ]


    # ======================================================
    # BAR DATA
    # ======================================================

    bar_chart = [

        {
            "skill": name,
            "score": score
        }

        for name, score in skills

    ]


    # ======================================================
    # PROMPT TREND
    # ======================================================

    prompts = await prompt_collection.find(
        {
            "user_email": email
        }
    ).sort(
        "created_at",
        1
    ).to_list(
        length=None
    )


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


    # ======================================================
    # DISTRIBUTION
    # ======================================================

    distribution = analytics.get(

        "distribution",

        {
            "excellent": 0,
            "good": 0,
            "average": 0,
            "poor": 0
        }

    )


    # ======================================================
    # INSIGHTS
    # ======================================================

    strongest_skill = analytics.get(
        "strongest_skill",
        "-"
    )

    weakest_skill = analytics.get(
        "weakest_skill",
        "-"
    )

    recommendation = analytics.get(

        "recommendation",

        "Keep practicing Prompt Engineering."

    )


    # ======================================================
    # IMPROVEMENT
    # ======================================================

    improvement = float(

        analytics.get(
            "improvement",
            0
        )

    )


    # ======================================================
    # RESPONSE
    # ======================================================

    return {

        "success": True,

        "cards": {

            "total_prompts":
                total_prompts,

            "average_score":
                average_score,

            "best_score":
                best_score,

            "lowest_score":
                lowest_score

        },

        "radar":
            radar,

        "bar_chart":
            bar_chart,

        "distribution":
            distribution,

        "trend":
            trend,

        "insights": {

            "strongest":
                strongest_skill,

            "weakest":
                weakest_skill,

            "recommendation":
                recommendation

        },

        "mastery_level":
            mastery_level,

        "improvement":
            improvement

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

    ).to_list(
        length=None
    )


    trend = []


    for index, prompt in enumerate(prompts):

        trend.append(

            {

                "prompt":
                    index + 1,

                "score":
                    float(
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

        "trend":
            trend

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