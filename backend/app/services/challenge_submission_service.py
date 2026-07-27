from app.config.db import db

challenge_submission_collection = db["challenge_submissions"]


async def save_challenge_submission(data: dict):

    await challenge_submission_collection.insert_one(data)