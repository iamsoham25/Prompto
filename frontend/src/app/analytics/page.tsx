"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import MetricCard from "@/components/analytics/MetricCard";
import RadarSkillChart from "@/components/analytics/RadarSkillChart";
import ScoreTrendChart from "@/components/analytics/ScoreTrendChart";
import SkillBarChart from "@/components/analytics/SkillBarChart";
import ScorePieChart from "@/components/analytics/ScorePieChart";
import InsightCard from "@/components/analytics/InsightCard";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
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

      const res = await API.get(`/dashboard/analytics/${email}`);

      if (res.data.success) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.log("Analytics loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
          <p className="text-lg font-semibold text-slate-700">
            Loading your analytics...
          </p>
        </div>
      </main>
    );
  }

  if (!analytics) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f7fb]">
        <div className="rounded-3xl bg-white px-10 py-12 shadow-xl text-center">
          <p className="text-2xl font-bold text-slate-900">
            No Analytics Found
          </p>
          <p className="mt-2 text-slate-500">
            Evaluate a few prompts to start building your analytics.
          </p>
        </div>
      </main>
    );
  }

  const average = Number(analytics.cards.average_score || 0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7fb]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#080611] text-white">

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">

          <div
            className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-purple-600/30 blur-[110px]"
            style={{
              animation: "analyticsOrbOne 9s ease-in-out infinite",
            }}
          />

          <div
            className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-pink-600/25 blur-[130px]"
            style={{
              animation: "analyticsOrbTwo 11s ease-in-out infinite",
            }}
          />

          <div
            className="absolute bottom-[-180px] left-[40%] h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-[120px]"
            style={{
              animation: "analyticsOrbThree 13s ease-in-out infinite",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />

        </div>

        <div className="prompto-container relative z-10 py-20 md:py-24">

          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">

            {/* LEFT */}

            <div>

              <div
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)] animate-pulse" />

                <span className="text-xs font-bold tracking-[0.18em] text-purple-200">
                  AI PERFORMANCE INTELLIGENCE
                </span>
              </div>

              <p className="mb-4 text-sm font-bold tracking-[0.25em] text-purple-300">
                PROMPT ENGINEERING ANALYTICS
              </p>

              <h1 className="max-w-4xl font-display text-6xl font-bold leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[82px]">
                Understand.
                <br />
                Improve.
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                  Master prompts.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Explore your real prompt performance, skill strengths,
                improvement areas and progress over time.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl">
                  <p className="text-xs font-semibold tracking-wider text-slate-400">
                    PROMPTS ANALYZED
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {analytics.cards.total_prompts}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl">
                  <p className="text-xs font-semibold tracking-wider text-slate-400">
                    MASTERY
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {analytics.mastery_level}
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT — 3D SCORE */}

            <div className="relative flex min-h-[430px] items-center justify-center">

              {/* outer rings */}

              <div
                className="absolute h-[370px] w-[370px] rounded-full border border-purple-400/20"
                style={{
                  animation: "analyticsRotate 20s linear infinite",
                }}
              />

              <div
                className="absolute h-[315px] w-[315px] rounded-full border border-pink-400/20 border-dashed"
                style={{
                  animation: "analyticsRotateReverse 16s linear infinite",
                }}
              />

              <div className="absolute h-[260px] w-[260px] rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700 opacity-30 blur-3xl" />

              {/* score sphere */}

              <div
                className="relative flex h-[235px] w-[235px] items-center justify-center rounded-full border border-white/30 shadow-[0_0_90px_rgba(236,72,153,.5)]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, #ffd2bc 0%, #ff719e 22%, #d629a5 48%, #6414a8 78%, #240b45 100%)",
                  animation: "analyticsFloat 5s ease-in-out infinite",
                }}
              >

                <div className="absolute left-[48px] top-[35px] h-12 w-20 rounded-full bg-white/40 blur-xl" />

                <div className="relative text-center">

                  <p className="font-display text-7xl font-bold tracking-tight">
                    {Math.round(average)}
                  </p>

                  <p className="mt-[-4px] text-sm font-bold tracking-[0.2em] text-white/80">
                    AVERAGE
                  </p>

                </div>

              </div>

              {/* floating badge */}

              <div
                className="absolute right-0 top-8 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur-xl"
                style={{
                  animation: "analyticsFloatTwo 6s ease-in-out infinite",
                }}
              >
                <p className="text-[10px] font-bold tracking-[0.18em] text-purple-300">
                  BEST SCORE
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {analytics.cards.best_score}
                </p>
              </div>

              <div
                className="absolute bottom-10 left-0 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur-xl"
                style={{
                  animation: "analyticsFloatThree 7s ease-in-out infinite",
                }}
              >
                <p className="text-[10px] font-bold tracking-[0.18em] text-pink-300">
                  IMPROVEMENT
                </p>

                <p className="mt-1 text-2xl font-bold">
                  +{analytics.improvement}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          KPI SECTION
      ===================================================== */}

      <section className="relative z-20 -mt-8">

        <div className="prompto-container">

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <MetricCard
              title="Total Prompts"
              value={analytics.cards.total_prompts}
              subtitle="Evaluated prompts"
            />

            <MetricCard
              title="Average Score"
              value={`${analytics.cards.average_score}/100`}
              subtitle="Current overall performance"
            />

            <MetricCard
              title="Best Score"
              value={`${analytics.cards.best_score}/100`}
              subtitle="Highest prompt score"
            />

            <MetricCard
              title="Lowest Score"
              value={`${analytics.cards.lowest_score}/100`}
              subtitle="Area with most room to improve"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          ANALYTICS CONTENT
      ===================================================== */}

      <div className="prompto-container py-16">

        <div className="grid gap-8 lg:grid-cols-2">

          <RadarSkillChart data={analytics.radar} />

          <SkillBarChart data={analytics.radar} />

        </div>

        <div className="mt-8">

          <ScoreTrendChart />

        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <ScorePieChart
            score={analytics.cards.average_score}
          />

          <InsightCard
            strongest={analytics.insights.strongest}
            weakest={analytics.insights.weakest}
            recommendation={analytics.insights.recommendation}
          />

        </div>

      </div>

    </main>
  );
}