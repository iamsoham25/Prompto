"use client";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
}: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_12px_35px_rgba(21,19,39,.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(21,19,39,.13)]">

      {/* animated glow */}

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-400/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-pink-400/20" />

      <div className="relative z-10">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs font-bold tracking-[0.18em] text-slate-400">
              {title.toUpperCase()}
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 transition-transform duration-500 group-hover:scale-[1.03] origin-left">
              {value}
            </h2>

          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-xl shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
            {title === "Total Prompts" && "🎯"}
            {title === "Average Score" && "📊"}
            {title === "Best Score" && "🏆"}
            {title === "Lowest Score" && "📉"}
          </div>

        </div>

        {subtitle && (
          <p className="mt-4 text-sm text-slate-400">
            {subtitle}
          </p>
        )}

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-all duration-1000 group-hover:w-full"
            style={{
              width:
                title === "Average Score"
                  ? `${Math.min(Number(value) || 0, 100)}%`
                  : title === "Best Score"
                  ? `${Math.min(Number(value) || 0, 100)}%`
                  : "55%",
            }}
          />

        </div>

      </div>

    </div>
  );
}