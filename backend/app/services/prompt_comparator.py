from app.services.prompt_evaluator import (
    evaluate_prompt
)

def compare_prompts(
    prompt_a: str,
    prompt_b: str
):

    result_a = evaluate_prompt(
        prompt_a
    )

    result_b = evaluate_prompt(
        prompt_b
    )

    score_a = result_a["overall"]

    score_b = result_b["overall"]

    if score_a > score_b:

        winner = "Prompt A"

        winning_prompt = prompt_a

    elif score_b > score_a:

        winner = "Prompt B"

        winning_prompt = prompt_b

    else:

        winner = "Tie"

        winning_prompt = None

    reasons = []

    categories = [
        "clarity",
        "specificity",
        "context",
        "constraints",
        "role_definition",
        "output_format",
        "examples"
    ]

    for category in categories:

        if result_a[category] > result_b[category]:

            reasons.append(
                f"Prompt A has better {category}"
            )

        elif result_b[category] > result_a[category]:

            reasons.append(
                f"Prompt B has better {category}"
            )

    return {

        "winner": winner,

        "winning_prompt":
            winning_prompt,

        "prompt_a_score":
            score_a,

        "prompt_b_score":
            score_b,

        "prompt_a_analysis":
            result_a,

        "prompt_b_analysis":
            result_b,

        "reasons":
            reasons

    }