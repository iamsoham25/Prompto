"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/services/api";

export default function ChallengeDetailPage() {

  const params = useParams();

  const [challenge, setChallenge] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [answer, setAnswer] =
    useState("");

  const [completed, setCompleted] =
    useState(false);

  useEffect(() => {

    fetchChallenge();

  }, []);

  const fetchChallenge = async () => {

    try {

      const res = await API.get(
        `/challenge/${params.id}`
      );

      if (res.data.success) {

        setChallenge(
          res.data.challenge
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const submitChallenge = async () => {

    const email =
      localStorage.getItem(
        "userEmail"
      );

    if (!email) {

      alert("Please login");

      return;

    }

    try {

      const res = await API.post(
        "/complete-challenge",
        {
          user_email: email,
          challenge_id: Number(
            params.id
          ),
          xp_earned:
            challenge.xp_reward,
        }
      );

      if (res.data.success) {

        alert(
          `🎉 Challenge Completed!\n+${res.data.xp_earned} XP`
        );

        setCompleted(true);

      } else {

        alert(
          res.data.message
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Failed to submit challenge"
      );

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl font-bold">

        Loading Challenge...

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">

          {challenge.title}

        </h1>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

          <div className="flex gap-4 mb-6">

            <span className="bg-blue-600 px-4 py-2 rounded-xl">

              {challenge.difficulty}

            </span>

            <span className="bg-green-600 px-4 py-2 rounded-xl">

              {challenge.xp_reward} XP

            </span>

          </div>

          <p className="text-slate-400 mb-8">

            {challenge.description}

          </p>

          <textarea
            placeholder="Write your prompt here..."
            rows={8}
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 mb-6 outline-none"
          />

          {!completed ? (

            <button
              onClick={
                submitChallenge
              }
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold"
            >
              Submit Answer
            </button>

          ) : (

            <div className="bg-green-600/20 border border-green-500 text-green-400 px-6 py-4 rounded-2xl">

              🎉 Challenge Completed

            </div>

          )}

        </div>

      </div>

    </main>

  );

}