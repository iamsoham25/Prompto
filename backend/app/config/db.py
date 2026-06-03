from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGO_URL)

db = client[DATABASE_NAME]

# Collections
users_collection = db["users"]
lessons_collection = db["lessons"]
lesson_completion_collection = db["lesson_completions"]
user_xp_collection = db["user_xp"]
challenge_completion_collection = db["challenge_completions"]