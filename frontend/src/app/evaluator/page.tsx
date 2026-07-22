"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

export default function EvaluatorPage() {

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [evaluation, setEvaluation] = useState<any>(null);

  const router = useRouter();

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

            className={`h-3 rounded-full transition-all duration-700

            ${
            value>=80
            ?"bg-green-500"

            :value>=60
            ?"bg-blue-500"

            :value>=40
            ?"bg-yellow-500"

            :"bg-red-500"
            }

            `}

            style={{

              width: `${value}%`

            }}

          />

        </div>

      </div>

    );

  }

  function OverviewCard({

    title,

    value,

  }: {

    title: string;

    value: any;

  }) {

    return (

      <div className="bg-white/10 rounded-2xl p-6">

        <p className="text-white/80">

          {title}

        </p>
  
        <h2 className="text-4xl font-bold mt-2">

          {value}

        </h2>

      </div>

    );

  }

  <div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

⚡ Quick Actions

</h2>

<div className="flex flex-wrap gap-5">

<button

onClick={()=>

navigator.clipboard.writeText(

JSON.stringify(

evaluation,

null,

2

)

)

}

className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl"

>

📋 Copy Evaluation

</button>

<button

onClick={()=>

router.push("/improver")

}

className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl"

>

✨ Improve Prompt

</button>

<button

onClick={()=>{

setEvaluation(null);

setPrompt("");

}}

className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl"

>

🗑 Evaluate Another Prompt

</button>

</div>

</div>

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

                ? "🤖 AI is Evaluating..."

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

                    <div className="flex flex-col items-center">

                      <div className="w-36 h-36 rounded-full border-[10px] border-blue-500 flex items-center justify-center shadow-lg">

                        <div className="text-center">
                    
                          <h1 className="text-5xl font-bold text-blue-600">
                            {evaluation.overall_score}
                          </h1>

                          <p className="text-slate-500">
                            /100
                          </p>

                        </div>

                      </div>

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

              {/* =======================================================
                  AI SUMMARY
              ======================================================= */}

              <div className="bg-white rounded-3xl shadow-lg p-8">

                <h2 className="text-3xl font-bold mb-6">

                  🤖 AI Evaluation Summary

                </h2>

                <div className="bg-slate-50 rounded-2xl p-6">

                  <p className="text-lg leading-8 text-slate-700">

                    {

                      evaluation.summary

                        ||

                      `This prompt has an overall quality score of
                      ${evaluation.overall_score}/100.
                      ${
                        evaluation.overall_score >= 80

                          ? " It is already a strong prompt."

                          : evaluation.overall_score >= 60

                          ? " It can be improved with better context and constraints."

                             : " It requires significant improvements before being used."
                      }`

                    }
              
                  </p>

                </div>

              </div>

              {/* =======================================================
                  QUICK OVERVIEW
              ======================================================= */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl text-white p-8">

                <h2 className="text-3xl font-bold mb-8">

                  📋 Evaluation Overview

                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                  <OverviewCard

                    title="Overall"

                    value={`${evaluation.overall_score}/100`}

                  />

                  <OverviewCard

                    title="Difficulty"

                    value={evaluation.difficulty}
              
                  />

                  <OverviewCard

                    title="Strengths"

                    value={evaluation.strengths.length}

                  />

                  <OverviewCard

                    title="Improvements"

                    value={evaluation.improvements.length}

                  />

                </div>

              </div>



            </div>

          )

        }

      </div>

      <footer className="mt-16 text-center text-slate-500 pb-10">

        <p>
          Built with ❤️ 
        </p>

      </footer>

    </main>

  );

}

