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
  color,
}: TrackCardProps) {
  return (
    <div className=" bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 " >
      {/* Top Gradient */}
      <div className={`bg-gradient-to-r ${color} p-6 text-white`} >
        <div className="text-5xl">{icon}</div>

        <h2 className="mt-4 text-2xl font-bold">
          {title}
        </h2>
      </div>

      {/* Body */}
      <div className="p-6">

        <p className="text-slate-600 leading-relaxed min-h-[70px]">
          {description}
        </p>

        {/* Badges */}

        <div className="flex flex-wrap gap-3 mt-6">

          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">
            {difficulty}
          </span>

          <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm">
            ⭐ {xp} XP
          </span>

          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm">
            📝 {challenges} Challenges
          </span>

        </div>

        {/* Button */}

        <Link href={`/challenges/${slug}`}>
          <button
            className=" mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition "
          >
            Open Track →
          </button>
        </Link>

      </div>
    </div>
  );
}