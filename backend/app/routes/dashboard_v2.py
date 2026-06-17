from fastapi import APIRouter
from app.config.db import db

print("Dashboard V2 Loaded")

router = APIRouter()

analytics_collection = db["prompt_analytics"]


@router.get("/analytics/{email}")
async def get_dashboard_analytics(
    email: str
):

    analytics = await analytics_collection.find_one(
        {
            "user_email": email
        }
    )

    if not analytics:

        return {
            "success": False,
            "message": "No analytics found"
        }

    return {

        "success": True,

        "data": {

            "total_prompts":
                analytics.get(
                    "total_prompts",
                    0
                ),

            "average_score":
                analytics.get(
                    "average_score",
                    0
                ),

            "best_score":
                analytics.get(
                    "best_score",
                    0
                ),

            "clarity":
                analytics.get(
                    "clarity_avg",
                    0
                ),

            "context":
                analytics.get(
                    "context_avg",
                    0
                ),

            "constraints":
                analytics.get(
                    "constraints_avg",
                    0
                ),

            "specificity":
                analytics.get(
                    "specificity_avg",
                    0
                )
        }
    }