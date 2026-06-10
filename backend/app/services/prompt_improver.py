# app/services/prompt_improver.py

def improve_prompt(prompt: str):

    prompt_lower = prompt.lower()

    # Explain
    if "explain" in prompt_lower:

        improved = (
            prompt +
            " in simple language with examples, "
            "advantages, disadvantages, and "
            "real-world applications."
        )

    # Summarize
    elif "summarize" in prompt_lower:

        improved = (
            prompt +
            " in 5 concise bullet points, "
            "highlighting key insights and action items."
        )

    # Analyze
    elif "analyze" in prompt_lower:

        improved = (
            prompt +
            " and provide detailed findings, "
            "trends, strengths, weaknesses, "
            "and recommendations."
        )

    # Generate
    elif "generate" in prompt_lower:

        improved = (
            prompt +
            " with clear structure, examples, "
            "and professional formatting."
        )

    else:

        improved = (
            "Act as an expert.\n\n"
            + prompt +
            "\n\nProvide a detailed response "
            "with examples and step-by-step explanation."
        )

    return {
        "original_prompt": prompt,
        "improved_prompt": improved
    }