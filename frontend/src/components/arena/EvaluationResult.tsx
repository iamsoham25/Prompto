"use client";

interface Props {
  result: any;
}

export default function EvaluationResult({ result }: Props) {
  if (!result) return null;

  const score = Math.round(Number(result.overall_score) || 0);

  const progressColor =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
      ? "bg-amber-500"
      : "bg-red-500";

  const scoreText =
    score >= 80
      ? "Strong prompt"
      : score >= 60
      ? "Good foundation"
      : "Needs improvement";

  const skills = [
    {
      title: "Clarity",
      value: Number(result.clarity) || 0,
    },
    {
      title: "Specificity",
      value: Number(result.specificity) || 0,
    },
    {
      title: "Context",
      value: Number(result.context) || 0,
    },
    {
      title: "Constraints",
      value: Number(result.constraints) || 0,
    },
    {
      title: "Role",
      value: Number(result.role) || 0,
    },
    {
      title: "Output Format",
      value: Number(result.output_format) || 0,
    },
    {
      title: "Examples",
      value: Number(result.examples) || 0,
    },
  ];

  const strengths = Array.isArray(result.strengths)
    ? result.strengths
    : [];

  const improvements = Array.isArray(result.improvements)
    ? result.improvements
    : [];

  return (
    <section className="rounded-[28px] bg-white border border-slate-200 shadow-sm overflow-hidden">

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div className="p-7 sm:p-9 border-b border-slate-100">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl">
              🤖
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">
                AI Analysis
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-950">
                Prompt Evaluation
              </h2>

            </div>

          </div>

          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
              score >= 80
                ? "bg-emerald-50 text-emerald-600"
                : score >= 60
                ? "bg-amber-50 text-amber-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {scoreText}
          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* SCORE                                                  */}
      {/* ====================================================== */}

      <div className="p-7 sm:p-9">

        <div className="rounded-[24px] bg-slate-50 border border-slate-200 p-6 sm:p-7">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div>

              <p className="text-sm font-semibold text-slate-500">
                Overall Score
              </p>

              <div className="mt-2 flex items-baseline gap-2">

                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-950">
                  {score}
                </span>

                <span className="text-lg font-semibold text-slate-400">
                  /100
                </span>

              </div>

            </div>

            <div className="text-sm font-semibold text-slate-500">
              AI prompt quality assessment
            </div>

          </div>

          <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-slate-200">

            <div
              className={`h-full rounded-full ${progressColor} transition-all duration-700`}
              style={{
                width: `${Math.min(Math.max(score, 0), 100)}%`,
              }}
            />

          </div>

        </div>

        {/* ==================================================== */}
        {/* SKILLS                                               */}
        {/* ==================================================== */}

        <div className="mt-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Skill Breakdown
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                How your prompt performed
              </h3>

            </div>

          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-4">

            {skills.map((skill) => (
              <Skill
                key={skill.title}
                title={skill.title}
                value={skill.value}
              />
            ))}

          </div>

        </div>

        {/* ==================================================== */}
        {/* STRENGTHS + IMPROVEMENTS                              */}
        {/* ==================================================== */}

        <div className="mt-8 grid lg:grid-cols-2 gap-6">

          {/* Strengths */}

          <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/60 p-6">

            <div className="flex items-center gap-3">

              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                ✓
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  What worked
                </p>

                <h3 className="mt-0.5 text-xl font-extrabold text-slate-950">
                  Strengths
                </h3>
              </div>

            </div>

            <div className="mt-5 space-y-3">

              {strengths.length > 0 ? (
                strengths.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-white border border-emerald-100 p-4"
                  >
                    <span className="mt-0.5 text-emerald-500 font-bold">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No specific strengths were returned.
                </p>
              )}

            </div>

          </div>

          {/* Improvements */}

          <div className="rounded-[22px] border border-orange-100 bg-orange-50/60 p-6">

            <div className="flex items-center gap-3">

              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                ⚡
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Next improvement
                </p>

                <h3 className="mt-0.5 text-xl font-extrabold text-slate-950">
                  Areas to improve
                </h3>
              </div>

            </div>

            <div className="mt-5 space-y-3">

              {improvements.length > 0 ? (
                improvements.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-white border border-orange-100 p-4"
                  >
                    <span className="mt-0.5 text-orange-500 font-bold">
                      →
                    </span>

                    <p className="text-sm leading-6 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No specific improvements were returned.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function Skill({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  const barColor =
    safeValue >= 80
      ? "bg-emerald-500"
      : safeValue >= 60
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center justify-between gap-4">

        <span className="text-sm font-semibold text-slate-700">
          {title}
        </span>

        <span className="text-sm font-extrabold text-slate-950">
          {safeValue}
        </span>

      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">

        <div
          className={`h-full rounded-full ${barColor} transition-all duration-700`}
          style={{
            width: `${safeValue}%`,
          }}
        />

      </div>

    </div>
  );
}