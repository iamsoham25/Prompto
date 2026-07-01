from fastapi import APIRouter

from app.services.prompt_evaluator import evaluate_prompt

from app.services.prompt_history_service import save_prompt_history

router = APIRouter()


@router.post("/evaluate-prompt")
async def evaluate_prompt_api(data: dict):

    prompt = data.get("prompt", "")

    user_email = data.get("user_email", "")

    evaluation = evaluate_prompt(prompt)

    # Save prompt history if user email is available
    if user_email:

        await save_prompt_history(
            user_email=user_email,
            prompt=prompt,
            evaluation=evaluation
        )

    return {
        "success": True,
        "evaluation": evaluation
    }