from fastapi import APIRouter
from datetime import datetime

from app.services.prompt_evaluator import evaluate_prompt
from app.services.prompt_history_service import (
    save_prompt_history,
    save_prompt_submission
)
from app.services.analytics_service import (
    update_user_analytics
)

router = APIRouter()


@router.post("/evaluate-prompt")
async def evaluate_prompt_api(data: dict):

    prompt = data.get("prompt", "")

    user_email = data.get("user_email", "")

    evaluation = evaluate_prompt(prompt)

    if user_email:

        # ----------------------------
        # Save Prompt History
        # ----------------------------

        await save_prompt_history(

            user_email=user_email,

            prompt=prompt,

            evaluation=evaluation

        )

        # ----------------------------
        # Save Prompt Submission
        # ----------------------------

        submission = {

            "user_email": user_email,

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

        # ----------------------------
        # Update Analytics
        # ----------------------------

        await update_user_analytics(user_email)

    return {

        "success": True,

        "evaluation": evaluation

    }