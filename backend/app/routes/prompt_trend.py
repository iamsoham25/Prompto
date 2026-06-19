from fastapi import APIRouter
from app.config.db import db

router = APIRouter(tags=["Prompt Trend"])

@router.get("/prompt-trend/{email}")
async def get_prompt_trend(email: str):

    prompts = await db.prompt_submissions.find(
        {"user_email": email}
    ).sort(
        "created_at",
        1
    ).to_list(length=100)

    trend = []

    for index, item in enumerate(prompts):

        trend.append({
            "prompt": str(index + 1),
            "score": item.get("overall_score", 0)
        })

    return {
        "success": True,
        "trend": trend
    }