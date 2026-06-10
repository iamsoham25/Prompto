from fastapi import APIRouter

from app.services.prompt_evaluator import (
    evaluate_prompt
)

from app.services.prompt_improver import (
    improve_prompt
)

from app.services.prompt_feedback import (
    generate_feedback
)

router = APIRouter()

@router.post("/prompt-coach")
async def prompt_coach_api(
    data: dict
):

    prompt = data.get(
        "prompt",
        ""
    )

    evaluation = evaluate_prompt(
        prompt
    )

    improvement = improve_prompt(
        prompt
    )

    feedback = generate_feedback(
        prompt
    )

    return {

        "success": True,

        "evaluation": evaluation,

        "feedback": feedback[
            "feedback"
        ],

        "suggestions": feedback[
            "suggestions"
        ],

        "improved_prompt":
        improvement[
            "improved_prompt"
        ]
    }