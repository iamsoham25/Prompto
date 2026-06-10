# app/services/challenge_validator.py

def validate_challenge(
    challenge_type: str,
    prompt: str
):

    prompt_lower = prompt.lower()

    # -------------------
    # ROLE PROMPT
    # -------------------

    if challenge_type == "role_prompt":

        passed = (
            "act as" in prompt_lower
            or
            "role" in prompt_lower
        )

        return {
            "passed": passed,
            "message":
            "Role Prompt Challenge Passed"
            if passed
            else
            "Prompt must contain a role."
        }

    # -------------------
    # FEW SHOT
    # -------------------

    elif challenge_type == "few_shot":

        passed = (
            "example" in prompt_lower
            or
            "examples" in prompt_lower
        )

        return {
            "passed": passed,
            "message":
            "Few Shot Challenge Passed"
            if passed
            else
            "Include at least one example."
        }

    # -------------------
    # CHAIN OF THOUGHT
    # -------------------

    elif challenge_type == "chain_of_thought":

        passed = (
            "step by step"
            in prompt_lower
        )

        return {
            "passed": passed,
            "message":
            "Chain of Thought Challenge Passed"
            if passed
            else
            "Prompt should request step-by-step reasoning."
        }

    return {
        "passed": False,
        "message": "Unknown Challenge Type"
    }