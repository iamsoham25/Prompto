from fastapi import APIRouter

from datetime import datetime
from app.config.db import db

analytics_collection = db["prompt_analytics"]

from app.services.prompt_evaluator import (
    evaluate_prompt
)

from app.services.prompt_improver import (
    improve_prompt
)

from app.services.prompt_feedback import (
    generate_feedback
)

router = APIRouter()

@router.post("/prompt-coach")
async def prompt_coach_api(
    data: dict
):

    prompt = data.get(
        "prompt",
        ""
    )

    evaluation = evaluate_prompt(
        prompt
    )

    improvement = improve_prompt(
        prompt
    )

    feedback = generate_feedback(
        prompt
    )

    await analytics_collection.insert_one({

        "user_email":
            data.get("user_email"),

        "clarity":
            evaluation["clarity"],

        "specificity":
            evaluation["specificity"],

        "context":
            evaluation["context"],

        "constraints":
            evaluation["constraints"],

        "overall":
            evaluation["overall"],

        "created_at":
            datetime.utcnow()

    })

    return {

        "success": True,

        "evaluation":
            evaluation,

        "feedback":
            feedback["feedback"],

        "suggestions":
            feedback["suggestions"],

        "improved_prompt":
            improvement["improved_prompt"]

    }


@router.get("/prompt-mastery/{email}")
async def get_prompt_mastery(
    email: str
):

    records = []

    async for item in analytics_collection.find(
        {
            "user_email": email
        }
    ):
        records.append(item)

    if len(records) == 0:

        return {
            "success": False,
            "message": "No analytics found"
        }

    avg_clarity = sum(
        r["clarity"]
        for r in records
    ) / len(records)

    avg_specificity = sum(
        r["specificity"]
        for r in records
    ) / len(records)

    avg_context = sum(
        r["context"]
        for r in records
    ) / len(records)

    avg_constraints = sum(
        r["constraints"]
        for r in records
    ) / len(records)

    avg_overall = sum(
        r["overall"]
        for r in records
    ) / len(records)

    # Best Score

    best_score = max(
        r["overall"]
        for r in records
    )

    # Improvement

    first_score = records[0]["overall"]

    last_score = records[-1]["overall"]

    improvement = (
        last_score - first_score
    )

    # Mastery Level

    if avg_overall < 2:
        level = "Beginner"

    elif avg_overall < 4:
        level = "Intermediate"

    elif avg_overall < 6:
        level = "Advanced"

    elif avg_overall < 8:
        level = "Expert"

    else:
        level = "Prompt Master"

    return {

    "success": True,

    "total_prompts":
        len(records),

    "average_clarity":
        round(avg_clarity, 2),

    "average_specificity":
        round(avg_specificity, 2),

    "average_context":
        round(avg_context, 2),

    "average_constraints":
        round(avg_constraints, 2),

    "average_overall":
        round(avg_overall, 2),

    "best_score":
        round(best_score, 2),

    "improvement":
        round(improvement, 2),

    "mastery_level":
        level

}

@router.get("/prompt-trend/{email}")
async def get_prompt_trend(
    email: str
):

    scores = []

    async for item in analytics_collection.find(
        {
            "user_email": email
        }
    ).sort("created_at", 1):

        scores.append(
            item["overall"]
        )

    return {

        "success": True,

        "scores": scores

    }