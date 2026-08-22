"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import RadarSkillChart from "@/components/analytics/RadarSkillChart";
import ScoreTrendChart from "@/components/analytics/ScoreTrendChart";
import SkillBarChart from "@/components/analytics/SkillBarChart";
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

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

          <p className="mt-5 text-lg font-semibold text-slate-600">
            Loading Analytics...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     NO ANALYTICS
  ========================================================= */

  if (!analytics) {
    return (
      <main className="min-h-screen bg-[#f7f7fb] flex items-center justify-center">
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

  /* =========================================================
     REAL DATA
  ========================================================= */

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

  const remainingScore = Math.max(
    100 - averageScore,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-slate-950">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1530px] px-6 pb-24 sm:px-8 lg:px-10">


        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="
            relative
            mt-0
            min-h-[560px]
            overflow-hidden
            rounded-b-[36px]
            bg-[#08030f]
            px-8
            py-16
            shadow-[0_25px_70px_rgba(30,10,55,0.25)]
            sm:px-12
            lg:px-16
          "
        >

          {/* Background grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.07]
              [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
              [background-size:52px_52px]
            "
          />

          {/* Purple glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              top-10
              h-[500px]
              w-[500px]
              rounded-full
              bg-purple-700/25
              blur-[130px]
            "
          />

          {/* Pink glow */}

          <div
            className="
              pointer-events-none
              absolute
              right-10
              top-32
              h-[350px]
              w-[350px]
              rounded-full
              bg-pink-600/20
              blur-[110px]
            "
          />

          {/* Orange glow */}

          <div
            className="
              pointer-events-none
              absolute
              -left-32
              bottom-0
              h-[350px]
              w-[350px]
              rounded-full
              bg-orange-500/10
              blur-[110px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              min-h-[460px]
              items-center
              gap-12
              lg:grid-cols-[1.15fr_0.85fr]
            "
          >

            {/* HERO LEFT */}

            <div>

              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-purple-400/20
                  bg-white/[0.05]
                  px-5
                  py-3
                  backdrop-blur-xl
                "
              >

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_12px_rgba(52,211,153,0.8)]
                  "
                />

                <span
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.2em]
                    text-slate-300
                  "
                >
                  AI Performance Intelligence
                </span>

              </div>

              {/* Small heading */}

              <p
                className="
                  mt-12
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.25em]
                  text-purple-300
                "
              >
                Prompt Engineering Analytics
              </p>

              {/* Main heading */}

              <h1
                className="
                  mt-5
                  max-w-[800px]
                  font-display
                  text-6xl
                  font-black
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-white
                  sm:text-7xl
                  lg:text-[82px]
                "
              >
                Understand.
                <br />

                Improve.
                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-orange-400
                    via-pink-500
                    to-purple-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Master prompts.
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-8
                  max-w-[720px]
                  text-lg
                  leading-8
                  text-slate-300
                  sm:text-xl
                "
              >
                Explore your real prompt performance, skill strengths,
                improvement areas and progress over time.
              </p>

            </div>


            {/* HERO RIGHT */}

            <div className="relative hidden min-h-[420px] items-center justify-center lg:flex">

              {/* Outer rings */}

              <div
                className="
                  absolute
                  h-[330px]
                  w-[330px]
                  animate-[spin_22s_linear_infinite]
                  rounded-full
                  border
                  border-purple-400/20
                  border-dashed
                "
              />

              <div
                className="
                  absolute
                  h-[270px]
                  w-[270px]
                  rounded-full
                  border
                  border-pink-400/20
                "
              />

              {/* Glow */}

              <div
                className="
                  absolute
                  h-[260px]
                  w-[260px]
                  rounded-full
                  bg-gradient-to-br
                  from-orange-400/30
                  via-pink-500/30
                  to-purple-600/30
                  blur-[70px]
                "
              />

              {/* Score sphere */}

              <div
                className="
                  relative
                  flex
                  h-52
                  w-52
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-gradient-to-br
                  from-orange-300
                  via-pink-500
                  to-purple-700
                  shadow-[0_0_80px_rgba(236,72,153,0.35)]
                "
              >

                <span className="text-6xl font-black text-white">
                  {averageScore}
                </span>

                <span
                  className="
                    mt-1
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white/80
                  "
                >
                  Average
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            KPI CARDS
        =================================================== */}

        <section className="relative z-20 -mt-10">

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {/* Total prompts */}

            <div
              className="
                group
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_15px_45px_rgba(21,19,39,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(21,19,39,0.12)]
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p
                    className="
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
                    Total Prompts
                  </p>

                  <h2 className="mt-4 text-5xl font-black text-slate-950">
                    {totalPrompts}
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    Evaluated prompts
                  </p>

                </div>

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-pink-500
                    to-purple-600
                    text-2xl
                    shadow-lg
                  "
                >
                  🎯
                </div>

              </div>

            </div>


            {/* Average */}

            <div
              className="
                group
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_15px_45px_rgba(21,19,39,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(21,19,39,0.12)]
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p
                    className="
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
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

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-purple-500
                    to-pink-500
                    text-2xl
                    shadow-lg
                  "
                >
                  📊
                </div>

              </div>

            </div>


            {/* Best */}

            <div
              className="
                group
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_15px_45px_rgba(21,19,39,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(21,19,39,0.12)]
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p
                    className="
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
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

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-emerald-400
                    to-cyan-500
                    text-2xl
                    shadow-lg
                  "
                >
                  🏆
                </div>

              </div>

            </div>


            {/* Lowest */}

            <div
              className="
                group
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_15px_45px_rgba(21,19,39,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(21,19,39,0.12)]
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p
                    className="
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
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

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-orange-400
                    to-pink-500
                    text-2xl
                    shadow-lg
                  "
                >
                  🎯
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            SKILL RADAR + SKILL COMPARISON
        =================================================== */}

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


        {/* ===================================================
            SCORE TREND
        =================================================== */}

        <section className="mt-12">

          <ScoreTrendChart />

        </section>


        {/* ===================================================
            AVERAGE SCORE + AI STRATEGY
        =================================================== */}

        <section className="mt-12">

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">


            {/* =================================================
                AVERAGE SCORE
            ================================================= */}

            <div
              className="
                relative
                min-h-[700px]
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200
                bg-white
                p-8
                shadow-[0_20px_55px_rgba(21,19,39,0.08)]
                sm:p-10
              "
            >

              {/* Background glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  bg-orange-200/30
                  blur-[90px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-20
                  h-72
                  w-72
                  rounded-full
                  bg-purple-200/20
                  blur-[90px]
                "
              />

              <div className="relative z-10">

                <p
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-purple-500
                  "
                >
                  Overall Performance
                </p>

                <h2
                  className="
                    mt-3
                    font-display
                    text-4xl
                    font-bold
                    tracking-tight
                    text-slate-950
                  "
                >
                  Average Score
                </h2>

                <p
                  className="
                    mt-4
                    text-base
                    leading-7
                    text-slate-500
                  "
                >
                  Your overall prompt quality based on every evaluated
                  prompt.
                </p>


                {/* SCORE CIRCLE */}

                <div className="flex justify-center py-12">

                  <div
                    className="
                      relative
                      flex
                      h-64
                      w-64
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-orange-400
                      via-pink-500
                      to-purple-600
                      p-[10px]
                      shadow-[0_0_70px_rgba(236,72,153,0.20)]
                    "
                  >

                    <div
                      className="
                        flex
                        h-full
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                      "
                    >

                      <span
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-slate-400
                        "
                      >
                        Score
                      </span>

                      <span
                        className="
                          mt-1
                          bg-gradient-to-r
                          from-purple-600
                          via-pink-500
                          to-orange-500
                          bg-clip-text
                          text-6xl
                          font-black
                          text-transparent
                        "
                      >
                        {averageScore}
                      </span>

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-slate-400
                        "
                      >
                        / 100
                      </span>

                    </div>

                  </div>

                </div>


                {/* CURRENT LEVEL */}

                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-orange-200
                    bg-orange-50
                    px-5
                    py-4
                  "
                >

                  <span
                    className="
                      h-3
                      w-3
                      rounded-full
                      bg-orange-500
                      shadow-[0_0_12px_rgba(249,115,22,0.6)]
                    "
                  />

                  <div>

                    <p
                      className="
                        text-[11px]
                        font-extrabold
                        uppercase
                        tracking-[0.16em]
                        text-orange-500
                      "
                    >
                      Current Level
                    </p>

                    <p
                      className="
                        mt-1
                        text-lg
                        font-bold
                        text-orange-600
                      "
                    >
                      {masteryLevel}
                    </p>

                  </div>

                </div>


                {/* DESCRIPTION */}

                <p
                  className="
                    mt-6
                    text-base
                    leading-7
                    text-slate-500
                  "
                >
                  {averageScore >= 75
                    ? "You are building strong prompt engineering skills. Keep refining your weakest areas."
                    : "You have a foundation to build on. Focus on your weakest skills."
                  }
                </p>


                {/* ACHIEVED / REMAINING */}

                <div
                  className="
                    mt-8
                    grid
                    grid-cols-2
                    border-t
                    border-slate-200
                    pt-6
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        font-extrabold
                        uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Achieved
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        text-slate-950
                      "
                    >
                      {averageScore}/100
                    </p>

                  </div>


                  <div className="text-right">

                    <p
                      className="
                        text-xs
                        font-extrabold
                        uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Remaining
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        text-slate-950
                      "
                    >
                      {remainingScore}/100
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                AI STRATEGY
            ================================================= */}

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


        {/* ===================================================
            SCORE DISTRIBUTION
        =================================================== */}

        <section
          className="
            relative
            mt-12
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-[0_20px_55px_rgba(21,19,39,0.08)]
            sm:p-10
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-purple-100/40
              blur-[90px]
            "
          />

          <div className="relative z-10">

            <p
              className="
                text-xs
                font-extrabold
                uppercase
                tracking-[0.22em]
                text-orange-500
              "
            >
              Prompt Quality
            </p>

            <h2
              className="
                mt-3
                text-4xl
                font-bold
                text-slate-950
              "
            >
              Score Distribution
            </h2>

            <p className="mt-4 text-lg text-slate-500">
              How your evaluated prompts are distributed by quality.
            </p>


            {/* DISTRIBUTION CARDS */}

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              {/* Excellent */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                <div className="text-3xl">
                  🏆
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Excellent
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {analytics.distribution?.excellent ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  85–100
                </p>

              </div>


              {/* Good */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-blue-200
                  bg-blue-50
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                <div className="text-3xl">
                  ⚡
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Good
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {analytics.distribution?.good ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  70–84
                </p>

              </div>


              {/* Average */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-orange-200
                  bg-orange-50
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                <div className="text-3xl">
                  📈
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Average
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {analytics.distribution?.average ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  50–69
                </p>

              </div>


              {/* Needs Work */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-red-200
                  bg-red-50
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                <div className="text-3xl">
                  🎯
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  Needs Work
                </p>

                <p className="mt-2 text-4xl font-black text-slate-950">
                  {analytics.distribution?.poor ?? 0}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Below 50
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            PROMPT MASTERY
        =================================================== */}

        <section
          className="
            relative
            mt-12
            overflow-hidden
            rounded-[32px]
            bg-[#08030f]
            p-8
            shadow-[0_25px_70px_rgba(30,10,55,0.25)]
            sm:p-10
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              top-0
              h-80
              w-80
              rounded-full
              bg-purple-700/20
              blur-[110px]
            "
          />

          <div className="relative z-10">

            <p
              className="
                text-xs
                font-extrabold
                uppercase
                tracking-[0.22em]
                text-emerald-400
              "
            >
              Prompt Mastery
            </p>

            <h2
              className="
                mt-3
                text-5xl
                font-black
                text-white
              "
            >
              {masteryLevel}
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                text-lg
                leading-8
                text-slate-400
              "
            >
              Your mastery level is calculated from your real average
              prompt score.
            </p>


            <div className="mt-10 grid gap-5 md:grid-cols-3">

              {/* Average */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                "
              >

                <p
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  Average Score
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  {averageScore}/100
                </p>

              </div>


              {/* Best */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                "
              >

                <p
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  Best Score
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  {bestScore}/100
                </p>

              </div>


              {/* Improvement */}

              <div
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                "
              >

                <p
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  Improvement Gap
                </p>

                <p className="mt-3 text-4xl font-black text-white">
                  +{Math.round(
                    Number(analytics.improvement ?? 0)
                  )}
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}