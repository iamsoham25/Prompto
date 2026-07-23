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

    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">

        🧠 AI Insights

      </h2>

      <div className="space-y-6">

        <div className="bg-green-50 rounded-2xl p-5">

          <p className="text-sm text-slate-500">

            Strongest Skill

          </p>

          <h3 className="text-2xl font-bold text-green-700">

            💪 {strongest}

          </h3>

        </div>

        <div className="bg-red-50 rounded-2xl p-5">

          <p className="text-sm text-slate-500">

            Weakest Skill

          </p>

          <h3 className="text-2xl font-bold text-red-700">

            🎯 {weakest}

          </h3>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-5">

          <p className="text-sm text-slate-500">

            AI Recommendation

          </p>

          <p className="mt-2 text-lg font-medium">

            💡 {recommendation}

          </p>

        </div>

      </div>

    </div>

  );

}