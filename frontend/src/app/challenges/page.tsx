"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

interface Challenge {
  title: string;
  description: string;
  difficulty: string;
  xp_reward: number;
}

export default function ChallengesPage() {

  const router = useRouter();
  
  const [challenges, setChallenges] =
    useState<Challenge[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchChallenges();

  }, []);

  const fetchChallenges = async () => {

    try {

      const res = await API.get(
        "/challenges"
      );

      if (res.data.success) {

        setChallenges(
          res.data.challenges
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Loading Challenges...
        </h1>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-slate-950 text-white px-10 py-12">

      {/* Page Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          Prompt Challenges 🚀
        </h1>

        <p className="text-slate-400 text-lg">
          Complete challenges and improve your prompt engineering skills.
        </p>

      </div>

      {/* Challenge Cards */}

      <div className="grid lg:grid-cols-2 gap-8">

        {challenges.map(
          (challenge, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-blue-500 transition-all"
            >

              <div className="flex justify-between items-start mb-6">

                <div>

                  <h2 className="text-2xl font-bold mb-2">
                    {challenge.title}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">

                    {challenge.difficulty}

                  </span>

                </div>

                <div className="bg-blue-600 px-4 py-2 rounded-xl font-semibold">

                  {challenge.xp_reward} XP

                </div>

              </div>

              <p className="text-slate-400 leading-7 mb-8">

                {challenge.description}

              </p>

              <button
                onClick={() =>
                  router.push(
                    `/challenges/${index}`
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-4 rounded-2xl font-semibold"
              >

                Start Challenge

              </button>

            </div>

          )
        )}

      </div>

    </main>

  );
}