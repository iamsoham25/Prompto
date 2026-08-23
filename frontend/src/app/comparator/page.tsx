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
      console.error(error);
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
    <main className="min-h-screen bg-[#f8f9fc] text-[#0b1024]">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-orange-200/20 blur-[140px]" />

        <div className="absolute right-[-180px] top-20 h-[520px] w-[520px] rounded-full bg-violet-200/20 blur-[150px]" />

        <div className="absolute left-1/2 top-[700px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-pink-200/10 blur-[130px]" />
      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="px-5 pb-8 pt-9 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.07)]">

            {/* accent line */}

            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600" />

            <div className="px-7 py-9 sm:px-10 lg:px-14 lg:py-11">

              {/* label */}

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-orange-500" />

                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-orange-600">
                  Prompt Comparison Studio
                </span>

              </div>


              {/* heading */}

              <div className="max-w-4xl">

                <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[64px]">

                  Compare.

                  <br />

                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                    Decide.
                  </span>

                  {" "}Build better prompts.

                </h1>

                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-500 sm:text-lg">
                  Put two prompts head-to-head and discover which one delivers
                  stronger clarity, context, structure, constraints and overall
                  prompt quality.
                </p>

              </div>


              {/* feature pills */}

              <div className="mt-7 flex flex-wrap gap-3">

                <FeaturePill
                  icon="⚔️"
                  label="Side-by-side"
                />

                <FeaturePill
                  icon="📊"
                  label="7 dimensions"
                />

                <FeaturePill
                  icon="🏆"
                  label="Winner detection"
                />

                <FeaturePill
                  icon="💡"
                  label="AI reasoning"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMPARISON WORKSPACE
      ===================================================== */}

      <section className="px-5 pb-12 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)]">

            {/* workspace header */}

            <div className="border-b border-slate-100 px-7 py-6 sm:px-9">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-violet-500">
                    Comparison Workspace
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                    Put your prompts to the test.
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Give the AI two versions and let it analyze the difference.
                  </p>

                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
                  2 prompts required
                </div>

              </div>

            </div>


            {/* prompt editors */}

            <div className="grid lg:grid-cols-[1fr_auto_1fr]">

              {/* =================================================
                  PROMPT A
              ================================================= */}

              <PromptEditor
                letter="A"
                label="Prompt A"
                description="Original version"
                value={promptA}
                onChange={setPromptA}
                placeholder="Write your first prompt here..."
                variant="orange"
              />


              {/* =================================================
                  CENTER VS
              ================================================= */}

              <div className="relative hidden items-center justify-center lg:flex">

                <div className="absolute inset-y-8 w-px bg-slate-100" />

                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#0b1024] text-xs font-black text-white shadow-[0_10px_30px_rgba(15,23,42,0.20)]">
                  VS
                </div>

              </div>


              {/* mobile VS */}

              <div className="flex items-center gap-4 px-7 lg:hidden">

                <div className="h-px flex-1 bg-slate-200" />

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b1024] text-[10px] font-black text-white">
                  VS
                </div>

                <div className="h-px flex-1 bg-slate-200" />

              </div>


              {/* =================================================
                  PROMPT B
              ================================================= */}

              <PromptEditor
                letter="B"
                label="Prompt B"
                description="Alternative version"
                value={promptB}
                onChange={setPromptB}
                placeholder="Write your second prompt here..."
                variant="violet"
              />

            </div>


            {/* =================================================
                ACTION BAR
            ================================================= */}

            <div className="border-t border-slate-100 bg-[#fafbfe] px-7 py-6 sm:px-9">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                    ✨
                  </div>

                  <div>

                    <p className="text-sm font-black text-slate-800">
                      Ready to compare?
                    </p>

                    <p className="text-xs text-slate-400">
                      AI will evaluate both prompts across multiple dimensions.
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <button
                    onClick={clearPrompts}
                    disabled={loading}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                  >
                    Clear
                  </button>

                  <button
                    onClick={comparePrompts}
                    disabled={loading}
                    className="rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-7 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(236,72,153,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(236,72,153,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "⚡ Comparing..."
                      : "⚔️ Compare Prompts"}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT WILL BE COMPARED
      ===================================================== */}

      {!result && (

        <section className="px-5 pb-20 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-7xl">

            <div className="mb-5">

              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                What AI checks
              </p>

              <h2 className="mt-1 text-2xl font-black">
                Seven dimensions of prompt quality.
              </h2>

            </div>


            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">

              {[
                ["✨", "Clarity"],
                ["🎯", "Specificity"],
                ["🧠", "Context"],
                ["📐", "Constraints"],
                ["👤", "Role"],
                ["📄", "Output"],
                ["💡", "Examples"],
              ].map(([icon, label]) => (

                <div
                  key={label}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
                >

                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-lg transition group-hover:bg-violet-50">
                    {icon}
                  </div>

                  <p className="mt-3 text-xs font-extrabold text-slate-600">
                    {label}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          RESULTS
      ===================================================== */}

      {result && (

        <section className="px-5 pb-24 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-7xl">

            {/* result intro */}

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-600">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  Analysis complete

                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Here&apos;s how they compare.
                </h2>

              </div>

              <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
                Review the winner, category-level performance and
                AI-generated recommendations.
              </p>

            </div>


            <div className="space-y-7">

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

    </main>
  );
}


/* =============================================================
   FEATURE PILL
============================================================= */

function FeaturePill({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm">
      <span>{icon}</span>
      {label}
    </div>
  );
}


/* =============================================================
   PROMPT EDITOR
============================================================= */

function PromptEditor({
  letter,
  label,
  description,
  value,
  onChange,
  placeholder,
  variant,
}: {
  letter: string;
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  variant: "orange" | "violet";
}) {
  const isOrange = variant === "orange";

  return (
    <div className="p-7 sm:p-9">

      {/* editor heading */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${
              isOrange
                ? "bg-orange-100 text-orange-600"
                : "bg-violet-100 text-violet-600"
            }`}
          >
            {letter}
          </div>

          <div>

            <p
              className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${
                isOrange ? "text-orange-500" : "text-violet-500"
              }`}
            >
              {label}
            </p>

            <p className="mt-0.5 text-sm font-black text-slate-800">
              {description}
            </p>

          </div>

        </div>


        <span className="text-xs font-bold text-slate-400">
          {value.length} chars
        </span>

      </div>


      {/* textarea */}

      <div
        className={`rounded-[22px] border p-1.5 transition duration-300 ${
          isOrange
            ? "border-orange-100 bg-orange-50/40 focus-within:border-orange-300 focus-within:bg-orange-50/60"
            : "border-violet-100 bg-violet-50/40 focus-within:border-violet-300 focus-within:bg-violet-50/60"
        }`}
      >

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-64 w-full resize-none rounded-[17px] border-0 bg-white/70 p-5 text-[15px] leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
        />

      </div>


      {/* helper */}

      <div className="mt-3 flex items-center justify-between">

        <p className="text-xs text-slate-400">
          {value.length === 0
            ? "Start writing your prompt..."
            : "Prompt ready for comparison"}
        </p>

        <span
          className={`h-2 w-2 rounded-full ${
            value.trim()
              ? isOrange
                ? "bg-orange-500"
                : "bg-violet-500"
              : "bg-slate-300"
          }`}
        />

      </div>

    </div>
  );
}