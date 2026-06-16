from app.config.db import db

collection = db["prompt_submissions"]

async def save_prompt_submission(data):

    return await collection.insert_one(data)