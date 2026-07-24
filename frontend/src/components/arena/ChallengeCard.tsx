"use client";

import Link from "next/link";

interface ChallengeCardProps {
  id: number;
  track: string;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  time: string;
}

export default function ChallengeCard({
  id,
  track,
  title,
  description,
  difficulty,
  xp,
  time,
}: ChallengeCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
          ⭐ {xp} XP
        </span>

      </div>

      <p className="mt-4 text-slate-600">
        {description}
      </p>

      <div className="flex gap-3 mt-6">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {difficulty}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          ⏱ {time}
        </span>

      </div>

      <Link href={`/challenges/${track}/${id}`}>

  <button
    className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
  >
    Start Challenge →
  </button>

</Link>
    </div>
  );
}