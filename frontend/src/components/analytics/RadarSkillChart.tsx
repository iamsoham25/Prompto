"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SkillData {
  skill: string;
  score: number;
}

export default function RadarSkillChart({
  data,
}: {
  data: SkillData[];
}) {
  return (
    <div className="analytics-chart-card group relative overflow-hidden">

      {/* Ambient glow */}
      <div className="analytics-card-glow analytics-glow-purple" />
      <div className="analytics-card-glow analytics-glow-pink" />

      {/* Header */}
      <div className="relative z-10">

        <div className="flex items-start justify-between">

          <div>
            <p className="analytics-eyebrow">
              SKILL INTELLIGENCE
            </p>

            <h2 className="analytics-chart-title">
              Skill Radar
            </h2>

            <p className="analytics-chart-description">
              Your current Prompt Engineering capability across seven dimensions.
            </p>
          </div>

          <div className="analytics-chart-icon purple">
            ◈
          </div>

        </div>

      </div>

      {/* Radar */}
      <div className="relative z-10 mt-4 h-[430px]">

        <ResponsiveContainer width="100%" height="100%">

          <RadarChart
            data={data || []}
            cx="50%"
            cy="50%"
            outerRadius="70%"
          >

            <PolarGrid
              stroke="#dfe3ee"
              strokeOpacity={0.9}
            />

            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 700,
              }}
            />

            <PolarRadiusAxis
              domain={[0, 100]}
              tick={{
                fill: "#94a3b8",
                fontSize: 10,
              }}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #e9d5ff",
                background: "rgba(255,255,255,.96)",
                boxShadow: "0 15px 40px rgba(15,23,42,.12)",
              }}
              formatter={(value) => [`${value}/100`, "Score"]}
            />

            <Radar
              name="Skill Score"
              dataKey="score"
              stroke="#8b3de0"
              strokeWidth={3}
              fill="url(#radarGradient)"
              fillOpacity={0.65}
              dot={{
                r: 4,
                fill: "#ec4899",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />

            <defs>

              <linearGradient
                id="radarGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#8b3de0"
                  stopOpacity={0.85}
                />

                <stop
                  offset="50%"
                  stopColor="#ec4899"
                  stopOpacity={0.65}
                />

                <stop
                  offset="100%"
                  stopColor="#ff5e1f"
                  stopOpacity={0.45}
                />
              </linearGradient>

            </defs>

          </RadarChart>

        </ResponsiveContainer>

        {/* Center score */}
        <div className="analytics-radar-center">

          <span>SKILL</span>

          <strong>
            {data?.length
              ? Math.round(
                  data.reduce(
                    (sum, item) => sum + Number(item.score || 0),
                    0
                  ) / data.length
                )
              : 0}
          </strong>

          <small>AVG</small>

        </div>

      </div>

      {/* Bottom information */}
      <div className="relative z-10 mt-2 flex items-center justify-between border-t border-slate-100 pt-5">

        <div>
          <p className="text-xs font-bold tracking-wider text-slate-400">
            DIMENSIONS
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {data?.length || 0}
          </p>
        </div>

        <div className="text-right">

          <p className="text-xs font-bold tracking-wider text-slate-400">
            STRONGEST
          </p>

          <p className="mt-1 text-lg font-bold text-purple-600">
            {data?.length
              ? data.reduce((best, item) =>
                  Number(item.score) > Number(best.score)
                    ? item
                    : best
                ).skill
              : "-"}
          </p>

        </div>

      </div>

    </div>
  );
}