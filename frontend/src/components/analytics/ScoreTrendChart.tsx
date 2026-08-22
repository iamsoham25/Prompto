"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TrendItem {
  prompt: number;
  score: number;
  created_at?: string;
}

export default function ScoreTrendChart({
  data,
}: {
  data: TrendItem[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl lg:col-span-2">

      <div className="absolute right-[-80px] top-[-80px] h-48 w-48 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-500">
          Historical Performance
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Score Trend
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Track how your prompt quality has changed over time.
        </p>
      </div>

      <div className="mt-8 h-[400px]">

        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-slate-400">
            <div>
              <p className="font-bold">
                No prompt history yet.
              </p>

              <p className="mt-1 text-sm">
                Submit prompts in the Playground to build your trend.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="prompt"
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
                label={{
                  value: "Prompt",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#94a3b8",
                }}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#8b3de0"
                strokeWidth={4}
                dot={{
                  r: 4,
                  fill: "#8b3de0",
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  );
}