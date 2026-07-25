"use client";

import { useParams } from "next/navigation";
import { challengeTracks } from "@/data/challengeTracks";
import ChallengeCard from "@/components/arena/ChallengeCard";
import { useEffect, useState } from "react";
import API from "@/services/api";

export default function TrackPage() {
  const { track } = useParams();

  const challenges =challengeTracks[track as string] || [];

  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {

    loadProgress();

  }, []);

  const completedChallenges = new Set(

    progress.map(

      (item) => item.challenge_id

        )

    );

  const completedCount = completedChallenges.size;

  const progressPercentage = Math.round(

      (completedCount / challenges.length) * 100

  );

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

  const loadProgress = async () => {

    try {

        const email = localStorage.getItem("userEmail");

        const res = await API.get(

            `/challenge-progress/${email}/${track}`

        );

        if(res.data.success){

            setProgress(res.data.progress);

        }

    } catch(err){

        console.log(err);

    }

}

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

      <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

<h2 className="text-3xl font-bold">

🚀 Track Progress

</h2>

<div className="mt-6 w-full bg-gray-200 rounded-full h-5">

<div

className="bg-green-500 h-5 rounded-full"

style={{

width:`${progressPercentage}%`

}}

>

</div>

</div>

<p className="mt-4 text-lg">

{completedCount} / {challenges.length}

Challenges Completed

</p>

</div>

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
              completed={completedChallenges.has(challenge.id)}
              locked={challenge.locked}
           />

          ))}

        </div>

      </section>

    </main>
  );
}