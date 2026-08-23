"use client";

import { useState } from "react";
import API from "@/services/api";

interface ImproverResult {
  success: boolean;
  original_prompt: string;
  improved_prompt: string;
  improvement_score: number;
  changes: string[];
  strengths: string[];
  weaknesses: string[];
}

export default function ImproverPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<ImproverResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const improvePrompt = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setCopied(false);

      const response = await API.post("/improve-prompt", {
        prompt: prompt,
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError("Unable to improve the prompt.");
      }
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Something went wrong while improving your prompt."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = async () => {
    if (!result?.improved_prompt) return;

    try {
      await navigator.clipboard.writeText(result.improved_prompt);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const score = Math.max(
    0,
    Math.min(100, Number(result?.improvement_score ?? 0))
  );

  const scoreLabel =
    score >= 90
      ? "Excellent"
      : score >= 75
      ? "Strong"
      : score >= 60
      ? "Good"
      : "Needs Work";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8fc] text-[#111326]">

      {/* =========================================================
          HERO BACKGROUND
      ========================================================= */}

      <section className="relative px-4 pb-12 pt-8 sm:px-6 lg:px-10">

        {/* Soft ambient gradients */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-violet-300/25 blur-[130px]" />

          <div className="absolute right-[-150px] top-[40px] h-[500px] w-[500px] rounded-full bg-fuchsia-300/20 blur-[130px]" />

          <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-indigo-200/20 blur-[130px]" />

          {/* subtle grid */}

          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

        </div>


        {/* =======================================================
            HERO CONTAINER
        ======================================================= */}

        <div className="relative mx-auto max-w-[1480px]">

          <div className="relative overflow-hidden rounded-[36px] border border-slate-200/80 bg-white shadow-[0_25px_90px_rgba(15,23,42,0.10)]">

            {/* Top gradient line */}

            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />


            <div className="grid lg:grid-cols-[1fr_0.95fr]">


              {/* =================================================
                  LEFT HERO
              ================================================= */}

              <div className="relative px-7 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">

                {/* Accent glow */}

                <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-violet-200/30 blur-[100px]" />


                <div className="relative">

                  {/* Badge */}

                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-violet-600">

                    <span className="relative flex h-2.5 w-2.5">

                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />

                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />

                    </span>

                    AI Prompt Studio

                  </div>


                  {/* Heading */}

                  <h1 className="mt-7 max-w-3xl text-[46px] font-black leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-[60px] lg:text-[72px]">

                    Turn simple ideas

                    <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">

                      into powerful prompts.

                    </span>

                  </h1>


                  {/* Description */}

                  <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">

                    Transform ordinary instructions into clearer,
                    more precise and professional AI-ready prompts —
                    without changing what you actually want to say.

                  </p>


                  {/* Feature pills */}

                  <div className="mt-7 flex flex-wrap gap-2.5">

                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      ✨ Clarity

                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      🎯 Precision

                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      🧠 Context

                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      📋 Structure

                    </div>

                  </div>


                  {/* Bottom mini stats */}

                  <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <p className="text-2xl font-black text-slate-900">
                        4+
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Prompt dimensions
                      </p>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <p className="text-2xl font-black text-slate-900">
                        AI
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Powered analysis
                      </p>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <p className="text-2xl font-black text-slate-900">
                        1
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Improved prompt
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  RIGHT TRANSFORMATION AREA
              ================================================= */}

              <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3efff] via-[#faf7ff] to-[#fff2f8] px-5 py-10 sm:px-8 lg:px-10">

                {/* Decorative blobs */}

                <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-violet-300/20 blur-[110px]" />

                <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-80 w-80 rounded-full bg-pink-300/20 blur-[110px]" />

                <div className="pointer-events-none absolute left-[35%] top-[35%] h-64 w-64 rounded-full bg-indigo-200/15 blur-[100px]" />


                {/* Transformation Card */}

                <div className="relative w-full max-w-[560px]">

                  {/* Floating top label */}

                  <div className="absolute -top-5 left-7 z-20 rounded-full border border-white bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-violet-600 shadow-lg">

                    ✨ Prompt transformation

                  </div>


                  <div className="rounded-[30px] border border-white/80 bg-white/85 p-4 shadow-[0_25px_70px_rgba(76,29,149,0.15)] backdrop-blur-xl sm:p-5">

                    {/* Header */}

                    <div className="flex items-center justify-between px-2 pb-4 pt-2">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl text-white shadow-lg">
                          ✨
                        </div>

                        <div>

                          <p className="text-sm font-black text-slate-900">
                            Prompto AI
                          </p>

                          <p className="text-xs text-slate-400">
                            Prompt optimization engine
                          </p>

                        </div>

                      </div>


                      <div className="flex items-center gap-1.5">

                        <span className="h-2 w-2 rounded-full bg-red-400" />

                        <span className="h-2 w-2 rounded-full bg-yellow-400" />

                        <span className="h-2 w-2 rounded-full bg-green-400" />

                      </div>

                    </div>


                    {/* Original */}

                    <div className="rounded-[22px] border border-rose-100 bg-rose-50/70 p-5">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-sm">
                            01
                          </span>

                          <span className="text-xs font-extrabold uppercase tracking-wider text-rose-500">
                            Original
                          </span>

                        </div>

                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-rose-400 shadow-sm">
                          RAW
                        </span>

                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        Explain Artificial Intelligence to a beginner
                        using examples.
                      </p>

                    </div>


                    {/* Connector */}

                    <div className="relative flex justify-center py-3">

                      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-rose-200 via-violet-300 to-emerald-200" />

                      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-600 shadow-md">
                        ↓
                      </div>

                    </div>


                    {/* AI processing */}

                    <div className="relative overflow-hidden rounded-[22px] border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5">

                      {/* shimmer */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />

                      <div className="relative flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl text-white shadow-lg shadow-violet-500/20">
                          🧠
                        </div>

                        <div className="min-w-0">

                          <div className="flex items-center gap-2">

                            <p className="text-sm font-black text-slate-900">
                              AI analyzing
                            </p>

                            <span className="flex gap-1">

                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500" />

                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-500 [animation-delay:150ms]" />

                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-500 [animation-delay:300ms]" />

                            </span>

                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            Checking clarity, context, precision and output.
                          </p>

                        </div>

                      </div>


                      {/* Analysis metrics */}

                      <div className="relative mt-5 grid grid-cols-4 gap-2">

                        {[
                          ["C", "Clarity"],
                          ["P", "Precision"],
                          ["C", "Context"],
                          ["O", "Output"],
                        ].map(([letter, label], index) => (

                          <div
                            key={index}
                            className="rounded-xl border border-white bg-white/70 p-2.5 text-center"
                          >

                            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-xs font-black text-violet-600">
                              {letter}
                            </div>

                            <p className="mt-1.5 truncate text-[9px] font-bold text-slate-500">
                              {label}
                            </p>

                          </div>

                        ))}

                      </div>

                    </div>


                    {/* Connector */}

                    <div className="relative flex justify-center py-3">

                      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-300 to-emerald-200" />

                      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-600 shadow-md">
                        ↓
                      </div>

                    </div>


                    {/* Improved */}

                    <div className="rounded-[22px] border border-emerald-200 bg-emerald-50/70 p-5">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-sm">
                            02
                          </span>

                          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                            AI Ready
                          </span>

                        </div>

                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">
                          IMPROVED
                        </span>

                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-700">
                        Explain Artificial Intelligence to a complete
                        beginner using simple analogies and relatable
                        everyday examples. Structure the explanation
                        clearly and avoid unnecessary technical jargon.
                      </p>

                    </div>


                    {/* Footer */}

                    <div className="mt-4 flex items-center justify-between px-2">

                      <span className="text-xs font-medium text-slate-400">
                        Prompt quality enhanced
                      </span>

                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">

                        <span className="h-2 w-2 rounded-full bg-emerald-500" />

                        Ready

                      </span>

                    </div>

                  </div>


                  {/* Floating score */}

                  <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:-left-8">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Potential
                    </p>

                    <div className="mt-1 flex items-baseline gap-1">

                      <span className="text-2xl font-black text-violet-600">
                        +32
                      </span>

                      <span className="text-xs font-semibold text-slate-400">
                        quality
                      </span>

                    </div>

                  </div>


                  {/* Floating AI badge */}

                  <div className="absolute -right-3 -top-4 rounded-2xl border border-white bg-slate-950 px-4 py-3 text-white shadow-xl sm:-right-7">

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500">
                        ✦
                      </span>

                      <div>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Powered by
                        </p>

                        <p className="text-xs font-bold">
                          Prompt Intelligence
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          WORKSPACE
      ========================================================= */}

      <section className="relative px-4 pb-14 sm:px-6 lg:px-10">

        <div className="mx-auto max-w-[1480px]">

          <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">

            {/* Accent */}

            <div className="h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />

            <div className="p-6 sm:p-9 lg:p-11">

              {/* Header */}

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-xl">
                      ✍️
                    </div>

                    <div>

                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-500">
                        Prompt Workspace
                      </p>

                      <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                        Enter your prompt
                      </h2>

                    </div>

                  </div>

                  <p className="mt-4 max-w-2xl text-slate-500">
                    Paste your prompt below and let Prompto identify
                    opportunities to make it more effective.

                  </p>

                </div>


                <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-500">

                  {prompt.length} characters

                </div>

              </div>


              {/* Textarea */}

              <div className="mt-8 rounded-[26px] border border-slate-200 bg-slate-50 p-2 transition-all duration-300 focus-within:border-violet-400 focus-within:bg-white focus-within:shadow-[0_20px_60px_rgba(124,58,237,0.10)]">

                <textarea
                  rows={8}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: Explain Machine Learning to a beginner..."
                  className="w-full resize-none rounded-[20px] border-0 bg-transparent p-5 text-base leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-lg"
                />

              </div>


              {/* Error */}

              {error && (

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">

                  <span>⚠️</span>

                  <p className="font-medium">
                    {error}
                  </p>

                </div>

              )}


              {/* Controls */}

              <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">
                    ✨ AI Enhancement
                  </span>

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                    🎯 Precision
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                    ✓ Structure
                  </span>

                </div>


                <button
                  onClick={improvePrompt}
                  disabled={loading}
                  className="group rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <span className="flex items-center justify-center gap-2">

                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Improving...
                      </>
                    ) : (
                      <>
                        ✨ Improve Prompt

                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}

                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          RESULTS
      ========================================================= */}

      {result && (

        <section className="px-4 pb-20 sm:px-6 lg:px-10">

          <div className="mx-auto max-w-[1480px] space-y-8">


            {/* Result header */}

            <div className="relative overflow-hidden rounded-[34px] bg-slate-950 p-7 text-white shadow-[0_25px_80px_rgba(15,23,42,0.16)] sm:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-fuchsia-400">
                    AI Analysis Complete
                  </p>

                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                    Your prompt has evolved.
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                    Prompto analyzed your prompt and applied improvements
                    designed to make the instruction clearer and more
                    effective.
                  </p>

                </div>


                {/* Score */}

                <div className="flex justify-center">

                  <div className="relative flex h-36 w-36 items-center justify-center">

                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(#a855f7 ${
                          score * 3.6
                        }deg, rgba(255,255,255,0.08) ${
                          score * 3.6
                        }deg)`,
                      }}
                    />

                    <div className="absolute inset-[7px] rounded-full bg-slate-950" />

                    <div className="relative text-center">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Score
                      </p>

                      <p className="text-3xl font-black text-fuchsia-400">
                        {score}%
                      </p>

                      <p className="text-xs text-slate-500">
                        {scoreLabel}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Changes */}

            <div className="rounded-[32px] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-7 sm:p-9">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100">
                  🔍
                </div>

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-500">
                    What changed
                  </p>

                  <h3 className="text-2xl font-black">
                    Improvements applied
                  </h3>

                </div>

              </div>


              {result.changes.length > 0 ? (

                <div className="mt-7 grid gap-3 md:grid-cols-2">

                  {result.changes.map((change, index) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-2xl border border-indigo-100 bg-white p-4"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        ✓
                      </span>

                      <p className="leading-6 text-slate-700">
                        {change}
                      </p>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="mt-6 text-slate-500">
                  No major changes were required.
                </p>

              )}

            </div>


            {/* Strengths / Weaknesses */}

            <div className="grid gap-6 lg:grid-cols-2">

              <div className="rounded-[30px] border border-emerald-100 bg-emerald-50/60 p-7 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                    💪
                  </div>

                  <h3 className="text-2xl font-black">
                    Prompt Strengths
                  </h3>

                </div>

                <div className="mt-6 space-y-3">

                  {result.strengths.length > 0 ? (

                    result.strengths.map((strength, index) => (

                      <div
                        key={index}
                        className="flex gap-3 rounded-2xl bg-white p-4"
                      >

                        <span className="text-emerald-500">
                          ✓
                        </span>

                        <p className="leading-6 text-slate-700">
                          {strength}
                        </p>

                      </div>

                    ))

                  ) : (

                    <p className="text-slate-500">
                      No specific strengths identified.
                    </p>

                  )}

                </div>

              </div>


              <div className="rounded-[30px] border border-orange-100 bg-orange-50/60 p-7 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                    🎯
                  </div>

                  <h3 className="text-2xl font-black">
                    Areas Improved
                  </h3>

                </div>

                <div className="mt-6 space-y-3">

                  {result.weaknesses.length > 0 ? (

                    result.weaknesses.map((weakness, index) => (

                      <div
                        key={index}
                        className="flex gap-3 rounded-2xl bg-white p-4"
                      >

                        <span className="text-orange-500">
                          →
                        </span>

                        <p className="leading-6 text-slate-700">
                          {weakness}
                        </p>

                      </div>

                    ))

                  ) : (

                    <p className="text-slate-500">
                      The original prompt was already strong.
                    </p>

                  )}

                </div>

              </div>

            </div>


            {/* Before / After */}

            <div>

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-500">
                Prompt transformation
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Before → After
              </h2>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">

                <div className="rounded-[30px] border border-rose-200 bg-rose-50/60 p-7 sm:p-8">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-black">
                      ❌ Original Prompt
                    </h3>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-500">
                      BEFORE
                    </span>

                  </div>

                  <div className="mt-6 rounded-2xl bg-white p-5">

                    <p className="whitespace-pre-wrap leading-7 text-slate-700">
                      {result.original_prompt}
                    </p>

                  </div>

                </div>


                <div className="rounded-[30px] border border-emerald-200 bg-emerald-50/60 p-7 sm:p-8">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-black">
                      ✓ AI Improved Prompt
                    </h3>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">
                      AFTER
                    </span>

                  </div>

                  <div className="mt-6 rounded-2xl bg-white p-5">

                    <p className="whitespace-pre-wrap leading-7 text-slate-700">
                      {result.improved_prompt}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Ready to use */}

            <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#171022] via-[#25103d] to-[#3b0764] p-7 text-white sm:p-9">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

              <div className="relative">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-fuchsia-400">
                      Final result
                    </p>

                    <h3 className="mt-2 text-3xl font-black">
                      📋 Ready-to-Use Prompt
                    </h3>

                  </div>

                  <button
                    onClick={copyPrompt}
                    className="rounded-2xl bg-white px-6 py-3 font-bold text-violet-700 transition-all hover:-translate-y-1 hover:bg-violet-50"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Prompt"}
                  </button>

                </div>


                <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.07] p-6">

                  <p className="whitespace-pre-wrap leading-8 text-slate-200">
                    {result.improved_prompt}
                  </p>

                </div>

              </div>

            </div>


            <div className="pb-5 text-center">

              <p className="text-sm text-slate-400">
                ✨ Better prompts. Better instructions. Better AI results.
              </p>

            </div>

          </div>

        </section>

      )}

    </main>
  );
}