from app.config.db import db

prompt_submission_collection = db[
    "prompt_submissions"
]


async def save_prompt_submission(
    data: dict
):

    await prompt_submission_collection.insert_one(
        data
    )

    return True