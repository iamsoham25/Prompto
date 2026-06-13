# app/services/prompt_mentor.py

def get_mentor_response(
    question: str
):

    question = question.lower()

    # ======================
    # ROLE PROMPTING
    # ======================

    if "role prompting" in question:

        return {
            "answer":
            """
Role Prompting is a Prompt Engineering technique
where you assign a role to the AI before giving a task.

Example:

Act as a Senior Software Engineer.

Review this code and suggest improvements.

Why it works:
- Better expertise
- Better reasoning
- Better responses
"""
        }

    # ======================
    # CONTEXT
    # ======================

    elif "context" in question:

        return {
            "answer":
            """
Context tells the AI about the situation.

Weak Prompt:

Explain Machine Learning.

Strong Prompt:

Explain Machine Learning to a first-year
engineering student with no AI background.

Adding context improves response quality.
"""
        }

    # ======================
    # CONSTRAINTS
    # ======================

    elif "constraints" in question:

        return {
            "answer":
            """
Constraints tell the AI what limits to follow.

Examples:

- Under 200 words
- Use bullet points
- Return JSON
- Step-by-step explanation

Constraints make responses predictable.
"""
        }

    # ======================
    # CHAIN OF THOUGHT
    # ======================

    elif "chain of thought" in question:

        return {
            "answer":
            """
Chain of Thought Prompting encourages
the AI to reason step-by-step.

Example:

Solve the problem step-by-step
and explain your reasoning.

This improves complex problem solving.
"""
        }

    # ======================
    # DEFAULT
    # ======================

    return {
        "answer":
        """
Prompt Engineering Best Practices:

1. Define a role
2. Give context
3. Define the task clearly
4. Add constraints
5. Specify output format
6. Provide examples

The more structured the prompt,
the better the AI response.
"""
    }