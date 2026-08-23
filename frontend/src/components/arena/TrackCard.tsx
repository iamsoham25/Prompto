"use client";

import Link from "next/link";

interface TrackCardProps {
  title: string;
  slug: string;
  icon: string;
  description: string;
  difficulty: string;
  xp: number;
  challenges: number;
  color: string;
}

export default function TrackCard({
  title,
  slug,
  icon,
  description,
  difficulty,
  xp,
  challenges,
}: TrackCardProps) {
  const difficultyStyle =
    difficulty.toLowerCase() === "easy"
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : difficulty.toLowerCase() === "intermediate"
      ? "bg-blue-50 text-blue-600 border-blue-100"
      : difficulty.toLowerCase() === "advanced"
      ? "bg-purple-50 text-purple-600 border-purple-100"
      : "bg-orange-50 text-orange-600 border-orange-100";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">

      {/* ================= TOP ================= */}
      <div className="relative border-b border-slate-100 p-6">

        <div className="flex items-start justify-between gap-4">

          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>

          {/* XP */}
          <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
            ⭐ {xp} XP
          </span>

        </div>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-2 min-h-[52px] text-sm leading-6 text-slate-600">
          {description}
        </p>

      </div>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 flex-col p-6">

        {/* Metadata */}
        <div className="flex flex-wrap gap-2">

          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${difficultyStyle}`}
          >
            {difficulty}
          </span>

          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
            📝 {challenges} Challenges
          </span>

        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-100" />

        {/* Bottom information */}
        <div className="mb-5 flex items-center justify-between">

          <div>
            <p className="text-xs font-medium text-slate-400">
              Learning Track
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              Practice & improve
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-orange-50 group-hover:text-orange-500">
            →
          </div>

        </div>

        {/* Button */}
        <Link
          href={`/challenges/${slug}`}
          className="mt-auto block"
        >
          <button
            className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md"
          >
            Open Track →
          </button>
        </Link>

      </div>

    </div>
  );
}