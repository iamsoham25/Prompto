from fastapi import APIRouter
from datetime import datetime

from app.models.prompt_submission import ( PromptSubmission)

from app.services.prompt_history_service import ( save_prompt_submission)

from app.services.prompt_evaluator import ( evaluate_prompt)

from app.services.analytics_service import ( update_user_analytics)

router = APIRouter()


@router.post("/prompt/submit")
async def submit_prompt(
    data: dict
):

    prompt = data.get(
        "prompt",
        ""
    )

    email = data.get(
        "user_email",
        ""
    )

    evaluation = evaluate_prompt(
        prompt
    )

    submission = {

        "user_email": email,

        "prompt": prompt,

        "ai_response": "",

        "overall_score": evaluation["overall_score"],

        "clarity_score": evaluation["clarity"],
    
        "context_score": evaluation["context"],

        "constraints_score": evaluation["constraints"],

        "specificity_score": evaluation["specificity"],

        "role_definition_score": evaluation["role"],

        "output_format_score": evaluation["output_format"],

        "examples_score": evaluation["examples"],

        "strengths": evaluation["strengths"],

        "weaknesses": evaluation["improvements"],

        "created_at": datetime.utcnow()
    }

    await save_prompt_submission(submission)

    await update_user_analytics(email)

    from app.config.db import db

    streak_collection = db[
        "user_learning_streak"
    ]

    return {

        "success": True,

        "evaluation":
            evaluation
    }