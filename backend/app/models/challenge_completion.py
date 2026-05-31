from pydantic import BaseModel

class ChallengeCompletionModel(BaseModel):
    user_email: str
    challenge_id: int
    xp_earned: int