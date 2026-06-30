# app/services/prompt_evaluator.py

def evaluate_prompt(prompt: str):

    prompt_lower = prompt.lower()

    # -------------------------
    # Clarity
    # -------------------------

    word_count = len(prompt.split())

    if word_count >= 30:
        clarity = 100
    elif word_count >= 20:
        clarity = 80
    elif word_count >= 10:
        clarity = 60
    else:
        clarity = 30

    # -------------------------
    # Specificity
    # -------------------------

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

    specificity = min(100, specificity_matches * 20)

    # -------------------------
    # Context
    # -------------------------

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

    context = min(100, context_matches * 20)

    # -------------------------
    # Constraints
    # -------------------------

    constraint_keywords = [
        "bullet points",
        "table",
        "json",
        "under",
        "within",
        "maximum",
        "minimum",
        "step by step",
        "must",
        "only",
        "avoid"
    ]

    constraint_matches = sum(
        keyword in prompt_lower
        for keyword in constraint_keywords
    )

    constraints = min(100, constraint_matches * 15)

    # -------------------------
    # Role
    # -------------------------

    role_keywords = [
        "act as",
        "you are",
        "behave as",
        "pretend to be",
        "role"
    ]

    role_matches = sum(
        keyword in prompt_lower
        for keyword in role_keywords
    )

    role = min(100, role_matches * 25)

    # -------------------------
    # Output Format
    # -------------------------

    output_keywords = [
        "json",
        "table",
        "bullet points",
        "markdown",
        "csv",
        "list",
        "xml",
        "yaml"
    ]

    output_matches = sum(
        keyword in prompt_lower
        for keyword in output_keywords
    )

    output_format = min(100, output_matches * 15)

    # -------------------------
    # Examples
    # -------------------------

    example_keywords = [
        "example",
        "for example",
        "sample",
        "input",
        "output"
    ]

    example_matches = sum(
        keyword in prompt_lower
        for keyword in example_keywords
    )

    examples = min(100, example_matches * 20)

    # -------------------------
    # Overall Score
    # -------------------------

    overall_score = round(

        (
            clarity +
            specificity +
            context +
            constraints +
            role +
            output_format +
            examples

        ) / 7

    )

    # -------------------------
    # Difficulty
    # -------------------------

    if overall_score >= 85:
        difficulty = "Advanced"

    elif overall_score >= 60:
        difficulty = "Intermediate"

    else:
        difficulty = "Beginner"

    # -------------------------
    # Strengths
    # -------------------------

    strengths = []

    if clarity >= 80:
        strengths.append("Prompt is clear and detailed")

    if specificity >= 60:
        strengths.append("Specific instructions are provided")

    if role >= 60:
        strengths.append("Strong role definition")

    if context >= 60:
        strengths.append("Useful context is included")

    if output_format >= 60:
        strengths.append("Output format is well defined")

    if examples >= 60:
        strengths.append("Examples improve prompt quality")

    # -------------------------
    # Improvements
    # -------------------------

    improvements = []

    if context < 60:
        improvements.append("Add more context")

    if constraints < 60:
        improvements.append("Specify constraints")

    if role < 60:
        improvements.append("Assign a clear AI role")

    if output_format < 60:
        improvements.append("Specify the desired output format")

    if examples < 60:
        improvements.append("Include an example input/output")

    if specificity < 60:
        improvements.append("Use more specific instructions")

    return {

        "overall_score": overall_score,

        "clarity": clarity,

        "specificity": specificity,

        "context": context,

        "constraints": constraints,

        "role": role,

        "output_format": output_format,

        "examples": examples,

        "difficulty": difficulty,

        "strengths": strengths,

        "improvements": improvements

    }