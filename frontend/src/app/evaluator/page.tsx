"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

interface Evaluation {
  overall_score: number;
  clarity: number;
  specificity: number;
  context: number;
  constraints: number;
  role: number;
  output_format: number;
  examples: number;
  difficulty: string;
  strengths: string[];
  improvements: string[];
  summary: string;
}

export default function EvaluatorPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const router = useRouter();

  const evaluatePrompt = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);

      const email = localStorage.getItem("userEmail");

      const response = await API.post("/evaluate-prompt", {
        prompt,
        user_email: email,
      });

      if (response.data.success) {
        setEvaluation(response.data.evaluation);

        setTimeout(() => {
          document
            .getElementById("evaluation-results")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 150);
      }
    } catch (error) {
      console.error("Evaluation error:", error);
      alert("Evaluation Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getQuality = (score: number) => {
    if (score >= 85) {
      return {
        label: "Excellent",
        description: "Outstanding prompt structure",
      };
    }

    if (score >= 70) {
      return {
        label: "Good",
        description: "Strong foundation with room to refine",
      };
    }

    if (score >= 50) {
      return {
        label: "Average",
        description: "Several areas can be improved",
      };
    }

    return {
      label: "Needs Improvement",
      description: "Significant refinement recommended",
    };
  };

  const getScoreGradient = (value: number) => {
    if (value >= 80) {
      return "from-emerald-400 to-teal-500";
    }

    if (value >= 60) {
      return "from-blue-500 to-indigo-500";
    }

    if (value >= 40) {
      return "from-amber-400 to-orange-500";
    }

    return "from-red-400 to-pink-500";
  };

  function MetricCard({
    title,
    value,
    icon,
  }: {
    title: string;
    value: number;
    icon: string;
  }) {
    return (
      <div className="group rounded-[24px] border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-xl shadow-sm">
              {icon}
            </div>

            <span className="font-bold text-slate-800">
              {title}
            </span>
          </div>

          <span className="text-2xl font-black text-slate-950">
            {value}
          </span>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(
              value
            )} transition-all duration-700`}
            style={{
              width: `${Math.max(0, Math.min(value, 100))}%`,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    );
  }

  const quality = evaluation
    ? getQuality(evaluation.overall_score)
    : null;

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-950">

      {/* ============================================================
          HERO
      ============================================================ */}

      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">

          <div className="max-w-4xl">

            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 backdrop-blur-md">
              <span className="text-sm">🧠</span>

              <span className="text-xs font-extrabold uppercase tracking-[0.2em]">
                AI Prompt Intelligence
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Evaluate.
              <br />

              <span className="text-orange-300">
                Improve.
              </span>

              <br />

              Master your prompts.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
              Analyze your prompts across clarity, specificity,
              context, constraints, role definition, output format
              and examples.
            </p>

            {/* Feature pills */}

            <div className="mt-7 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                ✦ 7 Skill Dimensions
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                ✦ AI Evaluation
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                ✦ Instant Feedback
              </span>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">

        {/* ============================================================
            WORKSPACE
        ============================================================ */}

        <section className="-mt-8 relative z-10 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">

          {/* top accent */}

          <div className="absolute left-10 right-10 top-0 h-1 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-600">
                Prompt Workspace
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Analyze your prompt
              </h2>

              <p className="mt-2 max-w-2xl text-slate-500">
                Paste your prompt below and let Prompto identify
                its strengths and improvement areas.
              </p>

            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
              {prompt.length} characters
            </div>

          </div>

          {/* textarea */}

          <div className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-[#fafbff] transition-all focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-100">

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={9}
              placeholder="Example: Act as a senior data scientist. Analyze this dataset, identify the key patterns and anomalies, and present your findings in a structured table..."
              className="min-h-[240px] w-full resize-none bg-transparent p-6 text-base leading-7 text-slate-800 outline-none placeholder:text-slate-400 sm:p-7 sm:text-lg"
            />

            <div className="flex flex-col gap-4 border-t border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex flex-wrap gap-2">

                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                  💡 Be specific
                </span>

                <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
                  🎯 Define your goal
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                  📋 Define output
                </span>

              </div>

              <button
                onClick={evaluatePrompt}
                disabled={loading}
                className="rounded-2xl bg-orange-500 px-8 py-3.5 font-bold text-white shadow-[0_10px_25px_rgba(249,115,22,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-[0_16px_30px_rgba(249,115,22,0.30)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "🤖 Evaluating..."
                  : "🚀 Evaluate Prompt"}
              </button>

            </div>
          </div>
        </section>

        {/* ============================================================
            LOADING
        ============================================================ */}

        {loading && (
          <section className="mt-8 rounded-[28px] border border-purple-100 bg-white p-8 text-center shadow-[0_15px_40px_rgba(15,23,42,0.06)]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">

              <div className="h-7 w-7 animate-spin rounded-full border-4 border-white/30 border-t-white" />

            </div>

            <h3 className="mt-5 text-xl font-black">
              AI is analyzing your prompt
            </h3>

            <p className="mt-2 text-slate-500">
              Checking seven prompt engineering dimensions...
            </p>

          </section>
        )}

        {/* ============================================================
            RESULTS
        ============================================================ */}

        {evaluation && (
          <div
            id="evaluation-results"
            className="mt-12 space-y-8 scroll-mt-28"
          >

            {/* SCORE */}

            <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_55px_rgba(15,23,42,0.07)] sm:p-10">

              <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-100/50 blur-[90px]" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-600">
                    AI Evaluation Result
                  </p>

                  <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                    Prompt Quality
                  </h2>

                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
                    Your prompt has been evaluated across seven
                    core prompt engineering dimensions.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">
                      ✓ {quality?.label}
                    </span>

                    <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-bold text-purple-600">
                      🏆 {evaluation.difficulty}
                    </span>

                  </div>

                </div>

                {/* Score */}

                <div className="flex justify-center">

                  <div className="relative flex h-56 w-56 items-center justify-center">

                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          #f97316 0deg,
                          #ec4899 ${
                            evaluation.overall_score * 3.6
                          }deg,
                          #eef2f7 ${
                            evaluation.overall_score * 3.6
                          }deg 360deg
                        )`,
                      }}
                    />

                    <div className="absolute inset-[12px] flex items-center justify-center rounded-full bg-white">

                      <div className="text-center">

                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-400">
                          Score
                        </p>

                        <div className="mt-1 text-6xl font-black text-slate-950">
                          {evaluation.overall_score}
                        </div>

                        <p className="text-sm font-bold text-slate-400">
                          / 100
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* QUALITY */}

            <div className="grid gap-6 md:grid-cols-2">

              <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">

                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-600">
                  Quality Level
                </p>

                <div className="mt-5 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
                    🎯
                  </div>

                  <div>

                    <h3 className="text-2xl font-black">
                      {quality?.label}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {quality?.description}
                    </p>

                  </div>

                </div>

              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">

                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">
                  Prompt Difficulty
                </p>

                <div className="mt-5 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                    🏆
                  </div>

                  <div>

                    <h3 className="text-2xl font-black">
                      {evaluation.difficulty}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Based on prompt complexity and structure.
                    </p>

                  </div>

                </div>

              </section>

            </div>

            {/* METRICS */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-600">
                Skill Intelligence
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Prompt Metrics
              </h2>

              <p className="mt-2 text-slate-500">
                Detailed performance across the seven dimensions.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                <MetricCard
                  title="Clarity"
                  value={evaluation.clarity}
                  icon="💡"
                />

                <MetricCard
                  title="Specificity"
                  value={evaluation.specificity}
                  icon="🎯"
                />

                <MetricCard
                  title="Context"
                  value={evaluation.context}
                  icon="🧩"
                />

                <MetricCard
                  title="Constraints"
                  value={evaluation.constraints}
                  icon="🔒"
                />

                <MetricCard
                  title="Role Definition"
                  value={evaluation.role}
                  icon="👤"
                />

                <MetricCard
                  title="Output Format"
                  value={evaluation.output_format}
                  icon="📋"
                />

                <MetricCard
                  title="Examples"
                  value={evaluation.examples}
                  icon="📝"
                />

              </div>
            </section>

            {/* STRENGTHS / IMPROVEMENTS */}

            <div className="grid gap-7 lg:grid-cols-2">

              <section className="rounded-[32px] border border-emerald-200 bg-white p-8 shadow-sm">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                    💪
                  </div>

                  <div>

                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600">
                      What you did well
                    </p>

                    <h2 className="mt-1 text-3xl font-black">
                      Strengths
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-3">

                  {evaluation.strengths?.length > 0 ? (
                    evaluation.strengths.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                            ✓
                          </span>

                          <p className="text-sm leading-6 text-slate-700">
                            {item}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-slate-500">
                      No specific strengths detected.
                    </p>
                  )}

                </div>

              </section>

              <section className="rounded-[32px] border border-orange-200 bg-white p-8 shadow-sm">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                    🎯
                  </div>

                  <div>

                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                      Next improvements
                    </p>

                    <h2 className="mt-1 text-3xl font-black">
                      Focus Areas
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-3">

                  {evaluation.improvements?.length > 0 ? (
                    evaluation.improvements.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="flex gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            →
                          </span>

                          <p className="text-sm leading-6 text-slate-700">
                            {item}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-slate-500">
                      Excellent prompt. No major improvements detected.
                    </p>
                  )}

                </div>

              </section>

            </div>

            {/* SUMMARY */}

            <section className="rounded-[32px] border border-purple-200 bg-white p-8 shadow-sm sm:p-10">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-2xl shadow-lg">
                  🤖
                </div>

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-600">
                    AI Intelligence
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    Evaluation Summary
                  </h2>

                </div>

              </div>

              <div className="mt-7 rounded-[24px] bg-slate-50 p-6 sm:p-8">

                <p className="text-base leading-8 text-slate-700 sm:text-lg">
                  {evaluation.summary ||
                    `This prompt has an overall quality score of ${evaluation.overall_score}/100.`}
                </p>

              </div>

            </section>

            {/* ACTIONS */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">
                Next Steps
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Continue Improving
              </h2>

              <p className="mt-2 text-slate-500">
                Use your evaluation to improve your prompt engineering skills.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(evaluation, null, 2)
                    );
                  }}
                  className="rounded-2xl bg-emerald-500 px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-emerald-600"
                >
                  📋 Copy Evaluation
                </button>

                <button
                  onClick={() => router.push("/improver")}
                  className="rounded-2xl bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-orange-600"
                >
                  ✨ Improve Prompt
                </button>

                <button
                  onClick={() => {
                    setEvaluation(null);
                    setPrompt("");

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:-translate-y-1 hover:shadow-md"
                >
                  🔄 Evaluate Another
                </button>

              </div>

            </section>

          </div>
        )}

      </div>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white py-10 text-center">

        <p className="text-sm font-medium text-slate-400">
          Built with{" "}
          <span className="text-pink-500">♥</span>{" "}
          for better Prompt Engineering
        </p>

      </footer>

    </main>
  );
}