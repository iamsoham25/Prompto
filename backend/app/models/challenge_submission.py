from pydantic import BaseModel
from typing import Dict
from datetime import datetime


class ChallengeSubmission(BaseModel):
    user_email: str
    track: str
    challenge_id: int
    challenge_title: str

    prompt: str
    ai_response: str

    evaluation: Dict

    score: int
    xp: int
    passed: bool

    submitted_at: datetime = datetime.utcnow()