"use client";

interface Props {
  result: any;
}

export default function EvaluationResult({
  result,
}: Props) {

  if (!result) return null;

  const score = result.overall_score;

  const progressColor =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (

    <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold">

        🤖 AI Evaluation

      </h2>

      {/* Overall Score */}

      <div className="mt-8">

        <div className="flex justify-between">

          <span className="font-semibold">

            Overall Score

          </span>

          <span className="font-bold text-2xl">

            {score}/100

          </span>

        </div>

        <div className="mt-3 w-full bg-gray-200 rounded-full h-5">

          <div

            className={`${progressColor} h-5 rounded-full transition-all duration-700`}

            style={{
              width: `${score}%`
            }}

          />

        </div>

      </div>

      {/* Skill Scores */}

      <div className="grid md:grid-cols-2 gap-5 mt-10">

        <Skill
          title="Clarity"
          value={result.clarity}
        />

        <Skill
          title="Specificity"
          value={result.specificity}
        />

        <Skill
          title="Context"
          value={result.context}
        />

        <Skill
          title="Constraints"
          value={result.constraints}
        />

        <Skill
          title="Role"
          value={result.role}
        />

        <Skill
          title="Output Format"
          value={result.output_format}
        />

        <Skill
          title="Examples"
          value={result.examples}
        />

      </div>

      {/* Strengths */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-green-700">

          ✅ Strengths

        </h3>

        <ul className="mt-4 space-y-2">

          {result.strengths.map(

            (item: string, index: number) => (

              <li key={index}>

                • {item}

              </li>

            )

          )}

        </ul>

      </div>

      {/* Improvements */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-orange-600">

          ⚠ Improvements

        </h3>

        <ul className="mt-4 space-y-2">

          {result.improvements.map(

            (item: string, index: number) => (

              <li key={index}>

                • {item}

              </li>

            )

          )}

        </ul>

      </div>

    </div>

  );

}

function Skill({

  title,

  value

}: {

  title: string;

  value: number;

}) {

  return (

    <div>

      <div className="flex justify-between">

        <span>

          {title}

        </span>

        <span className="font-semibold">

          {value}

        </span>

      </div>

      <div className="mt-2 h-3 bg-gray-200 rounded-full">

        <div

          className="h-3 bg-indigo-600 rounded-full"

          style={{

            width: `${value}%`

          }}

        />

      </div>

    </div>

  );

}