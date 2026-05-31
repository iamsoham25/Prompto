from pydantic import BaseModel

class ChallengeModel(BaseModel):

    title: str
    description: str
    difficulty: str
    xp_reward: int