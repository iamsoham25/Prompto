from bson import ObjectId
from datetime import datetime

from app.config.db import db

collection = db["prompt_submissions"]


# --------------------------------
# Save Prompt Submission
# --------------------------------
async def save_prompt_submission(
    submission: dict
):
    await collection.insert_one(submission)


# --------------------------------
# Save Prompt History
# --------------------------------
async def save_prompt_history(
    user_email: str,
    prompt: str,
    evaluation: dict
):
    document = {
        "user_email": user_email,
        "prompt": prompt,
        "ai_response": "",

        "overall_score": evaluation.get(
            "overall_score", 0
        ),

        "clarity_score": evaluation.get(
            "clarity", 0
        ),

        "context_score": evaluation.get(
            "context", 0
        ),

        "constraints_score": evaluation.get(
            "constraints", 0
        ),

        "specificity_score": evaluation.get(
            "specificity", 0
        ),

        "role_definition_score": evaluation.get(
            "role", 0
        ),

        "output_format_score": evaluation.get(
            "output_format", 0
        ),

        "examples_score": evaluation.get(
            "examples", 0
        ),

        "strengths": evaluation.get(
            "strengths", []
        ),

        "weaknesses": evaluation.get(
            "improvements", []
        ),

        "created_at": datetime.utcnow()
    }

    await collection.insert_one(document)


# --------------------------------
# Get Prompt History
# --------------------------------
async def get_prompt_history(
    user_email: str
):
    history = []

    async for item in collection.find(
        {
            "user_email": user_email
        }
    ).sort(
        "created_at",
        -1
    ):

        item["_id"] = str(item["_id"])

        history.append(item)

    return history


# --------------------------------
# Delete History
# --------------------------------
async def delete_prompt_history(
    history_id: str
):

    await collection.delete_one(
        {
            "_id": ObjectId(history_id)
        }
    )

    return True