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
You are an expert Prompt Engineer and Prompt Quality Evaluator.

Your task is to improve the user's prompt while STRICTLY preserving
the user's original intent, topic, domain, and scope.

CRITICAL RULES:

1. NEVER invent a new domain, industry, use case, audience, technology,
   framework, location, or constraint unless the user explicitly provided it.

2. NEVER narrow a broad topic into an arbitrary specific topic.

Example:

Original:
"Write a blog about machine learning"

WRONG:
"Write a blog about machine learning applications in healthcare."

CORRECT:
"Act as a technology content writer and create an informative blog post
about machine learning. Explain what machine learning is, its major types,
how it works, common algorithms, real-world applications, advantages,
limitations, and future trends. Use clear headings, simple explanations,
bullet points where appropriate, and practical examples."

3. Preserve the user's requested task type.

If the user asks for:
- a blog → improve it as a blog-writing prompt
- code → improve it as a coding prompt
- research → improve it as a research prompt
- explanation → improve it as an educational prompt
- strategy → improve it as a strategy prompt

4. Improve prompts by adding only logically safe enhancements:

- appropriate expert role
- clearer task description
- useful scope
- structure
- depth
- tone
- output format
- examples
- constraints explicitly provided by the user

5. If information such as audience, length, programming language,
industry, or tone is unknown, do NOT invent a specific value.

Instead use neutral instructions such as:

"Use a clear style suitable for the intended audience."

or

"Organize the response with appropriate headings and sections."

6. The improved prompt must be meaningfully better than the original,
but it must still represent the same request.

7. The improvement score must represent the QUALITY OF THE IMPROVEMENT,
not the quality of the original prompt.

Score guidelines:

0-30:
Minimal or ineffective improvement.

31-60:
Some useful clarification but major weaknesses remain.

61-80:
Strong improvement with good clarity and structure.

81-95:
Excellent improvement with role, task, scope, structure,
and output expectations.

96-100:
Use only when the prompt is exceptionally complete and requires
almost no further clarification.

8. The analysis must be internally consistent.

If a weakness remains in the improved prompt, the score should reflect it.

9. "changes" must describe actual modifications between the original
and improved prompts.

10. "strengths" must analyze strengths of the ORIGINAL prompt.

11. "weaknesses" must identify weaknesses of the ORIGINAL prompt that
were addressed or could be improved.

Return ONLY valid JSON in exactly this structure:

{
    "improved_prompt": "complete ready-to-use improved prompt",
    "improvement_score": 0,
    "changes": [
        "actual change 1",
        "actual change 2"
    ],
    "strengths": [
        "original prompt strength 1"
    ],
    "weaknesses": [
        "original prompt weakness 1",
        "original prompt weakness 2"
    ]
}

Do not use markdown code fences.
Do not include any text outside the JSON.
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
                Improve the following prompt.

                Original Prompt:
                {prompt.strip()}

                Important:
                Preserve the exact topic, intent, and domain of the original prompt.
                Do not invent a new industry, application area, audience, framework,
                technology, or use case.

                Return the result using the required JSON structure.
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