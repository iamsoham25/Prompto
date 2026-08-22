"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

export default function ScorePieChart({
  score,
}: {
  score: number;
}) {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  const data = [
    {
      name: "Current Score",
      value: safeScore,
    },
    {
      name: "Remaining",
      value: 100 - safeScore,
    },
  ];

  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

      <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
          Overall Performance
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Average Score
        </h2>
      </div>

      <div className="relative mt-5 h-[360px]">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={125}
              paddingAngle={4}
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill="#8b3de0" />
              <Cell fill="#e2e8f0" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-5xl font-black text-slate-950">
              {Math.round(safeScore)}
            </p>

            <p className="mt-1 text-sm font-bold text-slate-400">
              / 100
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}