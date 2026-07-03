# backend/app/services/prompt_improver.py

import os
import json

from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()


# =========================================================
# OPENROUTER CLIENT
# =========================================================

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are an expert Prompt Engineer.

Your job is to analyze and rewrite user prompts so they become
clear, specific, contextual, structured, and ready to use with
an AI assistant.

The improved prompt should preserve the user's original intention.

When appropriate, improve the prompt using:

1. Role
   Assign a relevant expert role to the AI.

2. Task
   Clearly describe what the AI must do.

3. Context
   Add useful context only when it can be reasonably inferred.

4. Audience
   Specify the intended audience when appropriate.

5. Scope
   Define important topics or areas the response should cover.

6. Constraints
   Add useful requirements such as simplicity, depth, tone,
   length, limitations, or technical level when appropriate.

7. Output Format
   Specify a suitable response format such as:
   - headings
   - bullet points
   - numbered steps
   - tables
   - code blocks
   - structured report

8. Examples
   Request practical or real-world examples when useful.

IMPORTANT RULES:

- Do not change the original intention of the user.
- Do not add unrelated requirements.
- Do not make the improved prompt unnecessarily long.
- Adapt the structure to the type of prompt.
- Coding prompts should request technically correct code and explanations.
- Research prompts should request structured and evidence-based analysis.
- Writing prompts should specify tone, audience, and format.
- Business prompts should request actionable recommendations.
- Learning prompts should specify audience level and explanation style.

Return ONLY valid JSON.

The JSON must follow exactly this structure:

{
    "improved_prompt": "complete rewritten prompt",
    "improvement_score": 0,
    "changes": [
        "change 1",
        "change 2"
    ],
    "strengths": [
        "strength 1"
    ],
    "weaknesses": [
        "weakness 1",
        "weakness 2"
    ]
}

The improvement_score must be an integer between 0 and 100.

Do not wrap the JSON in markdown code fences.
"""


# =========================================================
# AI PROMPT IMPROVER
# =========================================================

def improve_prompt(prompt: str):

    if not prompt or not prompt.strip():
        raise ValueError("Prompt cannot be empty.")

    try:

        completion = client.chat.completions.create(

            model="openai/gpt-3.5-turbo",

            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": f"""
Analyze and improve the following prompt.

Original Prompt:
{prompt.strip()}
"""
                }
            ],

            temperature=0.4
        )


        ai_content = completion.choices[0].message.content

        if not ai_content:
            raise ValueError("AI returned an empty response.")


        # Remove accidental markdown formatting
        cleaned_content = (
            ai_content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )


        result = json.loads(cleaned_content)


        # =================================================
        # VALIDATION
        # =================================================

        improved_prompt = result.get(
            "improved_prompt",
            prompt.strip()
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


        # Ensure score is valid
        try:
            improvement_score = int(improvement_score)
        except (TypeError, ValueError):
            improvement_score = 0


        improvement_score = max(
            0,
            min(100, improvement_score)
        )


        # Ensure arrays
        if not isinstance(changes, list):
            changes = []

        if not isinstance(strengths, list):
            strengths = []

        if not isinstance(weaknesses, list):
            weaknesses = []


        return {
            "original_prompt": prompt.strip(),
            "improved_prompt": improved_prompt,
            "improvement_score": improvement_score,
            "changes": changes,
            "strengths": strengths,
            "weaknesses": weaknesses
        }


    except json.JSONDecodeError as error:

        print(
            "AI JSON parsing error:",
            error
        )

        raise ValueError(
            "AI response was not valid JSON."
        )


    except Exception as error:

        print(
            "Prompt Improver Error:",
            str(error)
        )

        raise