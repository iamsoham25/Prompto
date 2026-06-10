from fastapi import APIRouter

from app.services.prompt_evaluator import (
    evaluate_prompt
)

from app.services.prompt_recommender import (
    recommend_lesson
)

router = APIRouter()


@router.post("/recommend-lessons")
async def recommend_lessons_api(
    data: dict
):

    prompt = data.get(
        "prompt",
        ""
    )

    evaluation = evaluate_prompt(
        prompt
    )

    recommendations = recommend_lesson(
        evaluation
    )

    return {

        "success": True,

        "evaluation": evaluation,

        "recommendations":
        recommendations
    }