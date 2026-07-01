from datetime import datetime


class PromptHistory:

    @staticmethod
    def create_document(
        user_email: str,
        prompt: str,
        evaluation: dict
    ):

        return {

            "user_email": user_email,

            "prompt": prompt,

            "overall_score": evaluation.get(
                "overall_score",
                0
            ),

            "clarity": evaluation.get(
                "clarity",
                0
            ),

            "specificity": evaluation.get(
                "specificity",
                0
            ),

            "context": evaluation.get(
                "context",
                0
            ),

            "constraints": evaluation.get(
                "constraints",
                0
            ),

            "role": evaluation.get(
                "role",
                0
            ),

            "output_format": evaluation.get(
                "output_format",
                0
            ),

            "examples": evaluation.get(
                "examples",
                0
            ),

            "difficulty": evaluation.get(
                "difficulty",
                0
            ),

            "strengths": evaluation.get(
                "strengths",
                []
            ),

            "improvements": evaluation.get(
                "improvements",
                []
            ),

            "created_at": datetime.utcnow()

        }