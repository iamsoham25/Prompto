from fastapi import APIRouter
from app.config.db import db

router = APIRouter()

@router.get("/coach/{email}")
async def get_ai_coach(email: str):

    analytics = await db.prompt_analytics.find(
        {"user_email": email}
    ).to_list(length=100)

    if not analytics:

        return {
            "success": True,
            "strength": "Getting Started",
            "weakness": "Need More Practice",
            "recommendation":
            "Complete more prompt exercises."
        }

    latest = analytics[-1]

    scores = {
        "Clarity": latest.get("clarity", 0),
        "Specificity": latest.get("specificity", 0),
        "Context": latest.get("context", 0),
        "Constraints": latest.get("constraints", 0)
    }

    strength = max(
        scores,
        key=scores.get
    )

    weakness = min(
        scores,
        key=scores.get
    )

    recommendations = {
        "Clarity":
        "Practice writing clear objectives.",

        "Specificity":
        "Add more precise requirements.",

        "Context":
        "Provide more background information.",

        "Constraints":
        "Define stricter rules and limits."
    }

    return {

        "success": True,

        "strength": strength,

        "weakness": weakness,

        "recommendation":
        recommendations[weakness]
    }