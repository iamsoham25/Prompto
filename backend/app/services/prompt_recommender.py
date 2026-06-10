# app/services/prompt_recommender.py

def recommend_lesson(evaluation):

    recommendations = []

    if evaluation["clarity"] < 5:

        recommendations.append({
            "lesson": "Prompt Basics",
            "reason": "Improve prompt clarity."
        })

    if evaluation["specificity"] < 5:

        recommendations.append({
            "lesson": "Few Shot Prompting",
            "reason": "Improve prompt specificity."
        })

    if evaluation["context"] < 5:

        recommendations.append({
            "lesson": "Role Prompting",
            "reason": "Improve prompt context."
        })

    if evaluation["constraints"] < 5:

        recommendations.append({
            "lesson": "Prompt Structuring",
            "reason": "Improve prompt constraints."
        })

    if len(recommendations) == 0:

        recommendations.append({
            "lesson": "Advanced Prompt Engineering",
            "reason": "Your prompt quality is already strong."
        })

    return recommendations