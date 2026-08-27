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

            # Overall score
            "overall_score": evaluation.get(
                "overall_score",
                0
            ),

            # Evaluation scores
            "clarity_score": evaluation.get(
                "clarity",
                0
            ),

            "specificity_score": evaluation.get(
                "specificity",
                0
            ),

            "context_score": evaluation.get(
                "context",
                0
            ),

            "constraints_score": evaluation.get(
                "constraints",
                0
            ),

            "role_definition_score": evaluation.get(
                "role",
                0
            ),

            "output_format_score": evaluation.get(
                "output_format",
                0
            ),

            "examples_score": evaluation.get(
                "examples",
                0
            ),

            # Additional information
            "difficulty": evaluation.get(
                "difficulty",
                ""
            ),

            "strengths": evaluation.get(
                "strengths",
                []
            ),

            "weaknesses": evaluation.get(
                "improvements",
                []
            ),

            "created_at": datetime.utcnow()

        }