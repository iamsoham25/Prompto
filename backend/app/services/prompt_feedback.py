def generate_feedback(prompt: str):

    prompt_lower = prompt.lower()

    feedback = []

    suggestions = []

    # Length

    if len(prompt.split()) < 10:

        feedback.append(
            "Prompt is too short."
        )

        suggestions.append(
            "Add more details."
        )

    # Role

    if (
        "act as" not in prompt_lower
        and
        "role" not in prompt_lower
    ):

        feedback.append(
            "No role assigned."
        )

        suggestions.append(
            "Add a role such as Data Scientist, Teacher, or Marketing Expert."
        )

    # Output format

    format_words = [
        "table",
        "json",
        "bullet",
        "step by step"
    ]

    if not any(
        word in prompt_lower
        for word in format_words
    ):

        feedback.append(
            "No output format specified."
        )

        suggestions.append(
            "Specify output format."
        )

    # Constraints

    constraint_words = [
        "under",
        "maximum",
        "minimum",
        "within"
    ]

    if not any(
        word in prompt_lower
        for word in constraint_words
    ):

        feedback.append(
            "No constraints defined."
        )

        suggestions.append(
            "Add limits such as word count or number of bullet points."
        )

    return {
        "feedback": feedback,
        "suggestions": suggestions
    }