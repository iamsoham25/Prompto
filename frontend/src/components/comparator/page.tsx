"use client";

import { useState } from "react";

import API from "@/services/api";

import WinnerCard from "@/components/comparator/WinnerCard";

import ComparisonTable from "@/components/comparator/ComparisonTable";

import SuggestionCard from "@/components/comparator/SuggestionCard";

export default function ComparatorPage() {

  const [promptA, setPromptA] = useState("");

  const [promptB, setPromptB] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const comparePrompts = async () => {

    if (!promptA.trim() || !promptB.trim()) {

      alert("Please enter both prompts.");

      return;

    }

    try {

      setLoading(true);

      const res = await API.post(

        "/compare-prompts",

        {

          prompt_a: promptA,

          prompt_b: promptB

        }

      );

      setResult(

        res.data.comparison

      );

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-slate-50 px-10 py-12">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-slate-900 mb-3">

          ⚔️ Prompt Comparator

        </h1>

        <p className="text-slate-500 mb-10">

          Compare two prompts and discover which one performs better.

        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

            <h2 className="text-2xl font-bold mb-5">

              🅰 Prompt A

            </h2>

            <textarea

              value={promptA}

              onChange={(e) =>

                setPromptA(e.target.value)

              }

              placeholder="Write your first prompt..."

              className="w-full h-72 border border-slate-300 rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"

            />

          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

            <h2 className="text-2xl font-bold mb-5">

              🅱 Prompt B

            </h2>

            <textarea

              value={promptB}

              onChange={(e) =>

                setPromptB(e.target.value)

              }

              placeholder="Write your second prompt..."

              className="w-full h-72 border border-slate-300 rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"

            />

          </div>

        </div>

        <div className="flex justify-center mt-10">

          <button

            onClick={comparePrompts}

            disabled={loading}

            className="bg-orange-500 hover:bg-orange-600 transition text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-lg"

          >

            {

              loading

              ? "Comparing..."

              : "Compare Prompts"

            }

          </button>

        </div>

        {

          result && (

            <div className="space-y-10 mt-14">

              <WinnerCard

                winner={result.winner}

                scoreA={result.prompt_a_score}

                scoreB={result.prompt_b_score}

                difference={result.score_difference}

              />

              <ComparisonTable

                comparison={result.comparison}

              />

              <SuggestionCard

                reasons={result.reasons}

                suggestions={result.suggestions}

              />

            </div>

          )

        }

      </div>

    </main>

  );

}