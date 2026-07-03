import json
import re

from app.services.openrouter_service import client


SYSTEM_PROMPT = """
You are Prompto AI, an expert prompt engineering assistant.

Your job is to analyze and rewrite user prompts so they become clearer,
more specific, more structured, and more effective for AI systems.

You must preserve the user's original intention.

Analyze the prompt using these principles:

1. Clarity
2. Specificity
3. Context
4. Role definition
5. Constraints
6. Output format
7. Examples when useful
8. Audience definition
9. Tone requirements
10. Success criteria

IMPORTANT RULES:

- Do not change the core intent of the user.
- Do not answer the user's prompt.
- Only improve and rewrite the prompt.
- Do not unnecessarily make a simple prompt extremely long.
- Do not repeat instructions that already exist.
- Do not duplicate Role, Task, Requirements, Context, or Output Format sections.
- If the prompt is already strong, refine it instead of rewriting it unnecessarily.
- Make the rewritten prompt directly usable with an AI model.
- Improvement score must be from 0 to 100.
- Keep changes, strengths, and weaknesses concise and meaningful.

Return ONLY valid JSON.

The exact JSON structure must be:

{
    "improved_prompt": "The complete rewritten prompt",
    "improvement_score": 85,
    "changes": [
        "Added a clear role definition",
        "Added specific output requirements"
    ],
    "strengths": [
        "The original intent is clear"
    ],
    "weaknesses": [
        "The prompt lacks context",
        "The expected output format is not specified"
    ]
}

Do not include markdown code fences.

Do not write ```json.

Return only the JSON object.
"""


def clean_json_response(response: str) -> str:
    """
    Removes accidental markdown code fences from AI response.
    """

    response = response.strip()

    response = re.sub(
        r"^```json\s*",
        "",
        response,
        flags=re.IGNORECASE
    )

    response = re.sub(
        r"^```\s*",
        "",
        response
    )

    response = re.sub(
        r"\s*```$",
        "",
        response
    )

    return response.strip()


def improve_prompt(prompt: str):
    """
    Sends the original prompt to OpenRouter and returns
    AI-generated prompt improvement analysis.
    """

    if not prompt or not prompt.strip():
        raise ValueError(
            "Prompt cannot be empty."
        )

    try:

        completion = client.chat.completions.create(

            # Use the same working model that you use in your project.
            # If this model is unavailable in your OpenRouter account,
            # replace it with the model already working in playground.py.
            model="openai/gpt-3.5-turbo",

            temperature=0.4,

            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": (
                        "Analyze and improve the following prompt:\n\n"
                        f"{prompt}"
                    )
                }
            ]
        )


        ai_response = (
            completion
            .choices[0]
            .message
            .content
        )


        if not ai_response:
            raise ValueError(
                "AI returned an empty response."
            )


        cleaned_response = clean_json_response(
            ai_response
        )


        result = json.loads(
            cleaned_response
        )


        # Validate important fields

        improved_prompt = result.get(
            "improved_prompt",
            prompt
        )

        improvement_score = result.get(
            "improvement_score",
            0
        )

        changes = result.get(
            "changes",
            []
        )

        strengths = result.get(
            "strengths",
            []
        )

        weaknesses = result.get(
            "weaknesses",
            []
        )


        # Ensure score is numeric and within 0-100

        try:

            improvement_score = int(
                improvement_score
            )

        except (ValueError, TypeError):

            improvement_score = 0


        improvement_score = max(
            0,
            min(100, improvement_score)
        )


        return {
            "original_prompt": prompt,

            "improved_prompt": improved_prompt,

            "improvement_score": improvement_score,

            "changes": changes,

            "strengths": strengths,

            "weaknesses": weaknesses
        }


    except json.JSONDecodeError as error:

        print(
            "JSON Parsing Error:",
            error
        )

        print(
            "Raw AI Response:",
            ai_response
        )

        raise ValueError(
            "AI returned an invalid response format."
        )


    except Exception as error:

        print(
            "Prompt Improver Error:",
            str(error)
        )

        raise error