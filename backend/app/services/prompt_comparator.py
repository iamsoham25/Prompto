from app.services.prompt_evaluator import evaluate_prompt


def compare_prompts(
    prompt_a: str,
    prompt_b: str
):

    result_a = evaluate_prompt(prompt_a)

    result_b = evaluate_prompt(prompt_b)

    score_a = result_a["overall_score"]
    score_b = result_b["overall_score"]

    if score_a > score_b:

        winner = "Prompt A"
        winning_prompt = prompt_a
        score_difference = round(score_a - score_b, 1)

    elif score_b > score_a:

        winner = "Prompt B"
        winning_prompt = prompt_b
        score_difference = round(score_b - score_a, 1)

    else:

        winner = "Tie"
        winning_prompt = None
        score_difference = 0

    comparison = []

    categories = [

        ("clarity", "Clarity"),
        ("specificity", "Specificity"),
        ("context", "Context"),
        ("constraints", "Constraints"),
        ("role", "Role"),
        ("output_format", "Output Format"),
        ("examples", "Examples")

    ]

    for key, label in categories:

        comparison.append({

            "category": label,

            "prompt_a": result_a[key],

            "prompt_b": result_b[key]

        })

    reasons = []

    for key, label in categories:

        if result_a[key] > result_b[key]:

            reasons.append(
                f"Prompt A has better {label}."
            )

        elif result_b[key] > result_a[key]:

            reasons.append(
                f"Prompt B has better {label}."
            )

    suggestions = []

    if winner == "Prompt A":

        suggestions = result_b["improvements"]

    elif winner == "Prompt B":

        suggestions = result_a["improvements"]

    return {

        "winner": winner,

        "winning_prompt": winning_prompt,

        "score_difference": score_difference,

        "prompt_a_score": score_a,

        "prompt_b_score": score_b,

        "prompt_a_analysis": result_a,

        "prompt_b_analysis": result_b,

        "comparison": comparison,

        "reasons": reasons,

        "suggestions": suggestions

    }