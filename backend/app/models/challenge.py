from pydantic import BaseModel  # type: ignore[import]

class ChallengeModel(BaseModel):

    title: str
    description: str
    difficulty: str
    xp_reward: int