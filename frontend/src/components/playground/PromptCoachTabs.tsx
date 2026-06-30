"use client";

import { useState } from "react";

interface PromptCoachTabsProps {
  evaluation: any;
  improvedPrompt: string;
}

export default function PromptCoachTabs({
  evaluation,
  improvedPrompt,
}: PromptCoachTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "analysis" | "suggestions" | "improved"
  >("analysis");

  if (!evaluation) return null;

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

      {/* Header */}
      <div className="px-8 py-6 border-b bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <h2 className="text-3xl font-bold">
          🤖 AI Prompt Coach
        </h2>

        <p className="text-orange-100 mt-2">
          Analyze your prompt, view AI suggestions, and generate an improved version.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-slate-50">

        <button
          onClick={() => setActiveTab("analysis")}
          className={`flex-1 py-4 font-semibold transition-all ${
            activeTab === "analysis"
              ? "bg-orange-500 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          📊 Analysis
        </button>

        <button
          onClick={() => setActiveTab("suggestions")}
          className={`flex-1 py-4 font-semibold transition-all ${
            activeTab === "suggestions"
              ? "bg-orange-500 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          💡 Suggestions
        </button>

        <button
          onClick={() => setActiveTab("improved")}
          className={`flex-1 py-4 font-semibold transition-all ${
            activeTab === "improved"
              ? "bg-orange-500 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          ✨ Improved Prompt
        </button>

      </div>

      {/* Content */}
      <div className="p-8">

        {/* ================= ANALYSIS ================= */}

        {activeTab === "analysis" && (

          <div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

              <ScoreCard
                title="Overall"
                value={`${evaluation.overall_score}/10`}
              />

              <ScoreCard
                title="Clarity"
                value={`${evaluation.clarity}/10`}
              />

              <ScoreCard
                title="Context"
                value={`${evaluation.context}/10`}
              />

              <ScoreCard
                title="Constraints"
                value={`${evaluation.constraints}/10`}
              />

              <ScoreCard
                title="Role"
                value={`${evaluation.role}/10`}
              />

              <ScoreCard
                title="Output"
                value={`${evaluation.output_format}/10`}
              />

              <ScoreCard
                title="Examples"
                value={`${evaluation.examples}/10`}
              />

              <ScoreCard
                title="Difficulty"
                value={`${evaluation.difficulty}/10`}
              />

            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-10">

              <div className="bg-green-50 rounded-2xl p-6">

                <h3 className="text-xl font-bold text-green-700 mb-4">
                  ✅ Strengths
                </h3>

                <ul className="space-y-3">

                  {evaluation.strengths?.map(
                    (item: string, index: number) => (
                      <li key={index}>
                        • {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="bg-red-50 rounded-2xl p-6">

                <h3 className="text-xl font-bold text-red-700 mb-4">
                  ⚠ Improvements
                </h3>

                <ul className="space-y-3">

                  {evaluation.improvements?.map(
                    (item: string, index: number) => (
                      <li key={index}>
                        • {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

          </div>

        )}

        {/* ================= SUGGESTIONS ================= */}

        {activeTab === "suggestions" && (

          <div className="space-y-5">

            {evaluation.improvements?.map(
              (item: string, index: number) => (

                <div
                  key={index}
                  className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-5"
                >
                  💡 {item}
                </div>

              )
            )}

          </div>

        )}

        {/* ================= IMPROVED PROMPT ================= */}

        {activeTab === "improved" && (

          <div>

            <div className="bg-slate-900 rounded-2xl p-6">

              <pre className="whitespace-pre-wrap text-green-400 leading-8">
                {improvedPrompt}
              </pre>

            </div>

            <button
              onClick={() =>
                navigator.clipboard.writeText(improvedPrompt)
              }
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
            >
              📋 Copy Prompt
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

function ScoreCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-100 rounded-2xl p-5 text-center">

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}