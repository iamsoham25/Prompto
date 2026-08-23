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

  // ============================================================
  // EVALUATE PROMPT
  // ============================================================

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

  // ============================================================
  // QUALITY LEVEL
  // ============================================================

  const getQuality = (score: number) => {
    if (score >= 85) {
      return {
        label: "Excellent",
        description: "Outstanding prompt structure",
        color: "emerald",
      };
    }

    if (score >= 70) {
      return {
        label: "Good",
        description: "Strong foundation with room to refine",
        color: "blue",
      };
    }

    if (score >= 50) {
      return {
        label: "Average",
        description: "Several areas can be improved",
        color: "amber",
      };
    }

    return {
      label: "Needs Improvement",
      description: "Significant refinement recommended",
      color: "red",
    };
  };

  // ============================================================
  // SCORE COLOR
  // ============================================================

  const getScoreColor = (value: number) => {
    if (value >= 80) return "from-emerald-400 to-cyan-400";
    if (value >= 60) return "from-blue-400 to-indigo-500";
    if (value >= 40) return "from-amber-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  // ============================================================
  // METRIC CARD
  // ============================================================

  function MetricCard({
    title,
    value,
    icon,
  }: {
    title: string;
    value: number;
    icon: string;
  }) {
    const gradient = getScoreColor(value);

    return (
      <div className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)]">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-100/40 blur-3xl transition-all duration-300 group-hover:bg-purple-200/60" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                {icon}
              </div>

              <span className="font-semibold text-slate-800">
                {title}
              </span>
            </div>

            <span className="text-xl font-extrabold text-slate-900">
              {value}
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
              style={{
                width: `${Math.max(0, Math.min(value, 100))}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // OVERVIEW CARD
  // ============================================================

  function OverviewCard({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string | number;
    icon: string;
  }) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>

          <p className="text-sm font-medium text-white/60">
            {title}
          </p>
        </div>

        <h3 className="mt-3 text-3xl font-extrabold text-white">
          {value}
        </h3>
      </div>
    );
  }

  // ============================================================
  // HERO ORB
  // ============================================================

  function HeroOrb() {
    return (
      <div className="relative hidden h-[360px] w-[360px] items-center justify-center lg:flex">
        {/* Outer glow */}
        <div className="absolute h-[280px] w-[280px] rounded-full bg-purple-600/20 blur-[90px]" />

        {/* Orbit 1 */}
        <div className="absolute h-[300px] w-[300px] rounded-full border border-purple-300/20 animate-[spin_18s_linear_infinite]" />

        {/* Orbit 2 */}
        <div className="absolute h-[235px] w-[235px] rounded-full border border-pink-300/20 animate-[spin_12s_linear_infinite_reverse]" />

        {/* Orbit 3 */}
        <div className="absolute h-[170px] w-[170px] rounded-full border border-orange-300/20 animate-[spin_9s_linear_infinite]" />

        {/* Orbit dots */}
        <div className="absolute h-[300px] w-[300px] animate-[spin_18s_linear_infinite]">
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,0.9)]" />
        </div>

        <div className="absolute h-[235px] w-[235px] animate-[spin_12s_linear_infinite_reverse]">
          <div className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.9)]" />
        </div>

        {/* Main sphere */}
        <div className="relative flex h-[165px] w-[165px] items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700 shadow-[0_0_90px_rgba(236,72,153,0.45)]">
          <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-orange-300/80 via-pink-500/80 to-purple-700/90" />

          <div className="absolute left-[25px] top-[25px] h-[45px] w-[45px] rounded-full bg-white/35 blur-xl" />

          <div className="relative z-10 text-center">
            <div className="text-4xl">🧠</div>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              AI
            </p>
          </div>
        </div>
      </div>
    );
  }

  const quality = evaluation
    ? getQuality(evaluation.overall_score)
    : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] text-slate-950">
      {/* ============================================================
          HERO
      ============================================================ */}

      <section className="relative overflow-hidden bg-[#080313]">
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]" />

        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-700/25 blur-[130px]" />

        <div className="pointer-events-none absolute bottom-[-200px] left-1/3 h-[450px] w-[450px] rounded-full bg-pink-600/15 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 lg:px-10">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Hero content */}
            <div>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-300">
                  AI Prompt Intelligence
                </span>
              </div>

              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-pink-400">
                Prompt Engineering Evaluator
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Understand.
                <br />
                Improve.
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Master prompts.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                Analyze your prompt across clarity, specificity, context,
                constraints, role definition, output format and examples.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {[
                  "7 Skill Dimensions",
                  "AI Evaluation",
                  "Instant Feedback",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-xl"
                  >
                    ✦ {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 3D orb */}
            <HeroOrb />
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN WORKSPACE
      ============================================================ */}

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* ============================================================
            PROMPT INPUT
        ============================================================ */}

        <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:p-10">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-100/50 blur-[80px]" />

          <div className="relative z-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-500">
                  Prompt Workspace
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Enter your prompt
                </h2>

                <p className="mt-2 max-w-2xl text-slate-500">
                  Write or paste the prompt you want Prompto to analyze.
                </p>
              </div>

              <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                {prompt.length} characters
              </div>
            </div>

            {/* Text area */}
            <div className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-[#fafbff] transition-all duration-300 focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-100">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                placeholder="Example: Act as a senior data scientist and analyze this dataset. Explain the key patterns, identify anomalies, and provide your findings in a structured table..."
                className="min-h-[260px] w-full resize-none bg-transparent p-6 text-base leading-7 text-slate-800 outline-none placeholder:text-slate-400 sm:p-7 sm:text-lg"
              />

              <div className="flex flex-col gap-4 border-t border-slate-200 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                    💡 Be specific
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                    🎯 Define your goal
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                    📋 Define output
                  </span>
                </div>

                <button
                  onClick={evaluatePrompt}
                  disabled={loading}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3.5 font-bold text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(79,70,229,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading
                      ? "🤖 AI is evaluating..."
                      : "🚀 Evaluate Prompt"}
                  </span>

                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            LOADING
        ============================================================ */}

        {loading && (
          <div className="mt-8 rounded-[28px] border border-purple-100 bg-white p-8 text-center shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              AI is analyzing your prompt
            </h3>

            <p className="mt-2 text-slate-500">
              Checking seven prompt engineering dimensions...
            </p>
          </div>
        )}

        {/* ============================================================
            RESULTS
        ============================================================ */}

        {evaluation && (
          <div
            id="evaluation-results"
            className="mt-12 space-y-8 scroll-mt-28"
          >
            {/* ========================================================
                SCORE HERO
            ======================================================== */}

            <section className="relative overflow-hidden rounded-[32px] bg-[#080313] p-8 shadow-[0_25px_70px_rgba(30,10,55,0.18)] sm:p-10">
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[110px]" />

              <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-pink-600/10 blur-[110px]" />

              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-pink-400">
                    AI Evaluation Result
                  </p>

                  <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Prompt Quality
                  </h2>

                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                    Your prompt has been evaluated across seven core prompt
                    engineering dimensions.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />

                    <span className="text-sm font-semibold text-slate-300">
                      {quality?.label}
                    </span>

                    <span className="text-slate-600">•</span>

                    <span className="text-sm text-slate-400">
                      {evaluation.difficulty}
                    </span>
                  </div>
                </div>

                {/* Score ring */}
                <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-600/20 blur-2xl" />

                  <div className="absolute inset-3 rounded-full border border-white/10" />

                  <div
                    className="absolute inset-6 rounded-full"
                    style={{
                      background: `conic-gradient(#ff5e1f 0deg, #ec4899 ${
                        evaluation.overall_score * 2.2
                      }deg, rgba(255,255,255,0.08) ${
                        evaluation.overall_score * 2.2
                      }deg 360deg)`,
                    }}
                  />

                  <div className="absolute inset-[13px] flex items-center justify-center rounded-full bg-[#0d0619]">
                    <div className="text-center">
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                        Score
                      </p>

                      <div className="mt-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-6xl font-black text-transparent">
                        {evaluation.overall_score}
                      </div>

                      <p className="text-sm font-semibold text-slate-500">
                        / 100
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                QUALITY + DIFFICULTY
            ======================================================== */}

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-500">
                  Quality Level
                </p>

                <div className="mt-5 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl shadow-lg">
                    🎯
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-slate-950">
                      {quality?.label}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {quality?.description}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-pink-500">
                  Prompt Difficulty
                </p>

                <div className="mt-5 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-2xl shadow-lg">
                    🏆
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-slate-950">
                      {evaluation.difficulty}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Based on prompt complexity and structure.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* ========================================================
                METRICS
            ======================================================== */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_15px_40px_rgba(15,23,42,0.06)] sm:p-9">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-500">
                  Skill Intelligence
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Prompt Metrics
                </h2>

                <p className="mt-2 text-slate-500">
                  Detailed performance across the seven dimensions used by
                  the evaluator.
                </p>
              </div>

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

            {/* ========================================================
                STRENGTHS + IMPROVEMENTS
            ======================================================== */}

            <div className="grid gap-7 lg:grid-cols-2">
              {/* Strengths */}
              <section className="relative overflow-hidden rounded-[32px] border border-emerald-200 bg-white p-8 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                      💪
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600">
                        What you did well
                      </p>

                      <h2 className="mt-1 text-3xl font-black text-slate-950">
                        Strengths
                      </h2>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    {evaluation.strengths?.length > 0 ? (
                      evaluation.strengths.map(
                        (item: string, index: number) => (
                          <div
                            key={index}
                            className="flex gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4"
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
                </div>
              </section>

              {/* Improvements */}
              <section className="relative overflow-hidden rounded-[32px] border border-orange-200 bg-white p-8 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-100/60 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                      🎯
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                        Next improvements
                      </p>

                      <h2 className="mt-1 text-3xl font-black text-slate-950">
                        Focus Areas
                      </h2>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    {evaluation.improvements?.length > 0 ? (
                      evaluation.improvements.map(
                        (item: string, index: number) => (
                          <div
                            key={index}
                            className="flex gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4"
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
                </div>
              </section>
            </div>

            {/* ========================================================
                AI SUMMARY
            ======================================================== */}

            <section className="relative overflow-hidden rounded-[32px] border border-purple-200 bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.07)] sm:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-100/70 blur-[90px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-2xl shadow-lg">
                    🤖
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-500">
                      AI Intelligence
                    </p>

                    <h2 className="mt-1 text-3xl font-black text-slate-950">
                      Evaluation Summary
                    </h2>
                  </div>
                </div>

                <div className="mt-7 rounded-[24px] border border-slate-200 bg-[#fafbff] p-6 sm:p-8">
                  <p className="text-base leading-8 text-slate-700 sm:text-lg">
                    {evaluation.summary ||
                      `This prompt has an overall quality score of ${evaluation.overall_score}/100. ${
                        evaluation.overall_score >= 80
                          ? "It is already a strong prompt."
                          : evaluation.overall_score >= 60
                          ? "It can be improved with better context and constraints."
                          : "It requires significant improvements before being used."
                      }`}
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================
                EVALUATION OVERVIEW
            ======================================================== */}

            <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-[0_25px_60px_rgba(79,70,229,0.25)] sm:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-pink-400/20 blur-[100px]" />

              <div className="relative z-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-100">
                  Final Overview
                </p>

                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  Evaluation Overview
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <OverviewCard
                    title="Overall"
                    value={`${evaluation.overall_score}/100`}
                    icon="📊"
                  />

                  <OverviewCard
                    title="Difficulty"
                    value={evaluation.difficulty}
                    icon="🏆"
                  />

                  <OverviewCard
                    title="Strengths"
                    value={evaluation.strengths?.length || 0}
                    icon="💪"
                  />

                  <OverviewCard
                    title="Improvements"
                    value={evaluation.improvements?.length || 0}
                    icon="🎯"
                  />
                </div>
              </div>
            </section>

            {/* ========================================================
                QUICK ACTIONS
            ======================================================== */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_15px_40px_rgba(15,23,42,0.06)] sm:p-9">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
                  Next Steps
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Quick Actions
                </h2>

                <p className="mt-2 text-slate-500">
                  Continue working with the results from this evaluation.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(evaluation, null, 2)
                    );
                  }}
                  className="rounded-2xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
                >
                  📋 Copy Evaluation
                </button>

                <button
                  onClick={() => router.push("/improver")}
                  className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
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
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  🔄 Evaluate Another
                </button>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <footer className="border-t border-slate-200 bg-white py-10 text-center">
        <p className="text-sm font-medium text-slate-400">
          Built with{" "}
          <span className="text-pink-500">♥</span>{" "}
          for better Prompt Engineering
        </p>
      </footer>

      {/* ============================================================
          CUSTOM ANIMATION
      ============================================================ */}

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        ::selection {
          background: #8b5cf6;
          color: white;
        }
      `}</style>
    </main>
  );
}