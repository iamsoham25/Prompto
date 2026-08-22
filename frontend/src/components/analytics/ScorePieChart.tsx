"use client";

import { useMemo } from "react";

interface ScorePieChartProps {
  score: number;
}

export default function ScorePieChart({
  score,
}: ScorePieChartProps) {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score || 0))
  );

  const remaining = 100 - safeScore;

  const scoreLabel = Math.round(safeScore);

  const performance = useMemo(() => {
    if (safeScore >= 90) {
      return {
        label: "Excellent",
        description:
          "Your prompt engineering performance is at an exceptional level.",
        className: "excellent",
      };
    }

    if (safeScore >= 75) {
      return {
        label: "Advanced",
        description:
          "You are consistently producing strong prompt structures.",
        className: "advanced",
      };
    }

    if (safeScore >= 60) {
      return {
        label: "Intermediate",
        description:
          "Your foundation is developing well. Keep improving consistency.",
        className: "intermediate",
      };
    }

    return {
      label: "Beginner",
      description:
        "You have a foundation to build on. Focus on your weakest skills.",
      className: "beginner",
    };
  }, [safeScore]);

  /*
   * SVG circle calculations.
   *
   * Radius = 108
   * Circumference = 2πr
   */

  const radius = 108;

  const circumference = 2 * Math.PI * radius;

  const progressOffset =
    circumference -
    (safeScore / 100) * circumference;

  return (
    <div className="analytics-score-card group relative overflow-hidden">

      {/* =====================================================
          AMBIENT LIGHT
      ===================================================== */}

      <div className="analytics-score-glow analytics-score-glow-one" />

      <div className="analytics-score-glow analytics-score-glow-two" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative z-10">

        <p className="analytics-eyebrow orange">
          OVERALL PERFORMANCE
        </p>

        <h2 className="analytics-chart-title">
          Average Score
        </h2>

        <p className="analytics-chart-description">
          Your overall prompt quality based on every evaluated prompt.
        </p>

      </div>

      {/* =====================================================
          SCORE RING
      ===================================================== */}

      <div className="relative z-10 flex min-h-[390px] items-center justify-center">

        {/* Rotating outer ring */}

        <div
          className="analytics-score-orbit"
          style={{
            animation:
              "analyticsScoreOrbit 18s linear infinite",
          }}
        >
          <span />
        </div>

        {/* Secondary orbit */}

        <div
          className="analytics-score-orbit-secondary"
          style={{
            animation:
              "analyticsScoreOrbitReverse 14s linear infinite",
          }}
        />

        {/* Main glow */}

        <div className="analytics-score-main-glow" />

        {/* Main SVG */}

        <div
          className="relative"
          style={{
            width: 280,
            height: 280,
          }}
        >

          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            className="analytics-score-svg"
          >

            {/* Background circle */}

            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="#e8edf5"
              strokeWidth="22"
            />

            {/* Progress circle */}

            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="url(#scoreRingGradient)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              transform="rotate(-90 140 140)"
              className="analytics-score-progress"
            />

            <defs>

              <linearGradient
                id="scoreRingGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#8b3de0"
                />

                <stop
                  offset="50%"
                  stopColor="#ec4899"
                />

                <stop
                  offset="100%"
                  stopColor="#ff5e1f"
                />

              </linearGradient>

            </defs>

          </svg>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <p className="text-[10px] font-extrabold tracking-[0.22em] text-slate-400">
              SCORE
            </p>

            <p className="mt-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
              {scoreLabel}
            </p>

            <p className="text-sm font-semibold text-slate-400">
              / 100
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          PERFORMANCE STATUS
      ===================================================== */}

      <div className="relative z-10">

        <div
          className={`analytics-performance-pill ${performance.className}`}
        >

          <div className="analytics-performance-dot" />

          <div>

            <p className="text-[10px] font-bold tracking-[0.16em]">
              CURRENT LEVEL
            </p>

            <p className="mt-1 text-lg font-bold">
              {performance.label}
            </p>

          </div>

        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          {performance.description}
        </p>

      </div>

      {/* =====================================================
          SCORE BREAKDOWN
      ===================================================== */}

      <div className="relative z-10 mt-7 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">

        <div>

          <p className="text-[10px] font-bold tracking-[0.16em] text-slate-400">
            ACHIEVED
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {scoreLabel}
            <span className="ml-1 text-sm font-medium text-slate-400">
              points
            </span>
          </p>

        </div>

        <div className="text-right">

          <p className="text-[10px] font-bold tracking-[0.16em] text-slate-400">
            REMAINING
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {Math.round(remaining)}
            <span className="ml-1 text-sm font-medium text-slate-400">
              points
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}