from fastapi import APIRouter

from app.services.challenge_evaluator import (
    evaluate_challenge_prompt
)

router = APIRouter()

@router.post("/evaluate-challenge")
async def evaluate_challenge(
    data: dict
):

    result = evaluate_challenge_prompt(

        data["prompt"],

        data["target_score"]

    )

    return {

        "success": True,

        "result": result

    }