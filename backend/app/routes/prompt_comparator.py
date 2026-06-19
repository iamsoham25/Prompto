from fastapi import APIRouter

router = APIRouter(tags=["Prompt Comparator"])

def score_prompt(prompt: str):

    words = len(prompt.split())

    clarity = min(words / 5, 10)

    specificity = 0

    keywords = [
        "example",
        "step",
        "format",
        "beginner",
        "professional",
        "table"
    ]

    for keyword in keywords:

        if keyword.lower() in prompt.lower():

            specificity += 1

    specificity *= 2

    score = round(
        (clarity + specificity) / 2,
        2
    )

    return score

@router.post("/compare-prompts")
async def compare_prompts(data: dict):

    prompt_a = data["prompt_a"]

    prompt_b = data["prompt_b"]

    score_a = score_prompt(prompt_a)

    score_b = score_prompt(prompt_b)

    winner = (
        "Prompt A"
        if score_a > score_b
        else "Prompt B"
    )

    return {

        "score_a": score_a,

        "score_b": score_b,

        "winner": winner,

        "difference": round(
            abs(score_a - score_b),
            2
        )
    }