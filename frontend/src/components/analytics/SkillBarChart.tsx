"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Skill {
  skill: string;
  score: number;
}

export default function SkillBarChart({
  data,
}: {
  data: Skill[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-pink-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">
          Skill Breakdown
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Skill Comparison
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Compare the strength of each prompt engineering skill.
        </p>
      </div>

      <div className="mt-8 h-[420px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            No skill data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 50,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="skill"
                angle={-25}
                textAnchor="end"
                height={70}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />

              <Tooltip />

              <Bar
                dataKey="score"
                fill="#8b3de0"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}