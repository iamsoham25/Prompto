"use client";

import { useState } from "react";
import API from "@/services/api";

export default function ComparatorPage() {

  const [promptA,setPromptA] = useState("");

  const [promptB,setPromptB] = useState("");

  const [result,setResult] = useState<any>(null);

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

      {

        result && (

          <div className="mt-10 bg-white p-8 rounded-3xl shadow">

            <h2 className="text-2xl font-bold">

              Results
            </h2>

            <p className="mt-4">
              Prompt A Score:
              {result.score_a}
            </p>

            <p>
              Prompt B Score:
              {result.score_b}
            </p>

            <p className="text-green-600 font-bold mt-4">

              Winner:
              {result.winner}

            </p>

          </div>

        )

      }

    </div>

  );

}