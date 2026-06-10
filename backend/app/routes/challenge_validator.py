from fastapi import APIRouter

from app.services.challenge_validator import (
    validate_challenge
)

router = APIRouter()


@router.post("/validate-challenge")
async def validate_challenge_api(
    data: dict
):

    result = validate_challenge(
        data.get(
            "challenge_type",
            ""
        ),
        data.get(
            "prompt",
            ""
        )
    )

    return {
        "success": True,
        **result
    }