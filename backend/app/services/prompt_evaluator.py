import os
import json

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)


def evaluate_prompt(prompt: str):

    system_prompt = """
You are one of the world's best Prompt Engineering experts.

Your task is to evaluate the quality of a user's prompt.

Evaluate the prompt on these criteria:

1. Clarity
2. Specificity
3. Context
4. Constraints
5. Role Definition
6. Output Format
7. Examples

Score each criterion from 0 to 100.

Also calculate an overall_score.

Difficulty:
- Beginner
- Intermediate
- Advanced

Return ONLY valid JSON.

The JSON format MUST be:

{
  "overall_score": 0,
  "clarity": 0,
  "specificity": 0,
  "context": 0,
  "constraints": 0,
  "role": 0,
  "output_format": 0,
  "examples": 0,
  "difficulty": "",
  "strengths": [],
  "improvements": [],
  "summary": ""
}

Do not return markdown.

Do not return explanations.

Return JSON only.
"""

    completion = client.chat.completions.create(

        model="openai/gpt-4o-mini",

        temperature=0.2,

        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = completion.choices[0].message.content

    try:

        return json.loads(content)

    except Exception:

        return {

            "overall_score": 0,

            "clarity": 0,

            "specificity": 0,

            "context": 0,

            "constraints": 0,

            "role": 0,

            "output_format": 0,

            "examples": 0,

            "difficulty": "Unknown",

            "strengths": [],

            "improvements": [],

            "summary": "Failed to parse AI response."
        }