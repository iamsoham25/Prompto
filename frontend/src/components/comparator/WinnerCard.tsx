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
  /*
   * Backend appears to return scores on a 0–10 scale.
   * Convert them to 0–100 for display.
   * If your backend already returns 0–100, this also handles it safely.
   */
  const normalizeScore = (score: number) => {
    const value = Number(score);

    if (value <= 10) {
      return Math.round(value * 10);
    }

    return Math.round(value);
  };

  const displayScoreA = normalizeScore(scoreA);
  const displayScoreB = normalizeScore(scoreB);

  const displayDifference = Math.abs(
    displayScoreB - displayScoreA
  );

  const winnerLabel =
    winner?.toLowerCase().includes("prompt a")
      ? "Prompt A"
      : winner?.toLowerCase().includes("prompt b")
      ? "Prompt B"
      : winner || "Tie";

  const isTie =
    winnerLabel === "Tie" ||
    displayScoreA === displayScoreB;

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-orange-200/70 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)]">

      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500" />

      <div className="p-6 sm:p-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
              🏆
            </div>

            <div>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Comparison Result
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Head-to-head prompt performance
              </p>

            </div>

          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            AI Analysis Complete

          </div>

        </div>


        {/* ===================================================
            SCORE COMPARISON
        =================================================== */}

        <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">

          {/* =================================================
              PROMPT A
          ================================================= */}

          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
              winnerLabel === "Prompt A" && !isTie
                ? "border-orange-300 bg-orange-50"
                : "border-slate-200 bg-slate-50/70"
            }`}
          >

            {winnerLabel === "Prompt A" && !isTie && (
              <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                Winner
              </div>
            )}

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-sm font-black text-orange-600">
                A
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  Prompt A
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  Original prompt
                </p>
              </div>

            </div>

            <div className="flex items-end gap-2">

              <span className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                {displayScoreA}
              </span>

              <span className="mb-2 text-sm font-semibold text-slate-400">
                / 100
              </span>

            </div>

            {/* Score bar */}

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-700"
                style={{
                  width: `${Math.min(displayScoreA, 100)}%`,
                }}
              />

            </div>

          </div>


          {/* =================================================
              VS / DIFFERENCE
          ================================================= */}

          <div className="flex flex-row items-center justify-center gap-3 md:flex-col">

            <div className="hidden h-full w-px bg-slate-200 md:block" />

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-black text-slate-500 shadow-sm">
              VS
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2 text-center">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Difference
              </p>

              <p
                className={`text-lg font-black ${
                  isTie
                    ? "text-slate-700"
                    : "text-violet-600"
                }`}
              >
                {isTie ? "0" : `+${displayDifference}`}
              </p>

            </div>

            <div className="hidden h-full w-px bg-slate-200 md:block" />

          </div>


          {/* =================================================
              PROMPT B
          ================================================= */}

          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
              winnerLabel === "Prompt B" && !isTie
                ? "border-violet-300 bg-violet-50"
                : "border-slate-200 bg-slate-50/70"
            }`}
          >

            {winnerLabel === "Prompt B" && !isTie && (
              <div className="absolute right-4 top-4 rounded-full bg-violet-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                Winner
              </div>
            )}

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-sm font-black text-violet-600">
                B
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  Prompt B
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  Alternative prompt
                </p>
              </div>

            </div>

            <div className="flex items-end gap-2">

              <span className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                {displayScoreB}
              </span>

              <span className="mb-2 text-sm font-semibold text-slate-400">
                / 100
              </span>

            </div>

            {/* Score bar */}

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-700"
                style={{
                  width: `${Math.min(displayScoreB, 100)}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* ===================================================
            WINNER SUMMARY
        =================================================== */}

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isTie
                  ? "bg-slate-200"
                  : "bg-emerald-100"
              }`}
            >
              {isTie ? "🤝" : "✓"}
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Result
              </p>

              <p className="text-base font-black text-slate-900">
                {isTie
                  ? "Both prompts performed equally"
                  : `${winnerLabel} is the stronger prompt`}
              </p>

            </div>

          </div>


          <div
            className={`rounded-full px-4 py-2 text-sm font-extrabold ${
              isTie
                ? "bg-slate-200 text-slate-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isTie
              ? "TIE"
              : `${displayDifference} POINT${
                  displayDifference === 1 ? "" : "S"
                } AHEAD`}
          </div>

        </div>

      </div>

    </section>
  );
}