"use client";

import { useParams } from "next/navigation";
import { challengeTracks } from "@/data/challengeTracks";
import ChallengeCard from "@/components/arena/ChallengeCard";

export default function TrackPage() {
  const { track } = useParams();

  const challenges =
    challengeTracks[track as string] || [];

  if (challenges.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Track not found.
      </div>
    );
  }

  const totalXP = challenges.reduce(
    (sum, challenge) => sum + challenge.xp,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">

        <div className="max-w-7xl mx-auto px-8 py-14">

          <h1 className="text-5xl font-bold capitalize">
            {track} Prompt Challenges
          </h1>

          <p className="mt-5 text-lg opacity-90">
            Practice real-world prompt engineering challenges.
          </p>

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-8 py-10">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-slate-500">
              Challenges
            </h3>

            <p className="text-4xl font-bold mt-2">
              {challenges.length}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-slate-500">
              Total XP
            </h3>

            <p className="text-4xl font-bold mt-2">
              {totalXP}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-slate-500">
              Difficulty
            </h3>

            <p className="text-2xl font-bold mt-2">
              Easy → Hard
            </p>

          </div>

        </div>

      </section>

      {/* Challenge List */}

      <section className="max-w-7xl mx-auto px-8 pb-20">

        <div className="space-y-8">

          {challenges.map((challenge) => (

            <ChallengeCard
  key={challenge.id}
  id={challenge.id}
  track={track as string}
  title={challenge.title}
  description={challenge.description}
  difficulty={challenge.difficulty}
  xp={challenge.xp}
  time={challenge.time}
/>

          ))}

        </div>

      </section>

    </main>
  );
}