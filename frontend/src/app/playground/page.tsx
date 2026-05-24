"use client";

import { useState } from "react";
import API from "@/services/api";

export default function PlaygroundPage() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {

    if (!prompt) return;

    try {

      setLoading(true);

      const res = await API.post("/generate", {
        prompt,
      });

      setResponse(res.data.response);

    } catch (error) {

      console.error(error);

      setResponse(
        "Something went wrong while generating AI response."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-bold mb-3">
          AI Playground
        </h1>

        <p className="text-slate-400 mb-10 text-lg">
          Test prompts with real AI models.
        </p>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt here..."
            className="w-full h-56 bg-transparent outline-none resize-none text-lg"
          />

          <div className="flex justify-end mt-5">

            <button
              onClick={generateResponse}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              {loading ? "Generating..." : "Generate"}
            </button>

          </div>

        </div>

        {response && (

          <div className="mt-10 bg-slate-900 border border-slate-700 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              AI Response
            </h2>

            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
              {response}
            </div>

          </div>

        )}

      </div>

    </main>
  );
}