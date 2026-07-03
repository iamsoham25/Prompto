"use client";

interface WinnerCardProps {
  winner: string;
  scoreA: number;
  scoreB: number;
  difference: number;
}

export default function WinnerCard({
  winner,
  scoreA,
  scoreB,
  difference,
}: WinnerCardProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl">

      <h2 className="text-3xl font-bold mb-6">
        🏆 Comparison Result
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/20 rounded-2xl p-6 text-center">
          <p className="text-sm opacity-80">Prompt A</p>

          <h3 className="text-5xl font-bold mt-2">
            {Math.round(scoreA * 10)}
          </h3>

          <p className="mt-2 text-sm">/100</p>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center text-slate-900">

          <p className="text-lg font-semibold">
            Winner
          </p>

          <h3 className="text-4xl font-bold text-orange-500 mt-3">
            {winner}
          </h3>

          <p className="mt-4 text-slate-600">
            Difference
          </p>

          <h2 className="text-3xl font-bold">
            +{Math.round(difference * 10)}
          </h2>

        </div>

        <div className="bg-white/20 rounded-2xl p-6 text-center">

          <p className="text-sm opacity-80">
            Prompt B
          </p>

          <h3 className="text-5xl font-bold mt-2">
            {Math.round(scoreB * 10)}
          </h3>

          <p className="mt-2 text-sm">
            /100
          </p>

        </div>

      </div>

    </div>
  );
}