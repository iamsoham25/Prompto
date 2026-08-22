"use client";

import { useEffect, useMemo, useState } from "react";

import API from "@/services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

interface TrendItem {
  prompt: number;
  score: number;
  created_at?: string;
}

export default function ScoreTrendChart() {
  const [chartData, setChartData] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrend();
  }, []);

  const loadTrend = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setLoading(false);
        return;
      }

      const res = await API.get(
        `/dashboard/prompt-trend/${email}`
      );

      if (res.data.success) {
        setChartData(res.data.trend || []);
      }
    } catch (err) {
      console.log("Trend loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Calculate useful statistics from REAL prompt data.
   */

  const statistics = useMemo(() => {
    if (!chartData.length) {
      return {
        average: 0,
        highest: 0,
        latest: 0,
        change: 0,
      };
    }

    const scores = chartData.map((item) =>
      Number(item.score || 0)
    );

    const average =
      scores.reduce((sum, score) => sum + score, 0) /
      scores.length;

    const highest = Math.max(...scores);

    const latest = scores[scores.length - 1] || 0;

    const first = scores[0] || 0;

    const change = latest - first;

    return {
      average: Math.round(average),
      highest: Math.round(highest),
      latest: Math.round(latest),
      change: Math.round(change),
    };
  }, [chartData]);

  /*
   * Format chart data.
   */

  const formattedData = useMemo(() => {
    return chartData.map((item, index) => ({
      ...item,
      promptLabel: `#${index + 1}`,
      score: Number(item.score || 0),
    }));
  }, [chartData]);

  return (
    <div className="analytics-trend-card group relative overflow-hidden">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="analytics-trend-glow analytics-trend-glow-one" />

      <div className="analytics-trend-glow analytics-trend-glow-two" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative z-10">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <p className="analytics-eyebrow">
              HISTORICAL PERFORMANCE
            </p>

            <h2 className="analytics-chart-title">
              Score Trend
            </h2>

            <p className="analytics-chart-description max-w-2xl">
              Track how your prompt quality has changed over time.
            </p>

          </div>

          {/* Latest score badge */}

          <div className="analytics-trend-current">

            <div className="analytics-trend-current-icon">
              ↗
            </div>

            <div>

              <p className="text-[10px] font-bold tracking-[0.16em] text-slate-400">
                LATEST SCORE
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-950">
                {statistics.latest}
                <span className="ml-1 text-sm font-semibold text-slate-400">
                  /100
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="analytics-trend-stat">

          <p>
            PROMPTS
          </p>

          <strong>
            {chartData.length}
          </strong>

        </div>

        <div className="analytics-trend-stat">

          <p>
            AVERAGE
          </p>

          <strong>
            {statistics.average}
          </strong>

        </div>

        <div className="analytics-trend-stat">

          <p>
            BEST
          </p>

          <strong>
            {statistics.highest}
          </strong>

        </div>

        <div className="analytics-trend-stat">

          <p>
            CHANGE
          </p>

          <strong
            className={
              statistics.change >= 0
                ? "text-emerald-500"
                : "text-red-500"
            }
          >
            {statistics.change >= 0 ? "+" : ""}
            {statistics.change}
          </strong>

        </div>

      </div>

      {/* =====================================================
          GRAPH
      ===================================================== */}

      <div className="relative z-10 mt-8 h-[460px]">

        {loading ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />

              <p className="mt-4 text-sm font-semibold text-slate-400">
                Loading score history...
              </p>

            </div>

          </div>

        ) : formattedData.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
                📈
              </div>

              <p className="mt-4 text-lg font-bold text-slate-800">
                No prompt history yet
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Evaluate prompts to start building your score trend.
              </p>

            </div>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                left: -10,
                bottom: 10,
              }}
            >

              <defs>

                <linearGradient
                  id="analyticsTrendFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#8b3de0"
                    stopOpacity={0.28}
                  />

                  <stop
                    offset="55%"
                    stopColor="#ec4899"
                    stopOpacity={0.10}
                  />

                  <stop
                    offset="100%"
                    stopColor="#ffffff"
                    stopOpacity={0}
                  />

                </linearGradient>

                <linearGradient
                  id="analyticsTrendLine"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >

                  <stop
                    offset="0%"
                    stopColor="#8b3de0"
                  />

                  <stop
                    offset="55%"
                    stopColor="#ec4899"
                  />

                  <stop
                    offset="100%"
                    stopColor="#ff5e1f"
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="3 5"
                vertical={false}
              />

              <XAxis
                dataKey="promptLabel"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                  fontWeight: 600,
                }}
                axisLine={{
                  stroke: "#cbd5e1",
                }}
                tickLine={false}
                minTickGap={18}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#c084fc",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: "18px",
                  border: "1px solid #e9d5ff",
                  background: "rgba(255,255,255,.97)",
                  boxShadow:
                    "0 20px 45px rgba(15,23,42,.14)",
                  padding: "12px 16px",
                }}
                labelFormatter={(label) =>
                  `Prompt ${String(label).replace("#", "")}`
                }
                formatter={(value) => [
                  `${value}/100`,
                  "Score",
                ]}
              />

              <Area
                type="monotone"
                dataKey="score"
                stroke="url(#analyticsTrendLine)"
                strokeWidth={4}
                fill="url(#analyticsTrendFill)"
                animationDuration={1800}
                animationEasing="ease-out"
                activeDot={{
                  r: 7,
                  stroke: "#ffffff",
                  strokeWidth: 3,
                  fill: "#ec4899",
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="relative z-10 mt-2 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(139,61,224,.6)]" />

          <p className="text-sm font-medium text-slate-500">
            Real prompt evaluation history
          </p>

        </div>

        <p className="text-xs font-semibold text-slate-400">
          {chartData.length > 0
            ? `Tracking ${chartData.length} evaluated prompts`
            : "Waiting for prompt evaluations"}
        </p>

      </div>

    </div>
  );
}