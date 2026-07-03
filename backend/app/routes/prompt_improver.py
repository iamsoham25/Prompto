from fastapi import APIRouter
from fastapi import HTTPException

from pydantic import BaseModel
from pydantic import Field

from app.services.prompt_improver import improve_prompt


router = APIRouter(
    tags=["AI Prompt Improver"]
)


class PromptRequest(BaseModel):

    prompt: str = Field(
        ...,
        min_length=2,
        description="Prompt that should be analyzed and improved"
    )


@router.post("/improve-prompt")
async def improve_prompt_api(
    data: PromptRequest
):

    try:

        result = improve_prompt(
            data.prompt
        )


        return {
            "success": True,

            "original_prompt":
                result["original_prompt"],

            "improved_prompt":
                result["improved_prompt"],

            "improvement_score":
                result["improvement_score"],

            "changes":
                result["changes"],

            "strengths":
                result["strengths"],

            "weaknesses":
                result["weaknesses"]
        }


    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Improve Prompt Route Error:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to improve prompt."
        )