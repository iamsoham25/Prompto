# app/services/prompt_improver.py

def improve_prompt(prompt: str):

    prompt_lower = prompt.lower()

    role = "Act as an expert assistant."

    requirements = [
        "Provide clear explanations",
        "Use examples where appropriate",
        "Structure the response properly"
    ]

    output_format = "Use headings and bullet points."

    # ==========================
    # CODING
    # ==========================

    coding_keywords = [
        "code",
        "python",
        "java",
        "javascript",
        "program",
        "debug",
        "api"
    ]

    if any(
        keyword in prompt_lower
        for keyword in coding_keywords
    ):

        role = (
            "Act as a senior software engineer."
        )

        requirements = [
            "Explain the logic clearly",
            "Follow best practices",
            "Provide optimized solutions",
            "Include code examples"
        ]

        output_format = (
            "Use markdown code blocks."
        )

    # ==========================
    # WRITING
    # ==========================

    elif any(
        keyword in prompt_lower
        for keyword in [
            "blog",
            "article",
            "write",
            "content"
        ]
    ):

        role = (
            "Act as a professional content writer."
        )

        requirements = [
            "Use engaging language",
            "Include examples",
            "Use headings and subheadings",
            "Provide a conclusion"
        ]

        output_format = (
            "Return in markdown format."
        )

    # ==========================
    # RESEARCH
    # ==========================

    elif any(
        keyword in prompt_lower
        for keyword in [
            "research",
            "study",
            "paper",
            "analysis"
        ]
    ):

        role = (
            "Act as an academic researcher."
        )

        requirements = [
            "Use structured reasoning",
            "Provide evidence-based insights",
            "Include key findings",
            "Provide recommendations"
        ]

        output_format = (
            "Return as a structured report."
        )

    # ==========================
    # BUSINESS
    # ==========================

    elif any(
        keyword in prompt_lower
        for keyword in [
            "marketing",
            "sales",
            "business",
            "strategy"
        ]
    ):

        role = (
            "Act as a senior business consultant."
        )

        requirements = [
            "Provide strategic recommendations",
            "Include actionable insights",
            "Consider business impact"
        ]

        output_format = (
            "Use sections and bullet points."
        )

    # ==========================
    # IMPROVED PROMPT
    # ==========================

    improved_prompt = f"""
{role}

Task:
{prompt}

Requirements:
- {requirements[0]}
- {requirements[1]}
- {requirements[2]}
{f"- {requirements[3]}" if len(requirements) > 3 else ""}

Output Format:
{output_format}
"""

    return {
        "original_prompt": prompt,
        "improved_prompt": improved_prompt.strip()
    }