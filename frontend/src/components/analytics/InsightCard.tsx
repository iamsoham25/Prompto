"use client";

interface InsightCardProps {
  strongest: string;
  weakest: string;
  recommendation: string;
}

export default function InsightCard({
  strongest,
  weakest,
  recommendation,
}: InsightCardProps) {
  return (
    <section className="relative h-full min-h-[700px] overflow-hidden rounded-[32px] border border-purple-500/20 bg-[#08030f] p-8 shadow-[0_25px_70px_rgba(30,10,55,0.22)] sm:p-10">

      {/* BACKGROUND GLOWS */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 left-10 h-72 w-72 rounded-full bg-pink-600/10 blur-[100px]" />

      <div className="relative z-10">

        {/* HEADER */}

        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-pink-400">
          AI Intelligence
        </p>

        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Your prompt strategy.
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
          Personalized insights generated from your actual prompt evaluation data.
        </p>

        {/* STACKED CARDS */}

        <div className="relative z-10 mt-10 space-y-6">

          {/* STRONGEST */}

          <div className="group rounded-[24px] border border-emerald-500/20 bg-emerald-500/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-500/[0.09] hover:shadow-[0_15px_40px_rgba(16,185,129,0.10)]">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-3xl">
                💪
              </div>

              <div className="min-w-0">

                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-400">
                  Strongest Skill
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  {strongest}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Your strongest prompt engineering dimension.
                </p>

              </div>

            </div>

          </div>

          {/* FOCUS AREA */}

          <div className="group rounded-[24px] border border-red-500/20 bg-red-500/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-red-500/[0.08] hover:shadow-[0_15px_40px_rgba(239,68,68,0.10)]">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 text-3xl">
                🎯
              </div>

              <div className="min-w-0">

                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
                  Focus Area
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  {weakest}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Improving this area can raise your overall score.
                </p>

              </div>

            </div>

          </div>

          {/* RECOMMENDATION */}

          <div className="group rounded-[24px] border border-purple-500/20 bg-purple-500/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-purple-500/[0.10] hover:shadow-[0_15px_40px_rgba(168,85,247,0.12)]">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-purple-400/20 bg-purple-400/10 text-3xl">
                💡
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-purple-400">
                  Recommendation
                </p>

                <p className="mt-2 text-base leading-7 text-slate-300 sm:text-lg">
                  {recommendation}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}