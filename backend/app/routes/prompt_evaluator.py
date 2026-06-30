from fastapi import APIRouter

from app.services.prompt_evaluator import evaluate_prompt

router = APIRouter()


@router.post("/evaluate-prompt")
async def evaluate_prompt_api(data: dict):

    prompt = data.get("prompt", "")

    result = evaluate_prompt(prompt)

    return {
        "success": True,
        "evaluation": result
    }