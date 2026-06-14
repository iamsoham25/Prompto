from app.services.prompt_evaluator import (
    evaluate_prompt
)

from app.services.prompt_improver import (
    improve_prompt
)

def evaluate_challenge_prompt(
    prompt: str,
    target_score: float
):

    evaluation = evaluate_prompt(
        prompt
    )

    improvement = improve_prompt(
        prompt
    )

    weaknesses = []

    if evaluation["context"] < 4:
        weaknesses.append(
            "Missing Context"
        )

    if evaluation["constraints"] < 4:
        weaknesses.append(
            "Missing Constraints"
        )

    if evaluation["role_definition"] < 4:
        weaknesses.append(
            "Missing Role Definition"
        )

    if evaluation["output_format"] < 4:
        weaknesses.append(
            "Missing Output Format"
        )

    passed = (
        evaluation["overall"]
        >= target_score
    )

    return {

        "score":
            evaluation["overall"],

        "target_score":
            target_score,

        "passed":
            passed,

        "weaknesses":
            weaknesses,

        "professional_prompt":
            improvement[
                "improved_prompt"
            ]
    }