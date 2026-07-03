"use client";

interface SuggestionCardProps {
  reasons: string[];
  suggestions: string[];
}

export default function SuggestionCard({
  reasons,
  suggestions,
}: SuggestionCardProps) {

  return (

    <div className="grid lg:grid-cols-2 gap-8">

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        <h2 className="text-2xl font-bold mb-6">

          💡 Why This Prompt Won

        </h2>

        <div className="space-y-4">

          {

            reasons.map((reason, index) => (

              <div
                key={index}
                className="flex gap-3"
              >

                <span className="text-green-500">

                  ✔

                </span>

                <p>{reason}</p>

              </div>

            ))

          }

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        <h2 className="text-2xl font-bold mb-6">

          🚀 Improvement Suggestions

        </h2>

        <div className="space-y-4">

          {

            suggestions.length === 0

            ? (

              <p className="text-slate-500">

                No suggestions. Both prompts performed equally well.

              </p>

            )

            : (

              suggestions.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <span className="text-orange-500">

                    ➜

                  </span>

                  <p>{item}</p>

                </div>

              ))

            )

          }

        </div>

      </div>

    </div>

  );

}