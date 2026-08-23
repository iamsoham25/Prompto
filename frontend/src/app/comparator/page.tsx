"use client";

import { useState } from "react";

import API from "@/services/api";

import WinnerCard from "@/components/comparator/WinnerCard";
import ComparisonTable from "@/components/comparator/ComparisonTable";
import SuggestionCard from "@/components/comparator/SuggestionCard";

export default function ComparatorPage() {
  const [promptA, setPromptA] = useState("");
  const [promptB, setPromptB] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const comparePrompts = async () => {
    if (!promptA.trim() || !promptB.trim()) {
      alert("Please enter both prompts.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/compare-prompts", {
        prompt_a: promptA,
        prompt_b: promptB,
      });

      setResult(res.data.comparison);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while comparing the prompts.");
    } finally {
      setLoading(false);
    }
  };

  const clearPrompts = () => {
    setPromptA("");
    setPromptB("");
    setResult(null);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-950">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 lg:px-10">

        {/* Background decoration */}

        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-300/20 blur-[120px]" />

        <div className="pointer-events-none absolute right-[-120px] top-20 h-[420px] w-[420px] rounded-full bg-fuchsia-300/20 blur-[130px]" />

        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-300/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">

          {/* Small badge */}

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600 shadow-sm backdrop-blur">

            <span className="h-2 w-2 rounded-full bg-orange-500" />

            Prompt Comparison Studio

          </div>

          {/* Heading */}

          <div className="max-w-4xl">

            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              Compare.

              <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">

                Decide.

              </span>

              <span className="block text-slate-950">

                Build the better prompt.

              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">

              Put two prompts head-to-head and discover which one delivers
              stronger clarity, context, structure, constraints and overall
              prompt quality.

            </p>

          </div>

          {/* Feature pills */}

          <div className="mt-8 flex flex-wrap gap-3">

            {[
              "⚔️ Side-by-side",
              "📊 Score comparison",
              "🎯 Skill breakdown",
              "💡 AI suggestions",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm"
              >
                {item}
              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          COMPARISON WORKSPACE
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10">

        <div className="relative mx-auto max-w-7xl">

          {/* Top gradient line */}

          <div className="absolute left-8 right-8 top-0 h-[3px] rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500" />

          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)]">

            {/* Workspace header */}

            <div className="border-b border-slate-100 px-6 py-7 sm:px-9">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-500">

                    Comparison workspace

                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">

                    Put your prompts to the test.

                  </h2>

                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">

                  2 prompts required

                </div>

              </div>

            </div>


            {/* Prompt editors */}

            <div className="relative grid gap-0 lg:grid-cols-2">

              {/* ================= PROMPT A ================= */}

              <div className="relative p-6 sm:p-9 lg:border-r lg:border-slate-100">

                {/* Prompt label */}

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-600">

                      A

                    </div>

                    <div>

                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-500">

                        Prompt A

                      </p>

                      <h3 className="mt-0.5 text-xl font-black">

                        First version

                      </h3>

                    </div>

                  </div>

                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">

                    {promptA.length} chars

                  </span>

                </div>

                {/* Editor */}

                <div className="group relative rounded-[24px] border border-orange-100 bg-gradient-to-b from-orange-50/60 to-white p-2 transition-all duration-300 focus-within:border-orange-300 focus-within:shadow-[0_15px_40px_rgba(249,115,22,0.10)]">

                  <textarea
                    value={promptA}
                    onChange={(e) => setPromptA(e.target.value)}
                    placeholder="Write your first prompt..."
                    className="h-72 w-full resize-none rounded-[18px] border-0 bg-transparent p-5 text-[16px] leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                  />

                </div>

                {/* Footer */}

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">

                  <span>💡</span>

                  <span>Try your original or less-refined prompt here.</span>

                </div>

              </div>


              {/* ================= VS DIVIDER ================= */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">

                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-orange-500 via-pink-500 to-violet-600 text-sm font-black text-white shadow-[0_10px_35px_rgba(168,85,247,0.35)]">

                  VS

                </div>

              </div>


              {/* ================= PROMPT B ================= */}

              <div className="relative border-t border-slate-100 p-6 sm:p-9 lg:border-t-0">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-lg font-black text-violet-600">

                      B

                    </div>

                    <div>

                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-500">

                        Prompt B

                      </p>

                      <h3 className="mt-0.5 text-xl font-black">

                        Alternative version

                      </h3>

                    </div>

                  </div>

                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">

                    {promptB.length} chars

                  </span>

                </div>

                <div className="group relative rounded-[24px] border border-violet-100 bg-gradient-to-b from-violet-50/60 to-white p-2 transition-all duration-300 focus-within:border-violet-300 focus-within:shadow-[0_15px_40px_rgba(139,92,246,0.10)]">

                  <textarea
                    value={promptB}
                    onChange={(e) => setPromptB(e.target.value)}
                    placeholder="Write your second prompt..."
                    className="h-72 w-full resize-none rounded-[18px] border-0 bg-transparent p-5 text-[16px] leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                  />

                </div>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">

                  <span>✨</span>

                  <span>Try an improved or alternative prompt here.</span>

                </div>

              </div>

            </div>


            {/* =====================================================
                ACTION BAR
            ===================================================== */}

            <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-6 sm:px-9">

              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                <div className="text-center sm:text-left">

                  <p className="text-sm font-bold text-slate-700">

                    Ready to compare?

                  </p>

                  <p className="mt-1 text-xs text-slate-400">

                    AI will evaluate both prompts across multiple dimensions.

                  </p>

                </div>

                <div className="flex w-full gap-3 sm:w-auto">

                  <button
                    onClick={clearPrompts}
                    disabled={loading}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Clear
                  </button>

                  <button
                    onClick={comparePrompts}
                    disabled={loading}
                    className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(236,72,153,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(236,72,153,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                  >

                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                    <span className="relative">

                      {loading
                        ? "⚡ Comparing..."
                        : "⚔️ Compare Prompts"}

                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          RESULT SECTION
      ========================================================= */}

      {result && (
        <section className="px-5 pb-24 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-7xl">

            {/* Result heading */}

            <div className="mb-8">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600">

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                Analysis complete

              </div>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">

                Here&apos;s how they compare.

              </h2>

              <p className="mt-3 max-w-2xl text-slate-500">

                Review the winner, category-level performance and AI-generated
                recommendations.

              </p>

            </div>


            {/* Existing result components */}

            <div className="space-y-8">

              <WinnerCard
                winner={result.winner}
                scoreA={result.prompt_a_score}
                scoreB={result.prompt_b_score}
                difference={result.score_difference}
              />

              <ComparisonTable
                comparison={result.comparison}
              />

              <SuggestionCard
                reasons={result.reasons}
                suggestions={result.suggestions}
              />

            </div>

          </div>

        </section>
      )}


      {/* =========================================================
          BOTTOM INFO
      ========================================================= */}

      {!result && (
        <section className="px-5 pb-20 sm:px-8 lg:px-10">

          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">

            {[
              {
                icon: "🎯",
                title: "Compare quality",
                text: "Evaluate both prompts across important engineering dimensions.",
              },
              {
                icon: "🏆",
                title: "Find the winner",
                text: "See which prompt achieves the stronger overall score.",
              },
              {
                icon: "💡",
                title: "Learn & improve",
                text: "Use the comparison insights to create stronger prompts.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">

                  {item.icon}

                </div>

                <h3 className="text-lg font-black">

                  {item.title}

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">

                  {item.text}

                </p>

              </div>
            ))}

          </div>

        </section>
      )}

    </main>
  );
}