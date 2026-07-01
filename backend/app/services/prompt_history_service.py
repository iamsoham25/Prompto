from bson import ObjectId
from app.config.db import db
from app.models.prompt_history import PromptHistory

collection = db["prompt_submissions"]


# -----------------------------
# Save Prompt History (Day 23)
# -----------------------------
async def save_prompt_history(
    user_email: str,
    prompt: str,
    evaluation: dict
):

    document = PromptHistory.create_document(
        user_email=user_email,
        prompt=prompt,
        evaluation=evaluation
    )

    await collection.insert_one(document)


# -----------------------------
# Existing Prompt Submission
# -----------------------------
async def save_prompt_submission(
    submission: dict
):

    await collection.insert_one(submission)


# -----------------------------
# Get Prompt History
# -----------------------------
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


# -----------------------------
# Delete History
# -----------------------------
async def delete_prompt_history(
    history_id: str
):

    await collection.delete_one(
        {
            "_id": ObjectId(history_id)
        }
    )

    return True