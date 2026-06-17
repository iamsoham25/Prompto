from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

from app.config.db import db

from app.services.prompt_evaluator import (
    evaluate_prompt
)

from app.services.analytics_service import (
    update_user_analytics
)

router = APIRouter()

prompt_collection = db[
    "prompt_submissions"
]


class PromptRequest(BaseModel):
    user_email: str
    prompt: str


@router.post("/submit")
async def submit_prompt(
    data: PromptRequest
):

    evaluation = evaluate_prompt(
        data.prompt
    )

    document = {

        "user_email": data.user_email,

        "prompt": data.prompt,

        "overall_score":
            evaluation["overall"],

        "clarity_score":
            evaluation["clarity"],

        "context_score":
            evaluation["context"],

        "constraints_score":
            evaluation["constraints"],

        "specificity_score":
            evaluation["specificity"],

        "weaknesses":
            evaluation["weaknesses"],

        "suggestions":
            evaluation["strengths"],

        "created_at":
            datetime.utcnow()

    }

    await prompt_collection.insert_one(
        document
    )

    await update_user_analytics(
        data.user_email
    )

    return {

        "success": True,

        "evaluation": evaluation

    }