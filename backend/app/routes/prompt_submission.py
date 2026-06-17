from fastapi import APIRouter
from datetime import datetime

from app.models.prompt_submission import (
    PromptSubmission
)

from app.services.prompt_history_service import (
    save_prompt_submission
)

from app.services.prompt_evaluator import (
    evaluate_prompt
)

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

    await save_prompt_submission(
        submission
    )

    return {

        "success": True,

        "evaluation":
            evaluation
    }