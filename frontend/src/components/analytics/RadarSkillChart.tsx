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

interface Skill {
  skill: string;
  score: number;
}

export default function RadarSkillChart({
  data,
}: {
  data: Skill[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-500">
          Skill Intelligence
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Skill Radar
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your current Prompt Engineering capability across seven dimensions.
        </p>
      </div>

      <div className="relative mt-6 h-[420px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            No skill data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="70%"
            >
              <PolarGrid stroke="#e2e8f0" />

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
              />

              <Tooltip />

              <Radar
                dataKey="score"
                stroke="#8b3de0"
                fill="#8b3de0"
                fillOpacity={0.35}
                strokeWidth={3}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}