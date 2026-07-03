from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.prompt_improver import improve_prompt


router = APIRouter(
    tags=["AI Prompt Improver"]
)


# =========================================================
# REQUEST MODEL
# =========================================================

class PromptRequest(BaseModel):

    prompt: str = Field(
        ...,
        min_length=2,
        max_length=5000
    )


# =========================================================
# IMPROVE PROMPT ENDPOINT
# =========================================================

@router.post("/improve-prompt")
async def improve_prompt_api(data: PromptRequest):

    try:

        result = improve_prompt(
            data.prompt
        )


        return {
            "success": True,
            **result
        }


    except ValueError as error:

        raise HTTPException(
            status_code=422,
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