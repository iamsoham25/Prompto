import os

from dotenv import load_dotenv
from openai import OpenAI


# Load environment variables from .env
load_dotenv()


# Read OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


# Validate API key
if not OPENROUTER_API_KEY:
    raise ValueError(
        "OPENROUTER_API_KEY is missing. "
        "Please add it to your backend .env file."
    )


# Shared OpenRouter client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)