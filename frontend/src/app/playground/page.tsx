"use client";

import { useState } from "react";

import API from "@/services/api";

export default function PlaygroundPage() {

  const [prompt, setPrompt] = useState("");

  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const generateAIResponse = async () => {

    if (!prompt) {
      alert("Please enter prompt");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/generate", {
        prompt,
      });

      if (res.data.success) {

        setResponse(res.data.response);

      } else {

        alert("AI Generation Failed");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen bg-slate-950 text-white px-8 py-12">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-bold mb-4">
          AI Playground 🚀
        </h1>

        <p className="text-slate-400 text-xl mb-10">
          Test prompts using OpenRouter AI models.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT SIDE */}

          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Enter Prompt
            </h2>

            <textarea
              rows={12}
              placeholder="Write your AI prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 outline-none resize-none"
            />

            <button
              onClick={generateAIResponse}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-2xl font-semibold"
            >
              {loading ? "Generating..." : "Generate Response"}
            </button>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              AI Response
            </h2>

            <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 min-h-[400px] whitespace-pre-wrap text-slate-300 leading-8">

              {response || "AI response will appear here..."}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}