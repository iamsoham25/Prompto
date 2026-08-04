"use client";

import { useParams } from "next/navigation";
import { challengeTracks } from "@/data/challengeTracks";
import ChallengeCard from "@/components/arena/ChallengeCard";
import { useEffect, useState } from "react";
import API from "@/services/api";

type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  time: string;
  passScore: number;
  bonusScore: number;
  bonusXP: number;
};

type ProgressItem = {
  challenge_id: number;
  score?: number;
  completed?: boolean;
  xp?: number;
};

export default function TrackPage() {
  const params = useParams();

  const track =
    typeof params.track === "string"
      ? params.track
      : "";

  const challenges: Challenge[] =
    track && track in challengeTracks
      ? (challengeTracks[
          track as keyof typeof challengeTracks
        ] as Challenge[])
      : [];

  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        if (!email || !track) {
          setProgress([]);
          return;
        }

        const res = await API.get(
          `/challenge-progress/${encodeURIComponent(email)}/${encodeURIComponent(track)}`
        );

        if (res.data.success) {
          setProgress(res.data.progress ?? []);
        }
      } catch (err) {
        console.error("Failed to load challenge progress:", err);
      }
    };

    loadProgress();
  }, [track]);

  const completedChallenges = new Set(
    progress
      .filter((item) => item.completed !== false)
      .map((item) => item.challenge_id)
  );

  const completedCount = completedChallenges.size;

  const progressPercentage =
    challenges.length > 0
      ? Math.round(
          (completedCount / challenges.length) * 100
        )
      : 0;

  if (challenges.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Track not found.
      </div>
    );
  }

  const totalXP = challenges.reduce(
    (sum: number, challenge: Challenge) =>
      sum + challenge.xp,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Hero */}

      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">
            {track} Prompt Challenges
          </h1>

          <p className="mt-5 text-base sm:text-lg opacity-90">
            Practice real-world prompt engineering challenges.
          </p>

        </div>

      </section>


      {/* Stats */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

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


      {/* Track Progress */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-10">

          <h2 className="text-2xl sm:text-3xl font-bold">
            🚀 Track Progress
          </h2>

          <div className="mt-6 w-full bg-gray-200 rounded-full h-5 overflow-hidden">

            <div
              className="bg-green-500 h-5 rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />

          </div>

          <div className="mt-4 flex justify-between flex-wrap gap-2">

            <p className="text-lg">
              {completedCount} / {challenges.length} Challenges Completed
            </p>

            <p className="text-lg font-semibold text-green-600">
              {progressPercentage}%
            </p>

          </div>

        </div>

      </section>


      {/* Challenge List */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="space-y-8">

          {challenges.map((challenge: Challenge) => (

            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              track={track}
              title={challenge.title}
              description={challenge.description}
              difficulty={challenge.difficulty}
              xp={challenge.xp}
              time={challenge.time}
              completed={completedChallenges.has(
                challenge.id
              )}
            />

          ))}

        </div>

      </section>

    </main>
  );
}