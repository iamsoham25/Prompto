"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/services/api";

export default function ChallengeDetailPage() {

  const params = useParams();

  const [challenge, setChallenge] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState<any>(null);

  const [completed, setCompleted] = useState(false);

  const [evaluating, setEvaluating] = useState(false);

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

  if (!answer.trim()) {

    alert("Enter a prompt");

    return;

  }

  try {

    setEvaluating(true);

    const res =
      await API.post(
        "/evaluate-challenge",
        {
          prompt: answer,
          target_score:
            challenge.target_score
        }
      );

    if (res.data.success) {

      setResult(
        res.data.result
      );

      if (
        res.data.result.passed
      ) {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        await API.post(
          "/complete-challenge",
          {
            user_email: email,
            challenge_id:
              Number(
                params.id
              ),
            xp_earned:
              challenge.xp_reward
          }
        );

        setCompleted(true);

      }

    }

  } catch (error) {

    console.log(error);

  } finally {

    setEvaluating(false);

  }

};

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl font-bold">

        Loading Challenge...

      </div>

    );

  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Challenge Not Found
      </div>
    );
  }

  return (

    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">

          {challenge.title}

        </h1>

        <div className="bg-white border border-slate-200 shadow-lg rounded-3xl p-8">

          <div className="flex gap-4 mb-6">

            <span
              className=" bg-blue-100 text-blue-600 px-4 py-2 rounded-xl"
            >
              🎯 {challenge.target_score}
            </span>

            <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-xl">

              {challenge.difficulty}

            </span>

            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl">

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
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 mb-6 outline-none focus:ring-2 focus:ring-orange-400"
          />

          {!completed ? (

            <>
              <button
                onClick={
                  submitChallenge
                }
                className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-semibold"
              >
                {evaluating
                  ? "Evaluating..."
                  : "Evaluate Prompt"}
              </button>

              {result && (

                <div
                  className=" mt-8 border-t pt-8 "
                >

                  <h2
                    className=" text-2xl font-bold mb-4 "
                  >
                    🏆 Challenge Result
                  </h2>

                  <div className=" grid md:grid-cols-3 gap-4 mb-6 "
                  >

                    <div
                      className=" bg-blue-50 rounded-2xl p-4 text-center "
                    >
                      <p>Score</p>

                      <h3
                        className=" text-3xl font-bold "
                      >
                        {result.score}/10
                      </h3>

                    </div>

                  <div
                    className=" bg-purple-50 rounded-2xl p-4 text-center "
                  >
                    <p>Target</p>

                    <h3
                      className=" text-3xl font-bold "
                    >
                      {result.target_score}
                    </h3>

                  </div>

                  <div
                    className={`
                    rounded-2xl
                    p-4
                    text-center
                    ${
                      result.passed
                      ? "bg-green-50"
                      : "bg-red-50"
                    }
                  `}
                  >

                    <p>Status</p>

                    <h3
                      className=" text-2xl font-bold "
                    >

                      {result.passed
                        ? "✅ PASS"
                        : "❌ FAIL"}

                    </h3>
            
                  </div>

                </div>

                <h3
                  className=" text-xl font-bold mb-3 "
                >
                  Weaknesses
                </h3>

                <div className="mb-6">

                  {result.weaknesses
                    ?.length > 0 ? (

                    result.weaknesses.map(
                      (
                        item: string,
                        index: number
                      ) => (

                        <p
                          key={index}
                          className=" text-red-500 mb-2
            "
                        >
                          ❌ {item}
                        </p>

                      )
                    )

                  ) : (

                    <p
                      className=" text-green-600 "
                    >
                      No weaknesses detected
                    </p>

                  )}

                </div>

                <h3
                  className=" text-xl font-bold mb-3 "
                >
                  Professional Example
                </h3>

                <div
                  className=" bg-slate-100 rounded-2xl p-4 whitespace-pre-wrap "
                >
                  {
                    result.professional_prompt
                  }
                </div>

              </div>

            )}

          </>

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