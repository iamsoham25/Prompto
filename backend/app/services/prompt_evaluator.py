# app/services/prompt_evaluator.py

def evaluate_prompt(prompt: str):

    prompt_lower = prompt.lower()

    # --------------------
    # CLARITY
    # --------------------

    word_count = len(prompt.split())

    if word_count >= 20:
        clarity = 10

    elif word_count >= 10:
        clarity = 8

    elif word_count >= 5:
        clarity = 6

    else:
        clarity = 3

    # --------------------
    # SPECIFICITY
    # --------------------

    specificity_keywords = [
        "summarize",
        "analyze",
        "compare",
        "generate",
        "explain",
        "classify",
        "evaluate",
        "predict"
    ]

    specificity_matches = sum(
        keyword in prompt_lower
        for keyword in specificity_keywords
    )

    specificity = min(
        10,
        specificity_matches * 2
    )

    # --------------------
    # CONTEXT
    # --------------------

    context_keywords = [
        "act as",
        "role",
        "for",
        "as a",
        "as an"
    ]

    context_matches = sum(
        keyword in prompt_lower
        for keyword in context_keywords
    )

    context = min(
        10,
        context_matches * 3
    )

    # --------------------
    # CONSTRAINTS
    # --------------------

    constraint_keywords = [
        "bullet points",
        "table",
        "json",
        "under",
        "within",
        "maximum",
        "minimum",
        "step by step"
    ]

    constraint_matches = sum(
        keyword in prompt_lower
        for keyword in constraint_keywords
    )

    constraints = min(
        10,
        constraint_matches * 3
    )

    # --------------------
    # OVERALL
    # --------------------

    overall = round(
        (
            clarity +
            specificity +
            context +
            constraints
        ) / 4,
        1
    )

    return {
        "clarity": clarity,
        "specificity": specificity,
        "context": context,
        "constraints": constraints,
        "overall": overall
    }