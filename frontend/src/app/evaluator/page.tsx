"use client";

import { useState } from "react";
import API from "@/services/api";

export default function EvaluatorPage() {

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [evaluation, setEvaluation] = useState<any>(null);

  const evaluatePrompt = async () => {

    if (!prompt.trim()) {

      alert("Please enter a prompt.");

      return;

    }

    try {

      setLoading(true);

      const email =
        localStorage.getItem("userEmail");

      const response = await API.post(
        "/evaluate-prompt",
        {
          prompt,
          user_email: email
        }
      );

      if (response.data.success) {

        setEvaluation(
          response.data.evaluation
        );

      }

    } catch (error) {

      console.log(error);

      alert("Evaluation Failed.");

    } finally {

      setLoading(false);

    }

  };

  function MetricCard({

    title,

    value,

  }: {

    title: string;

    value: number;

  }) {

    return (

      <div className="border rounded-2xl p-5">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">

            {title}

          </span>

          <span className="font-bold text-blue-600">

            {value}

          </span>

        </div>

        <div className="w-full h-3 rounded-full bg-slate-200">

          <div

            className="h-3 rounded-full bg-blue-600 transition-all duration-500"

            style={{

              width: `${value}%`

            }}

          />

        </div>

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HERO */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-10 shadow-xl">

          <h1 className="text-5xl font-bold">

            🧠 AI Prompt Evaluator

          </h1>

          <p className="mt-4 text-lg opacity-90">

            Analyze your prompts like a professional Prompt Engineer.

          </p>

        </div>

        {/* INPUT */}

        <div className="bg-white mt-8 rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">

            Enter your Prompt

          </h2>

          <textarea

            value={prompt}

            onChange={(e) =>
              setPrompt(e.target.value)
            }

            rows={10}

            placeholder="Write your prompt here..."

            className="w-full rounded-2xl border border-slate-300 p-5 resize-none outline-none focus:ring-2 focus:ring-blue-500"

          />

          <button

            onClick={evaluatePrompt}

            disabled={loading}

            className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-2xl font-semibold"

          >

            {

              loading

                ? "Analyzing..."

                : "🚀 Evaluate Prompt"

            }

          </button>

        </div>

        {/* RESULT PLACEHOLDER */}

        {
          evaluation && (

            <div className="mt-10 space-y-8">

              {/* =======================================================
                  OVERALL SCORE
              ======================================================= */}

              <div className="bg-white rounded-3xl shadow-xl p-10">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-4xl font-bold">

                      📊 Prompt Quality

                    </h2>

                    <p className="text-slate-500 mt-2">

                      AI Evaluation Result

                    </p>

                  </div>

                  <div className="text-center">

                    <div className="text-7xl font-bold text-blue-600">

                      {evaluation.overall_score}

                    </div>

                    <div className="text-slate-500">

                      /100

                    </div>

                  </div>

                </div>

              </div>

              {/* =======================================================
                  QUALITY BADGE
              ======================================================= */}

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h3 className="text-xl font-bold mb-5">

                    🎯 Quality Level

                  </h3>

                  <div
                    className={`inline-flex px-6 py-3 rounded-full font-semibold text-lg

                    ${
                      evaluation.overall_score >= 85
                        ? "bg-green-100 text-green-700"

                      : evaluation.overall_score >= 70
                        ? "bg-blue-100 text-blue-700"

                      : evaluation.overall_score >= 50
                        ? "bg-yellow-100 text-yellow-700"

                      : "bg-red-100 text-red-700"
                    }

                    `}
                  >

                    {

                      evaluation.overall_score >= 85
                        ? "Excellent"

                      : evaluation.overall_score >= 70
                        ? "Good"

                      : evaluation.overall_score >= 50
                        ? "Average"

                      : "Needs Improvement"

                    }

                  </div>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h3 className="text-xl font-bold mb-5">

                    🏆 Difficulty

                  </h3>

                  <div className="text-3xl font-bold text-indigo-600">

                    {evaluation.difficulty}

                  </div>

                </div>

              </div>

              {/* =======================================================
                  SCORE GRID
              ======================================================= */}

              <div className="bg-white rounded-3xl shadow-lg p-8">

                <h2 className="text-3xl font-bold mb-8">

                  📈 Prompt Metrics

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  <MetricCard
                    title="Clarity"
                    value={evaluation.clarity}
                  />

                  <MetricCard
                    title="Specificity"
                    value={evaluation.specificity}
                  />

                  <MetricCard
                    title="Context"
                    value={evaluation.context}
                  />

                  <MetricCard
                    title="Constraints"
                    value={evaluation.constraints}
                  />

                  <MetricCard
                    title="Role"
                    value={evaluation.role}
                  />

                  <MetricCard
                    title="Output Format"
                    value={evaluation.output_format}
                  />

                  <MetricCard
                    title="Examples"
                    value={evaluation.examples}
                  />

                </div>

              </div>

              {/* =======================================================
                  STRENGTHS & IMPROVEMENTS
              ======================================================= */}

              <div className="grid lg:grid-cols-2 gap-8">

                {/* Strengths */}

                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h2 className="text-2xl font-bold text-green-600 mb-6">

                    💪 Strengths

                  </h2>

                  {

                    evaluation.strengths?.length > 0 ? (

                      <ul className="space-y-4">

                        {

                          evaluation.strengths.map(

                            (item: string, index: number) => (

                              <li
                                key={index}
                                className="flex gap-3 items-start"
                              >

                                <span className="text-green-600">

                                  ✔

                                </span>

                                <span>

                                  {item}

                                </span>

                              </li>

                            )

                          )

                        }

                      </ul>

                    ) : (

                      <p className="text-slate-500">

                        No strengths detected.

                      </p>

                    )

                  }

                </div>

                {/* Improvements */}

                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h2 className="text-2xl font-bold text-orange-600 mb-6">

                    ⚠ Improvements

                  </h2>

                  {

                    evaluation.improvements?.length > 0 ? (

                      <ul className="space-y-4">

                        {

                          evaluation.improvements.map(

                            (item: string, index: number) => (

                              <li
                                key={index}
                                className="flex gap-3 items-start"
                              >

                                <span className="text-orange-600">

                                  ➜

                                </span>

                                <span>

                                  {item}

                                </span>

                              </li>

                            )

                          )

                        }

                      </ul>

                    ) : (

                      <p className="text-slate-500">

                        Excellent Prompt!

                      </p>

                    )

                  }

                </div>

              </div>

            </div>

          )
        }

      </div>

    </main>

  );

}

