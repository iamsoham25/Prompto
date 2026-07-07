"use client";

import { useState } from "react";
import API from "@/services/api";


interface ImproverResult {
  success: boolean;
  original_prompt: string;
  improved_prompt: string;
  improvement_score: number;
  changes: string[];
  strengths: string[];
  weaknesses: string[];
}


export default function ImproverPage() {

  const [prompt, setPrompt] = useState("");

  const [result, setResult] =
    useState<ImproverResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState(false);


  // ==============================
  // IMPROVE PROMPT
  // ==============================

  const improvePrompt = async () => {

    if (!prompt.trim()) {

      setError(
        "Please enter a prompt first."
      );

      return;
    }


    try {

      setLoading(true);

      setError("");

      setResult(null);

      setCopied(false);


      const res = await API.post(
        "/improve-prompt",
        {
          prompt: prompt
        }
      );


      if (res.data.success) {

        setResult(res.data);

      } else {

        setError(
          "Failed to improve the prompt."
        );

      }


    } catch (error: any) {

      console.error(
        "Prompt improvement error:",
        error
      );


      setError(
        error?.response?.data?.detail ||
        "Failed to improve prompt. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  // ==============================
  // COPY PROMPT
  // ==============================

  const copyPrompt = async () => {

    if (!result?.improved_prompt) {
      return;
    }


    await navigator.clipboard.writeText(
      result.improved_prompt
    );


    setCopied(true);


    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };


  return (

    <main className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-6xl mx-auto">


        {/* ==========================
            HERO
        ========================== */}

        <section
          className="
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-pink-500
          rounded-3xl
          p-10
          text-white
          shadow-xl
          mb-8
          "
        >

          <h1 className="text-5xl font-bold mb-4">

            ✨ AI Prompt Improver

          </h1>


          <p className="text-lg opacity-90">

            Transform weak prompts into
            professional AI-ready prompts.

          </p>

        </section>



        {/* ==========================
            INPUT
        ========================== */}

        <div
          className="
          bg-white
          rounded-3xl
          p-8
          shadow-lg
          border
          border-slate-200
          "
        >

          <h2 className="text-2xl font-bold mb-4">

            Enter Your Prompt

          </h2>


          <textarea

            rows={7}

            value={prompt}

            onChange={(e) =>
              setPrompt(e.target.value)
            }

            placeholder="Example: Explain Machine Learning"

            className="
            w-full
            border
            border-slate-300
            rounded-2xl
            p-5
            outline-none
            resize-none
            mb-4
            text-lg
            focus:ring-2
            focus:ring-purple-500
            focus:border-transparent
            "

          />


          {/* ERROR */}

          {
            error && (

              <div
                className="
                bg-red-50
                border
                border-red-200
                text-red-700
                p-4
                rounded-xl
                mb-4
                "
              >

                {error}

              </div>

            )
          }


          <button

            onClick={improvePrompt}

            disabled={loading}

            className="
            bg-purple-600
            hover:bg-purple-700
            disabled:bg-purple-400
            disabled:cursor-not-allowed
            text-white
            px-8
            py-3
            rounded-2xl
            font-semibold
            transition
            "
          >

            {
              loading
                ? "🧠 AI is Improving..."
                : "✨ Improve Prompt"
            }

          </button>

        </div>



        {/* ==========================
            AI RESULT
        ========================== */}

        {
          result && (

            <div className=" mt-8 bg-white rounded-3xl p-8 shadow-lg border border-slate-200 " >


              {/* =====================
                  HEADER
              ===================== */}

              <div className=" flex justify-between items-center mb-6 " >

                <h2 className="text-3xl font-bold">

                  🚀 AI Prompt Analysis

                </h2>


                <button

                  onClick={copyPrompt}

                  className=" bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition " >

                  {
                    copied
                      ? "✓ Copied"
                      : "📋 Copy Prompt"
                  }

                </button>

              </div>



              {/* =====================
                  SCORE
              ===================== */}

              <div className=" bg-green-50 border border-green-100 p-6 rounded-2xl mb-6 " >

                <h3 className="font-bold text-xl mb-2">

                  📊 Improvement Score

                </h3>


                <p className=" text-4xl font-bold text-green-600 " >

                  {result.improvement_score}%

                </p>

              </div>



              {/* =====================
                  CHANGES
              ===================== */}

              <div className=" bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-6 " >

                <h3 className="font-bold text-xl mb-4">

                  🔍 Improvements Applied

                </h3>


                {
                  result.changes.length > 0 ? (

                    <ul className="space-y-3">

                      {
                        result.changes.map(
                          (change, index) => (

                            <li key={index}>

                              ✅ {change}

                            </li>

                          )
                        )
                      }

                    </ul>

                  ) : (

                    <p className="text-slate-500">

                      No major changes were required.

                    </p>

                  )
                }

              </div>



              {/* =====================
                  STRENGTHS + WEAKNESSES
              ===================== */}

              <div className=" grid md:grid-cols-2 gap-6 mb-6 " >


                {/* STRENGTHS */}

                <div className=" bg-emerald-50 border border-emerald-100 p-6 rounded-2xl " >

                  <h3 className="font-bold text-xl mb-4">

                    💪 Prompt Strengths

                  </h3>


                  {
                    result.strengths.length > 0 ? (

                      <ul className="space-y-3">

                        {
                          result.strengths.map(
                            (strength, index) => (

                              <li key={index}>

                                ✓ {strength}

                              </li>

                            )
                          )
                        }

                      </ul>

                    ) : (

                      <p className="text-slate-500">

                        No specific strengths identified.

                      </p>

                    )
                  }

                </div>



                {/* WEAKNESSES */}

                <div className=" bg-orange-50 border border-orange-100 p-6 rounded-2xl " >

                  <h3 className="font-bold text-xl mb-4">

                    🎯 Areas Improved

                  </h3>


                  {
                    result.weaknesses.length > 0 ? (

                      <ul className="space-y-3">

                        {
                          result.weaknesses.map(
                            (weakness, index) => (

                              <li key={index}>

                                → {weakness}

                              </li>

                            )
                          )
                        }

                      </ul>

                    ) : (

                      <p className="text-slate-500">

                        The original prompt was already strong.

                      </p>

                    )
                  }

                </div>

              </div>



              {/* =====================
                  BEFORE VS AFTER
              ===================== */}

              <div className=" grid md:grid-cols-2 gap-6 " >


                {/* ORIGINAL */}

                <div className=" bg-red-50 border border-red-100 p-6 rounded-2xl " >

                  <h3 className="font-bold text-xl mb-4">
                    ❌ Original Prompt
                  </h3>


                  <p className=" whitespace-pre-wrap text-slate-700 leading-relaxed " >
                    {result.original_prompt}
                  </p>

                </div>



                {/* IMPROVED */}

                <div className=" bg-green-50 border border-green-100 p-6 rounded-2xl " >

                  <h3 className="font-bold text-xl mb-4">
                    ✅ AI Improved Prompt
                  </h3>


                  <p className=" whitespace-pre-wrap text-slate-700 leading-relaxed " >
                    {result.improved_prompt}
                  </p>

                </div>

              </div>



              {/* =====================
                  FINAL COPYABLE PROMPT
              ===================== */}

              <div className=" mt-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl " >

                <div className=" flex justify-between items-center mb-4 " >

                  <h3 className="font-bold text-xl">
                    📋 Ready-to-Use Prompt
                  </h3>


                  <button

                    onClick={copyPrompt}

                    className=" text-purple-600 hover:text-purple-800 font-semibold "
                    >

                    Copy

                  </button>

                </div>


                <p className=" whitespace-pre-wrap text-slate-700 leading-relaxed " >
                  {result.improved_prompt}
                </p>

              </div>

            </div>
          )

        }

      </div>

    </main>

  );

}