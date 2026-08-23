"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { getChallenge } from "@/lib/challengeLoader";
import API from "@/services/api";

import EvaluationResult from "@/components/arena/EvaluationResult";
import ChallengeResult from "@/components/arena/ChallengeResult";

export default function ChallengeEngine() {
  const params = useParams();

  const rawTrack = params?.track;
  const rawId = params?.id;

  const track = Array.isArray(rawTrack)
    ? rawTrack[0]
    : rawTrack ?? "";

  const challengeId = Number(
    Array.isArray(rawId) ? rawId[0] : rawId
  );

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const challenge = getChallenge(track, challengeId);

  if (!challenge) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white rounded-[28px] border border-slate-200 shadow-xl p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-3xl">
            🚀
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-slate-950">
            Challenge not found
          </h1>

          <p className="mt-3 text-slate-500">
            The challenge you're looking for doesn't exist or is no longer
            available.
          </p>
        </div>
      </main>
    );
  }

  const passScore = challenge.passScore ?? 70;
  const bonusScore = challenge.bonusScore ?? 90;
  const bonusXP = challenge.bonusXP ?? 20;

  const evaluatePrompt = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const email = localStorage.getItem("userEmail");

      const res = await API.post("/evaluate-prompt", {
        prompt,
        user_email: email,
      });

      if (res.data.success) {
        setResult(res.data.evaluation);

        const score = res.data.evaluation.overall_score;

        let earnedXP = Math.floor(challenge.xp * 0.4);

        if (score >= passScore) {
          earnedXP = challenge.xp;
        }

        if (score >= bonusScore) {
          earnedXP = challenge.xp + bonusXP;
        }

        await API.post("/challenge-progress", {
          user_email: email,
          track,
          challenge_id: challengeId,
          score,
          xp: earnedXP,
          completed: score >= passScore,
        });

        await API.post("/submit-challenge", {
          user_email: email,
          track,
          challenge_id: challengeId,
          challenge_title: challenge.title,
          difficulty: challenge.difficulty,
          prompt,
          evaluation: res.data.evaluation,
          score,
          xp: earnedXP,
          passed: score >= passScore,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const retryChallenge = () => {
    setPrompt("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* ========================================================= */}
      {/* HERO                                                      */}
      {/* ========================================================= */}

      <section className="px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10">
        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-sm">

            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500" />

            {/* Soft background glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid lg:grid-cols-[1.45fr_0.75fr] gap-8 lg:gap-12 p-7 sm:p-10 lg:p-12">

              {/* LEFT HERO */}
              <div className="flex flex-col justify-center">

                {/* Eyebrow */}
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-purple-600">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  Prompto Challenge Studio
                </div>

                {/* Track */}
                <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-slate-500">
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-orange-600">
                    {track.toUpperCase()} TRACK
                  </span>

                  <span className="text-slate-300">•</span>

                  <span>
                    Challenge {challengeId}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-[60px] leading-[1.02] font-extrabold tracking-tight">
                  {challenge.title}
                </h1>

                {/* Gradient highlight */}
                <div className="mt-2 h-1.5 w-24 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

                {/* Description */}
                <p className="mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-8 text-slate-600">
                  {challenge.description}
                </p>

                {/* Tags */}
                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    🎯 Prompt Practice
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                    ✨ AI Evaluation
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                    ⭐ XP Reward
                  </span>

                </div>

                {/* Bottom stats */}
                <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-2xl font-extrabold">
                      {challenge.xp}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Base XP
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-2xl font-extrabold">
                      {passScore}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Pass Score
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-2xl font-extrabold">
                      {challenge.time.replace(" mins", "")}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Minutes
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-2xl font-extrabold">
                      +{bonusXP}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Bonus XP
                    </p>
                  </div>

                </div>

              </div>

              {/* RIGHT HERO CARD */}
              <div className="flex items-center">

                <div className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6 shadow-sm">

                  {/* Card header */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-2xl shadow-md">
                        🚀
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Challenge Overview
                        </p>

                        <h2 className="mt-1 text-lg font-extrabold">
                          Your Mission
                        </h2>
                      </div>

                    </div>

                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_0_5px_rgba(34,197,94,0.12)]" />

                  </div>

                  {/* Main details */}
                  <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-5">

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Difficulty
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                        {challenge.difficulty}
                      </span>
                    </div>

                    <div className="my-5 h-px bg-slate-100" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Estimated time
                      </span>

                      <span className="font-bold">
                        ⏱ {challenge.time}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Challenge XP
                      </span>

                      <span className="font-bold text-orange-600">
                        ⭐ {challenge.xp} XP
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Pass score
                      </span>

                      <span className="font-bold text-green-600">
                        {passScore}/100
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Bonus
                      </span>

                      <span className="font-bold text-purple-600">
                        +{bonusXP} XP
                      </span>
                    </div>

                  </div>

                  {/* Mission footer */}
                  <div className="mt-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-5 text-white">

                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Mission
                    </p>

                    <p className="mt-2 text-sm leading-6 font-medium">
                      Build a clear, specific and effective prompt that
                      satisfies the challenge requirements.
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* OBJECTIVE                                                 */}
      {/* ========================================================= */}

      <section className="px-4 sm:px-6 lg:px-8 mt-8 lg:mt-10">
        <div className="max-w-7xl mx-auto">

          <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-7 sm:p-9">

            <div className="flex items-start gap-4">

              <div className="h-12 w-12 shrink-0 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">
                🎯
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                  Challenge Objective
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold">
                  What you need to accomplish
                </h2>

                <p className="mt-4 max-w-5xl text-base sm:text-lg leading-8 text-slate-600">
                  {challenge.description}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* REQUIREMENTS                                              */}
      {/* ========================================================= */}

      <section className="px-4 sm:px-6 lg:px-8 mt-8 lg:mt-10">
        <div className="max-w-7xl mx-auto">

          <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="p-7 sm:p-9 border-b border-slate-100">

              <div className="flex items-center gap-4">

                <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl">
                  📋
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">
                    Challenge Requirements
                  </p>

                  <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold">
                    Know the rules before you begin
                  </h2>
                </div>

              </div>

            </div>

            {/* Stats */}
            <div className="p-7 sm:p-9">

              <div className="grid md:grid-cols-3 gap-4">

                <div className="rounded-2xl bg-green-50 border border-green-100 p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Passing Score Needed
                  </p>

                  <p className="mt-2 text-4xl font-extrabold text-green-600">
                    {passScore}/100
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 border border-orange-100 p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Challenge XP
                  </p>

                  <p className="mt-2 text-4xl font-extrabold text-orange-600">
                    {challenge.xp}
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 border border-purple-100 p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Bonus Reward
                  </p>

                  <p className="mt-2 text-4xl font-extrabold text-purple-600">
                    +{bonusXP}
                  </p>
                </div>

              </div>

              {/* Evaluation + Rules */}
              <div className="mt-8 grid lg:grid-cols-2 gap-8">

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">

                  <h3 className="text-lg font-extrabold">
                    📊 AI Evaluation
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your prompt is evaluated across these dimensions.
                  </p>

                  <div className="mt-5 grid sm:grid-cols-2 gap-3">

                    {[
                      "Clarity",
                      "Specificity",
                      "Context",
                      "Role",
                      "Constraints",
                      "Output Format",
                      "Examples",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3"
                      >
                        <span className="text-green-500">✓</span>
                        <span className="text-sm font-medium text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">

                  <h3 className="text-lg font-extrabold">
                    📜 Rules
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Keep these rules in mind while writing your prompt.
                  </p>

                  <div className="mt-5 space-y-3">

                    <div className="flex gap-3 rounded-xl bg-white border border-slate-200 p-4">
                      <span>✓</span>
                      <p className="text-sm text-slate-600">
                        Score at least{" "}
                        <strong className="text-slate-900">
                          {passScore}/100
                        </strong>{" "}
                        to pass.
                      </p>
                    </div>

                    <div className="flex gap-3 rounded-xl bg-white border border-slate-200 p-4">
                      <span>⭐</span>
                      <p className="text-sm text-slate-600">
                        Score{" "}
                        <strong className="text-slate-900">
                          {bonusScore}+
                        </strong>{" "}
                        to earn an additional{" "}
                        <strong className="text-purple-600">
                          {bonusXP} XP
                        </strong>
                        .
                      </p>
                    </div>

                    <div className="flex gap-3 rounded-xl bg-white border border-slate-200 p-4">
                      <span>🔁</span>
                      <p className="text-sm text-slate-600">
                        Unlimited retries are allowed.
                      </p>
                    </div>

                    <div className="flex gap-3 rounded-xl bg-white border border-slate-200 p-4">
                      <span>🏆</span>
                      <p className="text-sm text-slate-600">
                        Your highest score will be saved.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* PROMPT WORKSPACE                                          */}
      {/* ========================================================= */}

      <section className="px-4 sm:px-6 lg:px-8 mt-8 lg:mt-10 pb-16">
        <div className="max-w-7xl mx-auto">

          <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm overflow-hidden">

            {/* Workspace Header */}
            <div className="p-7 sm:p-9 border-b border-slate-100">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div className="flex items-center gap-4">

                  <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">
                    ✍️
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                      Prompt Workspace
                    </p>

                    <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold">
                      Write your prompt
                    </h2>
                  </div>

                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">
                  {prompt.length} characters
                </div>

              </div>

              <p className="mt-4 text-slate-500">
                Build your prompt using the evaluation criteria above, then
                submit it for AI-powered scoring.
              </p>

            </div>

            {/* Editor */}
            <div className="p-7 sm:p-9">

              <div className="relative">

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Write your prompt here..."
                  className="w-full min-h-[360px] rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 text-base leading-7 text-slate-800 placeholder:text-slate-400 resize-y focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition"
                />

                <div className="absolute bottom-4 right-4 rounded-lg bg-white/90 border border-slate-200 px-3 py-1.5 text-xs text-slate-400">
                  Prompt editor
                </div>

              </div>

              {/* Editor Footer */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
                    Role
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                    Context
                  </span>

                  <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                    Constraints
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                    Output
                  </span>

                </div>

                <button
                  onClick={evaluatePrompt}
                  disabled={loading || !prompt.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:from-purple-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      Evaluate Prompt
                      <span>→</span>
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>

          {/* ===================================================== */}
          {/* AI EVALUATION                                         */}
          {/* ===================================================== */}

          {result && (
            <div className="mt-8">
              <EvaluationResult result={result} />
            </div>
          )}

          {/* ===================================================== */}
          {/* CHALLENGE RESULT                                      */}
          {/* ===================================================== */}

          {result && (
            <div className="mt-8">
              <ChallengeResult
                result={result}
                track={track}
                challengeId={challengeId}
                onRetry={retryChallenge}
                challengeXP={challenge.xp}
                passScore={passScore}
                bonusScore={bonusScore}
                bonusXP={bonusXP}
              />
            </div>
          )}

        </div>
      </section>

    </main>
  );
}