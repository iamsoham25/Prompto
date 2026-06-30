import re


class PromptScorer:

    def __init__(self, prompt: str):

        self.prompt = prompt.lower()


    # -----------------------------
    # Role Detection
    # -----------------------------
    def score_role(self):

        keywords = [
            "you are",
            "act as",
            "behave as",
            "pretend to be",
            "role"
        ]

        score = 0

        for keyword in keywords:

            if keyword in self.prompt:
                score += 20

        return min(score, 100)


    # -----------------------------
    # Context Detection
    # -----------------------------
    def score_context(self):

        words = self.prompt.split()

        if len(words) >= 120:
            return 100

        elif len(words) >= 90:
            return 85

        elif len(words) >= 60:
            return 70

        elif len(words) >= 30:
            return 50

        return 20


    # -----------------------------
    # Constraints
    # -----------------------------
    def score_constraints(self):

        keywords = [
            "must",
            "should",
            "only",
            "avoid",
            "don't",
            "do not",
            "limit",
            "strictly"
        ]

        score = 0

        for keyword in keywords:

            if keyword in self.prompt:
                score += 15

        return min(score, 100)


    # -----------------------------
    # Examples
    # -----------------------------
    def score_examples(self):

        keywords = [
            "example",
            "for example",
            "sample",
            "input",
            "output"
        ]

        score = 0

        for keyword in keywords:

            if keyword in self.prompt:
                score += 20

        return min(score, 100)


    # -----------------------------
    # Output Format
    # -----------------------------
    def score_output_format(self):

        keywords = [
            "json",
            "table",
            "markdown",
            "bullet",
            "csv",
            "xml",
            "yaml",
            "list"
        ]

        score = 0

        for keyword in keywords:

            if keyword in self.prompt:
                score += 15

        return min(score, 100)


    # -----------------------------
    # Clarity
    # -----------------------------
    def score_clarity(self):

        sentences = re.split(r"[.!?]", self.prompt)

        sentences = [s for s in sentences if s.strip()]

        if not sentences:
            return 0

        avg_length = len(self.prompt.split()) / len(sentences)

        if avg_length < 15:
            return 95

        elif avg_length < 25:
            return 85

        elif avg_length < 35:
            return 70

        return 55


    # -----------------------------
    # Suggestions
    # -----------------------------
    def strengths(self, scores):

        result = []

        if scores["role"] >= 80:
            result.append("Excellent role definition")

        if scores["context"] >= 80:
            result.append("Strong contextual information")

        if scores["constraints"] >= 80:
            result.append("Well-defined constraints")

        if scores["examples"] >= 80:
            result.append("Examples improve prompt quality")

        if scores["output_format"] >= 80:
            result.append("Output format clearly specified")

        if scores["clarity"] >= 80:
            result.append("Prompt is easy to understand")

        return result


    def improvements(self, scores):

        result = []

        if scores["role"] < 60:
            result.append("Assign a role to the AI")

        if scores["context"] < 60:
            result.append("Add more context")

        if scores["constraints"] < 60:
            result.append("Define constraints or limitations")

        if scores["examples"] < 60:
            result.append("Provide examples")

        if scores["output_format"] < 60:
            result.append("Specify an output format")

        if scores["clarity"] < 60:
            result.append("Make instructions clearer")

        return result


    # -----------------------------
    # Final Analysis
    # -----------------------------
    def analyze(self):

        scores = {

            "role": self.score_role(),

            "context": self.score_context(),

            "constraints": self.score_constraints(),

            "examples": self.score_examples(),

            "output_format": self.score_output_format(),

            "clarity": self.score_clarity(),

        }

        overall = round(sum(scores.values()) / len(scores))

        return {

            "overall_score": overall,

            **scores,

            "strengths": self.strengths(scores),

            "improvements": self.improvements(scores)

        }