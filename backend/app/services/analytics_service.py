from app.config.db import db

analytics_collection = db[
    "prompt_analytics"
]

prompt_collection = db[
    "prompt_submissions"
]


async def update_user_analytics(
    user_email: str
):

    cursor = prompt_collection.find(
        {
            "user_email": user_email
        }
    )

    prompts = await cursor.to_list(
        length=None
    )

    if not prompts:
        return

    total_prompts = len(
        prompts
    )

    overall_scores = [
        p.get(
            "overall_score",
            0
        )
        for p in prompts
    ]

    clarity_scores = [
        p.get(
            "clarity_score",
            0
        )
        for p in prompts
    ]

    context_scores = [
        p.get(
            "context_score",
            0
        )
        for p in prompts
    ]

    constraints_scores = [
        p.get(
            "constraints_score",
            0
        )
        for p in prompts
    ]

    specificity_scores = [
        p.get(
            "specificity_score",
            0
        )
        for p in prompts
    ]

    average_score = round(
        sum(overall_scores)
        / total_prompts,
        2
    )

    best_score = max(
        overall_scores
    )

    clarity_avg = round(
        sum(clarity_scores)
        / total_prompts,
        2
    )

    context_avg = round(
        sum(context_scores)
        / total_prompts,
        2
    )

    constraints_avg = round(
        sum(constraints_scores)
        / total_prompts,
        2
    )

    specificity_avg = round(
        sum(specificity_scores)
        / total_prompts,
        2
    )

    await analytics_collection.update_one(

        {
            "user_email": user_email
        },

        {
            "$set": {

                "user_email": user_email,

                "total_prompts": total_prompts,

                "average_score": average_score,

                "best_score": best_score,

                "clarity_avg": clarity_avg,

                "context_avg": context_avg,

                "constraints_avg": constraints_avg,

                "specificity_avg": specificity_avg

            }
        },

        upsert=True

    )