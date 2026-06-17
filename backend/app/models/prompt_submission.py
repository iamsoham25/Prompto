from pydantic import BaseModel
from typing import List
from datetime import datetime

class PromptSubmission(BaseModel):

    user_email: str

    prompt: str

    ai_response: str

    overall_score: float

    clarity_score: float

    context_score: float

    constraints_score: float

    specificity_score: float

    weaknesses: List[str]

    suggestions: List[str]

    created_at: datetime