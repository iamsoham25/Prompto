# app/services/prompt_evaluator.py

def evaluate_prompt(prompt: str):

    prompt_lower = prompt.lower()

    # ==========================
    # CLARITY
    # ==========================

    word_count = len(prompt.split())

    if word_count >= 30:
        clarity = 10

    elif word_count >= 20:
        clarity = 8

    elif word_count >= 10:
        clarity = 6

    else:
        clarity = 3

    # ==========================
    # SPECIFICITY
    # ==========================

    specificity_keywords = [
        "summarize",
        "analyze",
        "compare",
        "generate",
        "explain",
        "classify",
        "evaluate",
        "predict",
        "design",
        "optimize",
        "recommend"
    ]

    specificity_matches = sum(
        keyword in prompt_lower
        for keyword in specificity_keywords
    )

    specificity = min(
        10,
        specificity_matches * 2
    )

    # ==========================
    # CONTEXT
    # ==========================

    context_keywords = [
        "for",
        "target audience",
        "background",
        "context",
        "industry",
        "business"
    ]

    context_matches = sum(
        keyword in prompt_lower
        for keyword in context_keywords
    )

    context = min(
        10,
        context_matches * 2
    )

    # ==========================
    # CONSTRAINTS
    # ==========================

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
        constraint_matches * 2
    )

    # ==========================
    # ROLE DEFINITION
    # ==========================

    role_keywords = [
        "act as",
        "you are",
        "behave as",
        "role"
    ]

    role_matches = sum(
        keyword in prompt_lower
        for keyword in role_keywords
    )

    role_definition = min(
        10,
        role_matches * 4
    )

    # ==========================
    # OUTPUT FORMAT
    # ==========================

    output_keywords = [
        "json",
        "table",
        "bullet points",
        "markdown",
        "csv",
        "list format"
    ]

    output_matches = sum(
        keyword in prompt_lower
        for keyword in output_keywords
    )

    output_format = min(
        10,
        output_matches * 3
    )

    # ==========================
    # EXAMPLES
    # ==========================

    example_keywords = [
        "example",
        "for example",
        "sample"
    ]

    example_matches = sum(
        keyword in prompt_lower
        for keyword in example_keywords
    )

    examples = min(
        10,
        example_matches * 5
    )

    # ==========================
    # OVERALL
    # ==========================

    overall = round(
        (
            clarity +
            specificity +
            context +
            constraints +
            role_definition +
            output_format +
            examples
        ) / 7,
        1
    )

    # ==========================
    # STRENGTHS
    # ==========================

    strengths = []

    if clarity >= 8:
        strengths.append(
            "Prompt is detailed and clear"
        )

    if role_definition >= 6:
        strengths.append(
            "Strong role definition"
        )

    if output_format >= 6:
        strengths.append(
            "Good output formatting instructions"
        )

    if context >= 6:
        strengths.append(
            "Provides useful context"
        )

    # ==========================
    # WEAKNESSES
    # ==========================

    weaknesses = []

    if context < 4:
        weaknesses.append(
            "Add more context"
        )

    if constraints < 4:
        weaknesses.append(
            "Add constraints or requirements"
        )

    if output_format < 4:
        weaknesses.append(
            "Specify desired output format"
        )

    if role_definition < 4:
        weaknesses.append(
            "Define a role for the AI"
        )

    return {
        "clarity": clarity,
        "specificity": specificity,
        "context": context,
        "constraints": constraints,
        "role_definition": role_definition,
        "output_format": output_format,
        "examples": examples,
        "overall": overall,
        "strengths": strengths,
        "weaknesses": weaknesses
    }