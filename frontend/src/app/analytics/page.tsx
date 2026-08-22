"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import RadarSkillChart from "@/components/analytics/RadarSkillChart";
import ScoreTrendChart from "@/components/analytics/ScoreTrendChart";
import SkillBarChart from "@/components/analytics/SkillBarChart";
import InsightCard from "@/components/analytics/InsightCard";

interface AnalyticsData {
  cards?: {
    total_prompts?: number;
    average_score?: number;
    best_score?: number;
    lowest_score?: number;
  };

  radar?: Array<{
    skill: string;
    score: number;
  }>;

  distribution?: {
    excellent?: number;
    good?: number;
    average?: number;
    poor?: number;
  };

  insights?: {
    strongest?: string;
    weakest?: string;
    recommendation?: string;
  };

  mastery_level?: string;
  improvement?: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setLoading(false);
        return;
      }

      const res = await API.get(
        `/dashboard/analytics/${encodeURIComponent(email)}`
      );

      if (res.data?.success) {
        setAnalytics(res.data);
      }
    } catch (error) {
      console.error("Analytics loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7fb]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

          <p className="mt-5 text-lg font-semibold text-slate-600">
            Loading Analytics...
          </p>
        </div>
      </main>
    );
  }

  if (!analytics) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7fb]">
        <div className="rounded-3xl bg-white px-10 py-12 text-center shadow-lg">
          <div className="text-5xl">📊</div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            No Analytics Found
          </h1>

          <p className="mt-3 text-slate-500">
            Evaluate some prompts to start building your analytics.
          </p>
        </div>
      </main>
    );
  }

  const averageScore = Math.round(
    Number(analytics.cards?.average_score ?? 0)
  );

  const bestScore = Math.round(
    Number(analytics.cards?.best_score ?? 0)
  );

  const lowestScore = Math.round(
    Number(analytics.cards?.lowest_score ?? 0)
  );

  const totalPrompts = Number(
    analytics.cards?.total_prompts ?? 0
  );

  const masteryLevel =
    analytics.mastery_level ?? "Beginner";

  const improvement = Math.round(
    Number(analytics.improvement ?? 0)
  );

  const remainingScore = Math.max(
    100 - averageScore,
    0
  );

  const distribution = analytics.distribution ?? {};

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-slate-950">

      <style jsx>{`
        @keyframes orbitOne {
          0% {
            transform: translate(-50%, -50%) rotateX(68deg) rotateZ(0deg);
          }

          100% {
            transform: translate(-50%, -50%) rotateX(68deg) rotateZ(360deg);
          }
        }

        @keyframes orbitTwo {
          0% {
            transform: translate(-50%, -50%) rotateX(72deg)
              rotateY(20deg) rotateZ(360deg);
          }

          100% {
            transform: translate(-50%, -50%) rotateX(72deg)
              rotateY(20deg) rotateZ(0deg);
          }
        }

        @keyframes orbitThree {
          0% {
            transform: translate(-50%, -50%) rotateY(70deg) rotateZ(0deg);
          }

          100% {
            transform: translate(-50%, -50%) rotateY(70deg) rotateZ(360deg);
          }
        }

        @keyframes orbitFour {
          0% {
            transform: translate(-50%, -50%) rotateX(55deg)
              rotateY(25deg) rotateZ(0deg);
          }

          100% {
            transform: translate(-50%, -50%) rotateX(55deg)
              rotateY(25deg) rotateZ(-360deg);
          }
        }

        @keyframes pulseSphere {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow:
              0 0 35px rgba(236, 72, 153, 0.35),
              0 0 80px rgba(139, 61, 224, 0.25);
          }

          50% {
            transform: translate(-50%, -50%) scale(1.045);
            box-shadow:
              0 0 55px rgba(236, 72, 153, 0.5),
              0 0 110px rgba(139, 61, 224, 0.4);
          }
        }

        @keyframes floatingBallOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(12px, -18px, 12px);
          }
        }

        @keyframes floatingBallTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-15px, 12px, -10px);
          }
        }

        @keyframes floatingBallThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(18px, 10px, 15px);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.6;
            transform: scale(1.15);
          }
        }

        .orbit-one {
          animation: orbitOne 18s linear infinite;
        }

        .orbit-two {
          animation: orbitTwo 24s linear infinite;
        }

        .orbit-three {
          animation: orbitThree 30s linear infinite;
        }

        .orbit-four {
          animation: orbitFour 15s linear infinite;
        }

        .score-sphere {
          animation: pulseSphere 4s ease-in-out infinite;
        }

        .ball-one {
          animation: floatingBallOne 4s ease-in-out infinite;
        }

        .ball-two {
          animation: floatingBallTwo 5s ease-in-out infinite;
        }

        .ball-three {
          animation: floatingBallThree 4.5s ease-in-out infinite;
        }

        .glow-pulse {
          animation: glowPulse 4s ease-in-out infinite;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .perspective {
          perspective: 1000px;
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-one,
          .orbit-two,
          .orbit-three,
          .orbit-four,
          .score-sphere,
          .ball-one,
          .ball-two,
          .ball-three,
          .glow-pulse {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1530px] px-6 pb-24 sm:px-8 lg:px-10">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative min-h-[560px] overflow-hidden rounded-b-[36px] bg-[#08030f] px-8 py-16 shadow-[0_25px_70px_rgba(30,10,55,0.25)] sm:px-12 lg:px-16">

          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:52px_52px]" />

          <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-purple-700/25 blur-[130px]" />

          <div className="pointer-events-none absolute right-10 top-32 h-[350px] w-[350px] rounded-full bg-pink-600/20 blur-[110px]" />

          <div className="pointer-events-none absolute -left-32 bottom-0 h-[350px] w-[350px] rounded-full bg-orange-500/10 blur-[110px]" />

          <div className="relative z-10 grid min-h-[460px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

            {/* HERO LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/20 bg-white/[0.05] px-5 py-3 backdrop-blur-xl">

                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-300">
                  AI Performance Intelligence
                </span>

              </div>

              <p className="mt-12 text-sm font-extrabold uppercase tracking-[0.25em] text-purple-300">
                Prompt Engineering Analytics
              </p>

              <h1 className="mt-5 max-w-[800px] font-display text-6xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-[82px]">

                Understand.
                <br />

                Improve.
                <br />

                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Master prompts.
                </span>

              </h1>

              <p className="mt-8 max-w-[720px] text-lg leading-8 text-slate-300 sm:text-xl">
                Explore your real prompt performance, skill strengths,
                improvement areas and progress over time.
              </p>

            </div>

            {/* 3D OBJECT */}

            <div className="perspective relative hidden h-[500px] items-center justify-center lg:flex">

              <div className="preserve-3d relative h-[420px] w-[420px]">

                <div className="glow-pulse absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/30 blur-[75px]" />

                <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/10" />

                <div className="orbit-one preserve-3d absolute left-1/2 top-1/2 h-[360px] w-[360px] rounded-full border border-purple-400/30">

                  <div className="ball-one absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-300 to-pink-600 shadow-[0_0_25px_rgba(236,72,153,0.8)]" />

                </div>

                <div className="orbit-two preserve-3d absolute left-1/2 top-1/2 h-[315px] w-[315px] rounded-full border border-pink-400/25">

                  <div className="ball-two absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-300 to-purple-600 shadow-[0_0_20px_rgba(217,70,239,0.8)]" />

                </div>

                <div className="orbit-three preserve-3d absolute left-1/2 top-1/2 h-[280px] w-[280px] rounded-full border border-orange-400/20">

                  <div className="ball-three absolute bottom-1 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 shadow-[0_0_25px_rgba(249,115,22,0.8)]" />

                </div>

                <div className="orbit-four preserve-3d absolute left-1/2 top-1/2 h-[230px] w-[230px] rounded-full border border-white/10">

                  <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" />

                </div>

                {/* CENTER SPHERE */}

                <div className="score-sphere absolute left-1/2 top-1/2 z-20 flex h-[205px] w-[205px] flex-col items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-orange-300 via-pink-500 to-purple-700">

                  <div className="absolute inset-[8px] rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm" />

                  <div className="absolute left-8 top-7 h-12 w-20 rotate-[-25deg] rounded-full bg-white/20 blur-md" />

                  <span className="relative z-10 text-6xl font-black tracking-tight text-white">
                    {averageScore}
                  </span>

                  <span className="relative z-10 mt-1 text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">
                    Average
                  </span>

                </div>

                <div className="ball-one absolute left-5 top-24 h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />

                <div className="ball-two absolute right-7 top-14 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.9)]" />

                <div className="ball-three absolute bottom-20 right-4 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.9)]" />

                <div className="absolute bottom-16 left-16 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)]" />

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <section className="relative z-20 -mt-10">

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(21,19,39,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(21,19,39,0.12)]">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                    Total Prompts
                  </p>

                  <h2 className="mt-4 text-5xl font-black text-slate-950">
                    {totalPrompts}
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    Evaluated prompts
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-2xl shadow-lg">
                  🎯
                </div>

              </div>

            </div>

            <div className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(21,19,39,0.08)] transition-all duration-300 hover:-translate-y-2">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                    Average Score
                  </p>

                  <h2 className="mt-4 text-5xl font-black text-slate-950">
                    {averageScore}
                    <span className="text-2xl text-slate-400">
                      /100
                    </span>
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    Current overall performance
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-2xl shadow-lg">
                  📊
                </div>

              </div>

            </div>

            <div className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(21,19,39,0.08)] transition-all duration-300 hover:-translate-y-2">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                    Best Score
                  </p>

                  <h2 className="mt-4 text-5xl font-black text-slate-950">
                    {bestScore}
                    <span className="text-2xl text-slate-400">
                      /100
                    </span>
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    Highest prompt score
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-2xl shadow-lg">
                  🏆
                </div>

              </div>

            </div>

            <div className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(21,19,39,0.08)] transition-all duration-300 hover:-translate-y-2">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                    Lowest Score
                  </p>

                  <h2 className="mt-4 text-5xl font-black text-slate-950">
                    {lowestScore}
                    <span className="text-2xl text-slate-400">
                      /100
                    </span>
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    Area with most room to improve
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-2xl shadow-lg">
                  🎯
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            CHARTS
        ===================================================== */}

        <section className="mt-12">

          <div className="grid gap-8 xl:grid-cols-2">

            <RadarSkillChart
              data={analytics.radar ?? []}
            />

            <SkillBarChart
              data={analytics.radar ?? []}
            />

          </div>

        </section>

        <section className="mt-12">

          <ScoreTrendChart />

        </section>

        {/* =====================================================
            SCORE + INSIGHTS
        ===================================================== */}

        <section className="mt-12">

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

            {/* SCORE CARD */}

            <div className="relative min-h-[700px] overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_55px_rgba(21,19,39,0.08)] sm:p-10">

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/30 blur-[90px]" />

              <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-purple-200/20 blur-[90px]" />

              <div className="relative z-10">

                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-purple-500">
                  Overall Performance
                </p>

                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-950">
                  Average Score
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-500">
                  Your overall prompt quality based on every evaluated prompt.
                </p>

                <div className="flex justify-center py-12">

                  <div className="relative flex h-64 w-64 items-center justify-center">

                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 via-pink-500/20 to-purple-500/20 blur-2xl" />

                    <div
                      className="relative flex h-64 w-64 items-center justify-center rounded-full p-[10px]"
                      style={{
                        background: `conic-gradient(
                          from 0deg,
                          #ff6b35 0deg,
                          #ec4899 ${averageScore * 3.6}deg,
                          #8b3de0 ${averageScore * 3.6}deg,
                          #e2e8f0 ${averageScore * 3.6}deg,
                          #e2e8f0 360deg
                        )`,
                      }}
                    >

                      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">

                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          Score
                        </span>

                        <span className="mt-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-6xl font-black text-transparent">
                          {averageScore}
                        </span>

                        <span className="text-sm font-semibold text-slate-400">
                          / 100
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4">

                  <span className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />

                  <div>

                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-500">
                      Current Level
                    </p>

                    <p className="mt-1 text-lg font-bold text-orange-600">
                      {masteryLevel}
                    </p>

                  </div>

                </div>

                <p className="mt-6 text-base leading-7 text-slate-500">
                  {averageScore >= 75
                    ? "You are building strong prompt engineering skills. Keep refining your weakest areas."
                    : "You have a foundation to build on. Focus on your weakest skills."
                  }
                </p>

                <div className="mt-8 grid grid-cols-2 border-t border-slate-200 pt-6">

                  <div>

                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      Achieved
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {averageScore}/100
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      Remaining
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {remainingScore}/100
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <InsightCard
              strongest={analytics.insights?.strongest ?? "-"}
              weakest={analytics.insights?.weakest ?? "-"}
              recommendation={
                analytics.insights?.recommendation ??
                "Keep practicing Prompt Engineering."
              }
            />

          </div>

        </section>

        {/* =====================================================
            SCORE DISTRIBUTION
        ===================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_55px_rgba(21,19,39,0.08)] sm:p-10">

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-100/40 blur-[90px]" />

          <div className="relative z-10">

            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-orange-500">
              Prompt Quality
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-950">
              Score Distribution
            </h2>

            <p className="mt-4 text-lg text-slate-500">
              How your evaluated prompts are distributed by quality.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 transition-all duration-300 hover:-translate-y-1">

                <div className="text-3xl">
                  🏆
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Excellent
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {distribution.excellent ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  85–100
                </p>

              </div>

              <div className="rounded-[24px] border border-blue-200 bg-blue-50 p-6 transition-all duration-300 hover:-translate-y-1">

                <div className="text-3xl">
                  ⚡
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Good
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {distribution.good ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  70–84
                </p>

              </div>

              <div className="rounded-[24px] border border-orange-200 bg-orange-50 p-6 transition-all duration-300 hover:-translate-y-1">

                <div className="text-3xl">
                  📈
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Average
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {distribution.average ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  50–69
                </p>

              </div>

              <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 transition-all duration-300 hover:-translate-y-1">

                <div className="text-3xl">
                  🎯
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Needs Work
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {distribution.poor ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Below 50
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PROMPT MASTERY
        ===================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-[32px] bg-[#08030f] p-8 shadow-[0_25px_70px_rgba(30,10,55,0.25)] sm:p-10">

          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-purple-700/20 blur-[110px]" />

          <div className="relative z-10">

            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-400">
              Prompt Mastery
            </p>

            <h2 className="mt-3 text-5xl font-black text-white">
              {masteryLevel}
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              Your mastery level is calculated from your real average prompt score.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">

                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Average Score
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  {averageScore}/100
                </p>

              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">

                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Best Score
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  {bestScore}/100
                </p>

              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">

                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Improvement Gap
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  +{improvement}
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}