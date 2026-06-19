"use client";

import { useState } from "react";
import API from "@/services/api";

export default function ComparatorPage() {

  const [promptA,setPromptA] = useState("");

  const [promptB,setPromptB] = useState("");

  const [result,setResult] = useState<any>(null);

  const copyPrompt = () => {
    navigator.clipboard.writeText(
      improvedPrompt
    );
  };

  const comparePrompts = async () => {

    try {

      const res = await API.post(
        "/compare-prompts",
        {
          prompt_a: promptA,
          prompt_b: promptB
        }
      );

      setResult(res.data);

    } catch(error){

      console.log(error);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">

        ⚔️ Prompt Comparator

      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <textarea
          value={promptA}
          onChange={(e)=>setPromptA(e.target.value)}
          className="border p-4 rounded-xl h-52"
          placeholder="Prompt A"
        />

        <textarea
          value={promptB}
          onChange={(e)=>setPromptB(e.target.value)}
          className="border p-4 rounded-xl h-52"
          placeholder="Prompt B"
        />

      </div>

      <button
        onClick={comparePrompts}
        className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-xl"
      >
        Compare
      </button>

      {result && (

        <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            🏆 Comparison Result
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-red-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">
                🅰 Prompt A
              </h3>

              <p className="text-4xl font-bold text-red-600">
                {result.score_a}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">
                🅱 Prompt B
              </h3>

              <p className="text-4xl font-bold text-green-600">
              {result.score_b}
              </p>
            </div>

          </div>

          <div className="mt-8 text-center">

            <h3 className="text-2xl font-bold">
              🥇 Winner
            </h3>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {result.winner}
            </p>

          </div>

        </div>

      )}

    </div>

  );

}