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
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white px-8 py-10">

      <h1 className="text-5xl font-bold mb-8">
        AI Playground
      </h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt here..."
        className="w-full h-60 bg-slate-900 border border-slate-700 rounded-2xl p-5 text-lg outline-none"
      />

      <button
        onClick={generateResponse}
        className="mt-5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold"
      >
        {loading ? "Generating..." : "Generate Response"}
      </button>

      {response && (
        <div className="mt-10 bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            AI Response
          </h2>

          <p className="text-slate-300 leading-relaxed">
            {response}
          </p>
        </div>
      )}

    </main>
  );
}