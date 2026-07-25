"use client";

import Link from "next/link";

interface Props {
  result: any;
  track: string;
  challengeId: number;
  onRetry: () => void;
}

export default function ChallengeResult({
  result,
  track,
  challengeId,
  onRetry,
}: Props) {

  if (!result) return null;

  const score = result.overall_score;

  let xp = 20;

  if (score >= 90) xp = 100;
  else if (score >= 80) xp = 80;
  else if (score >= 70) xp = 60;
  else if (score >= 60) xp = 40;

  const completed = score >= 70;

  return (

    <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold">

        🏆 Challenge Result

      </h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* XP */}

        <div className="bg-yellow-100 rounded-2xl p-6">

          <h3 className="text-lg font-semibold">

            XP Earned

          </h3>

          <p className="text-4xl font-bold mt-3">

            +{xp}

          </p>

        </div>

        {/* Score */}

        <div className="bg-blue-100 rounded-2xl p-6">

          <h3 className="text-lg font-semibold">

            Overall Score

          </h3>

          <p className="text-4xl font-bold mt-3">

            {score}/100

          </p>

        </div>

        {/* Status */}

        <div
          className={`rounded-2xl p-6 ${
            completed
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >

          <h3 className="text-lg font-semibold">

            Status

          </h3>

          <p className="text-2xl font-bold mt-3">

            {completed
              ? "✅ Completed"
              : "❌ Retry"}

          </p>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-10">

        <button
          onClick={onRetry}
          className="px-8 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
        >
          Retry Challenge
        </button>

        {completed && (

          <Link
            href={`/challenges/${track}/${challengeId + 1}`}
          >

            <button
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Next Challenge →
            </button>

          </Link>

        )}

      </div>

    </div>

  );

}