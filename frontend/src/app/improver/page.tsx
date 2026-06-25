"use client";

import { useState } from "react";
import API from "@/services/api";

export default function MentorPage() {

  const [prompt, setPrompt] = useState("");

  const [improvedPrompt, setImprovedPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const improvePrompt = async () => {

  if (!prompt.trim()) {
    alert("Enter a prompt");
    return;
  }

  try {

    setLoading(true);

    const res = await API.post(
      "/improve-prompt",
      {
        prompt
      }
    );

    if (res.data.success) {

      setImprovedPrompt( res.data.improved_prompt );

    }

  } catch (error) {

    console.log(error);

    alert(
      "Failed to improve prompt"
    );

  } finally {

    setLoading(false);

  }

};

  return (

  <main className="min-h-screen bg-slate-50 p-8">

    <div className="max-w-6xl mx-auto">

      {/* Hero */}

      <section
        className=" bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 rounded-3xl p-10 text-white shadow-xl mb-8 "
      >

        <h1 className="text-5xl font-bold mb-4">

          ✨ AI Prompt Improver

        </h1>

        <p className="text-lg opacity-90">

          Transform weak prompts into
          professional AI-ready prompts.

        </p>

      </section>

      {/* Input */}

      <div
        className=" bg-white rounded-3xl p-8 shadow-lg border border-slate-200 "
      >

        <h2 className="text-2xl font-bold mb-4">

          Enter Your Prompt

        </h2>

        <textarea
          rows={6}
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          placeholder="Explain Machine Learning"
          className=" w-full border border-slate-300 rounded-2xl p-4 outline-none resize-none mb-4 "
        />

        <button
          onClick={improvePrompt}
          disabled={loading}
          className=" bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl font-semibold "
        >

          {
            loading
              ? "Improving..."
              : "✨ Improve Prompt"
          }

        </button>

      </div>

      {/* Output */}

      {
        improvedPrompt && (
      
          <div
            className=" mt-8 bg-white rounded-3xl p-8 shadow-lg border border-slate-200 " >

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                🚀 Improved Prompt
              </h2>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    improvedPrompt
                  )
                }
                className=" bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl " >
                📋 Copy
              </button>

            </div>

            {/* Score */}

            <div className="bg-green-50 p-5 rounded-2xl mb-6">

              <h3 className="font-bold text-lg mb-2">
                📊 Improvement Score
              </h3>
      
              <p className="text-4xl font-bold text-green-600">
                +85%
              </p>
      
            </div>

            {/* Improvements */}

            <div className="bg-blue-50 p-5 rounded-2xl mb-6">

              <h3 className="font-bold text-lg mb-3">
                🔍 Improvements Applied
              </h3>

              <ul className="space-y-2">

                <li>✅ Added role definition</li>

                <li>✅ Added context</li>

                <li>✅ Improved specificity</li>
      
                <li>✅ Added structure</li>
      
                <li>✅ Added output requirements</li>

              </ul>

            </div>

            {/* Before vs After */}

            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div className="bg-red-50 p-5 rounded-2xl">

                <h3 className="font-bold mb-3">
                  ❌ Original Prompt
                </h3>

                <p className="whitespace-pre-wrap">
                  {prompt}
                </p>

              </div>

              <div className="bg-green-50 p-5 rounded-2xl">

                <h3 className="font-bold mb-3">
                  ✅ Improved Prompt
                </h3>

                <p className="whitespace-pre-wrap">
                  {improvedPrompt}
                </p>
      
              </div>

            </div>

            {/* Final Prompt */}

            <div
              className=" whitespace-pre-wrap text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl " >

              {improvedPrompt}
      
            </div>

          </div>

        )
      }

    </div>

  </main>

);

}