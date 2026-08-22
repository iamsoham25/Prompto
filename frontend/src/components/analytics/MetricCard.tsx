"use client";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  accent?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon = "✦",
  accent = "from-orange-500 via-pink-500 to-purple-500",
}: MetricCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[26px]
        border border-slate-200
        bg-white
        p-6
        shadow-[0_15px_45px_rgba(21,19,39,0.06)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_25px_65px_rgba(21,19,39,0.12)]
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute -right-10 -top-10
          h-28 w-28 rounded-full
          bg-gradient-to-br ${accent}
          opacity-10 blur-2xl
          transition duration-500
          group-hover:opacity-20
        `}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`
            flex h-12 w-12 items-center justify-center
            rounded-2xl
            bg-gradient-to-br ${accent}
            text-xl text-white
            shadow-lg
            transition-transform duration-500
            group-hover:rotate-6
            group-hover:scale-110
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}