"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface SkillData {
  skill: string;
  score: number;
}

export default function SkillBarChart({
  data,
}: {
  data: SkillData[];
}) {
  return (
    <div className="analytics-chart-card group relative overflow-hidden">

      {/* Ambient glow */}
      <div className="analytics-card-glow analytics-glow-orange" />
      <div className="analytics-card-glow analytics-glow-purple" />

      {/* Header */}
      <div className="relative z-10">

        <div className="flex items-start justify-between">

          <div>

            <p className="analytics-eyebrow pink">
              SKILL BREAKDOWN
            </p>

            <h2 className="analytics-chart-title">
              Skill Comparison
            </h2>

            <p className="analytics-chart-description">
              Compare the strength of each Prompt Engineering skill.
            </p>

          </div>

          <div className="analytics-chart-icon pink">
            ◫
          </div>

        </div>

      </div>

      {/* Chart */}
      <div className="relative z-10 mt-8 h-[430px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data || []}
            margin={{
              top: 20,
              right: 15,
              left: 0,
              bottom: 45,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 5"
              stroke="#dce1eb"
              vertical={false}
            />

            <XAxis
              dataKey="skill"
              angle={-20}
              textAnchor="end"
              height={65}
              tick={{
                fill: "#64748b",
                fontSize: 11,
                fontWeight: 700,
              }}
              axisLine={{
                stroke: "#cbd5e1",
              }}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(139,61,224,.05)",
              }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #e9d5ff",
                background: "rgba(255,255,255,.97)",
                boxShadow: "0 15px 40px rgba(15,23,42,.12)",
              }}
              formatter={(value) => [`${value}/100`, "Score"]}
            />

            <Bar
              dataKey="score"
              radius={[10, 10, 4, 4]}
              maxBarSize={52}
              animationDuration={1600}
              animationEasing="ease-out"
            >

              {(data || []).map((entry, index) => {

                const score = Number(entry.score || 0);

                let fill = "#8b3de0";

                if (score >= 75) {
                  fill = "#ec4899";
                } else if (score < 40) {
                  fill = "#ff5e1f";
                }

                return (
                  <Cell
                    key={`skill-cell-${index}`}
                    fill={fill}
                  />
                );

              })}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Skill mini cards */}
      <div className="relative z-10 mt-2 grid grid-cols-3 gap-3">

        {(data || [])
          .slice()
          .sort(
            (a, b) =>
              Number(b.score || 0) -
              Number(a.score || 0)
          )
          .slice(0, 3)
          .map((item, index) => (

            <div
              key={item.skill}
              className="analytics-mini-skill"
            >

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold text-slate-400">
                  #{index + 1}
                </span>

                <span className="text-xs font-bold text-purple-500">
                  {Math.round(Number(item.score || 0))}
                </span>

              </div>

              <p className="mt-2 truncate text-sm font-bold text-slate-800">
                {item.skill}
              </p>

            </div>

          ))}

      </div>

    </div>
  );
}