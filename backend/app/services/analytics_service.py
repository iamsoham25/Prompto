from app.config.db import db

analytics_collection = db["prompt_analytics"]
prompt_collection = db["prompt_submissions"]


async def update_user_analytics(user_email: str):

    prompts = await prompt_collection.find(
        {
            "user_email": user_email
        }
    ).to_list(length=None)

    if not prompts:
        return

    total_prompts = len(prompts)

    # ----------------------------
    # Collect Scores
    # ----------------------------

    overall_scores = [
        p.get("overall_score", 0)
        for p in prompts
    ]

    clarity_scores = [
        p.get("clarity_score", 0)
        for p in prompts
    ]

    context_scores = [
        p.get("context_score", 0)
        for p in prompts
    ]

    constraints_scores = [
        p.get("constraints_score", 0)
        for p in prompts
    ]

    specificity_scores = [
        p.get("specificity_score", 0)
        for p in prompts
    ]

    role_scores = [
        p.get("role_definition_score", 0)
        for p in prompts
    ]

    output_scores = [
        p.get("output_format_score", 0)
        for p in prompts
    ]

    example_scores = [
        p.get("examples_score", 0)
        for p in prompts
    ]

    # ----------------------------
    # Statistics
    # ----------------------------

    average_score = round(
        sum(overall_scores) / total_prompts,
        2
    )

    best_score = max(overall_scores)

    lowest_score = min(overall_scores)

    clarity_avg = round(
        sum(clarity_scores) / total_prompts,
        2
    )

    context_avg = round(
        sum(context_scores) / total_prompts,
        2
    )

    constraints_avg = round(
        sum(constraints_scores) / total_prompts,
        2
    )

    specificity_avg = round(
        sum(specificity_scores) / total_prompts,
        2
    )

    role_avg = round(
        sum(role_scores) / total_prompts,
        2
    )

    output_avg = round(
        sum(output_scores) / total_prompts,
        2
    )

    examples_avg = round(
        sum(example_scores) / total_prompts,
        2
    )

    # ----------------------------
    # Score Distribution
    # ----------------------------

    excellent = len(
        [s for s in overall_scores if s >= 85]
    )

    good = len(
        [s for s in overall_scores if 70 <= s < 85]
    )

    average = len(
        [s for s in overall_scores if 50 <= s < 70]
    )

    poor = len(
        [s for s in overall_scores if s < 50]
    )

    # ----------------------------
    # Strongest Skill
    # ----------------------------

    skill_map = {

        "Clarity": clarity_avg,

        "Specificity": specificity_avg,

        "Context": context_avg,

        "Constraints": constraints_avg,

        "Role": role_avg,

        "Output": output_avg,

        "Examples": examples_avg

    }

    strongest_skill = max(
        skill_map,
        key=skill_map.get
    )

    weakest_skill = min(
        skill_map,
        key=skill_map.get
    )

    # ----------------------------
    # Save Analytics
    # ----------------------------

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

                "lowest_score": lowest_score,

                "clarity_avg": clarity_avg,

                "context_avg": context_avg,

                "constraints_avg": constraints_avg,

                "specificity_avg": specificity_avg,

                "role_avg": role_avg,

                "output_avg": output_avg,

                "examples_avg": examples_avg,

                "distribution": {

                    "excellent": excellent,

                    "good": good,

                    "average": average,

                    "poor": poor

                },

                "strongest_skill": strongest_skill,

                "weakest_skill": weakest_skill

            }

        },

        upsert=True

    )