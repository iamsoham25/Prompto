"use client";

import Link from "next/link";

interface Props {
  result: any;
  track: string;
  challengeId: number;
  onRetry: () => void;

  challengeXP: number;
  passScore: number;
  bonusScore: number;
  bonusXP: number;
}

export default function ChallengeResult({
  result,
  track,
  challengeId,
  onRetry,
  challengeXP,
  passScore,
  bonusScore,
  bonusXP,
}: Props) {
  if (!result) return null;

  const score = Math.round(Number(result.overall_score) || 0);

  const completed = score >= passScore;
  const bonusEarned = score >= bonusScore;

  let earnedXP = Math.floor(challengeXP * 0.4);

  if (completed) {
    earnedXP = challengeXP;
  }

  if (bonusEarned) {
    earnedXP = challengeXP + bonusXP;
  }

  return (
    <section className="rounded-[28px] bg-white border border-slate-200 shadow-sm overflow-hidden">

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className={`p-7 sm:p-9 border-b ${
          completed
            ? "border-emerald-100 bg-emerald-50/40"
            : "border-orange-100 bg-orange-50/40"
        }`}
      >

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl ${
                completed
                  ? "bg-emerald-100"
                  : "bg-orange-100"
              }`}
            >
              {completed ? "🏆" : "🔁"}
            </div>

            <div>

              <p
                className={`text-xs font-bold uppercase tracking-[0.16em] ${
                  completed
                    ? "text-emerald-600"
                    : "text-orange-600"
                }`}
              >
                Challenge Outcome
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-950">
                {completed
                  ? "Challenge Completed"
                  : "Keep Improving"}
              </h2>

            </div>

          </div>

          <div
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              completed
                ? "bg-emerald-100 text-emerald-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {completed ? "✓ Passed" : "Retry Available"}
          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* STATS                                                  */}
      {/* ====================================================== */}

      <div className="p-7 sm:p-9">

        <div className="grid md:grid-cols-3 gap-4">

          {/* XP */}

          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">

            <p className="text-sm font-semibold text-slate-500">
              XP Earned
            </p>

            <p className="mt-2 text-4xl font-extrabold text-orange-600">
              +{earnedXP}
            </p>

            {bonusEarned && (
              <p className="mt-2 text-sm font-semibold text-purple-600">
                ⭐ Includes +{bonusXP} bonus XP
              </p>
            )}

          </div>

          {/* SCORE */}

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">

            <p className="text-sm font-semibold text-slate-500">
              Overall Score
            </p>

            <p className="mt-2 text-4xl font-extrabold text-purple-600">
              {score}/100
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Pass mark: {passScore}
            </p>

          </div>

          {/* STATUS */}

          <div
            className={`rounded-2xl border p-6 ${
              completed
                ? "border-emerald-100 bg-emerald-50"
                : "border-red-100 bg-red-50"
            }`}
          >

            <p className="text-sm font-semibold text-slate-500">
              Status
            </p>

            <p
              className={`mt-2 text-2xl font-extrabold ${
                completed
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {completed
                ? "Completed"
                : "Not Passed"}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {completed
                ? "Great work! Progress has been recorded."
                : `Reach ${passScore}+ to complete this challenge.`}
            </p>

          </div>

        </div>

        {/* ==================================================== */}
        {/* SCORE MESSAGE                                        */}
        {/* ==================================================== */}

        <div
          className={`mt-6 rounded-2xl border p-5 ${
            completed
              ? "border-emerald-100 bg-emerald-50"
              : "border-orange-100 bg-orange-50"
          }`}
        >

          <div className="flex gap-4">

            <div className="text-2xl">
              {completed ? "🎉" : "💡"}
            </div>

            <div>

              <h3 className="font-extrabold text-slate-950">
                {completed
                  ? bonusEarned
                    ? "Excellent! You earned the bonus reward."
                    : "You passed the challenge!"
                  : "You're close — give it another try."}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {completed
                  ? bonusEarned
                    ? `You reached ${bonusScore}+ and earned the additional ${bonusXP} XP bonus.`
                    : `You reached the ${passScore} passing score. Improve your prompt further to reach ${bonusScore}+ for the bonus.`
                  : `Your score was ${score}. Strengthen the areas identified above and try again.`}
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================== */}
        {/* BUTTONS                                              */}
        {/* ==================================================== */}

        <div className="mt-7 flex flex-col sm:flex-row gap-3">

          <button
            onClick={onRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            🔄 Retry Challenge
          </button>

          {completed && (
            <Link
              href={`/challenges/${track}/${challengeId + 1}`}
              className="flex-1"
            >
              <button
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:from-purple-700 hover:to-indigo-700"
              >
                Next Challenge
                <span>→</span>
              </button>
            </Link>
          )}

        </div>

      </div>

    </section>
  );
}