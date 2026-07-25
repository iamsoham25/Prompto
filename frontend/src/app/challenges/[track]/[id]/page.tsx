"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getChallenge } from "@/lib/challengeLoader";
import API from "@/services/api";
import EvaluationResult from "@/components/arena/EvaluationResult";
import ChallengeResult from "@/components/arena/ChallengeResult";

export default function ChallengeEngine() {

    const { track, id } = useParams();

    const challenge = getChallenge(
      track as string,
      Number(id)
    );

    if (!challenge) {

        return (

            <div className="min-h-screen flex items-center justify-center text-2xl">

            Challenge not found.

            </div>

        );

    }

    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<any>(null);

    const evaluatePrompt = async () => {

        if (!prompt.trim()) return;

        try {

            setLoading(true);

            const email = localStorage.getItem("userEmail");

            const res = await API.post("/evaluate-prompt", {

                prompt,

                user_email: email

            });

            if (res.data.success) {

                setResult(res.data.evaluation);

                const score = res.data.evaluation.overall_score;

                let xp = 20;

                if (score >= 90) xp = 100;
                else if (score >= 80) xp = 80;
                else if (score >= 70) xp = 60;
                else if (score >= 60) xp = 40;

                await API.post("/challenge-progress", {

                 user_email: email,

                 track,

                 challenge_id: Number(id),

                 score,

                 xp,

                  completed: score >= 70

                });

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const retryChallenge = () => {

        setPrompt("");

        setResult(null);

    };

    

    return (

        <main className="min-h-screen bg-slate-100">

            {/* HERO */}

            <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">

                <div className="max-w-7xl mx-auto px-8 py-12">

                    <p className="uppercase tracking-widest opacity-80">

                        {track} Track

                    </p>

                    <h1 className="text-5xl font-bold mt-3">

                        {challenge.title}

                    </h1>

                    <p className="mt-4 text-lg opacity-90">

                        {challenge.description}

                    </p>

                </div>

            </section>

            {/* CONTENT */}

            <section className="max-w-7xl mx-auto px-8 py-10 grid lg:grid-cols-3 gap-8">

                {/* LEFT */}

                <div className="lg:col-span-2 space-y-8">

                    {/* Challenge */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold">

                            🎯 Challenge Objective

                        </h2>

                        <p className="mt-5 text-slate-600 leading-8">

                            {challenge.description}

                        </p>

                    </div>

                    {/* Prompt Editor */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold">

                            ✍ Prompt Editor

                        </h2>

                        <textarea

                            value={prompt}

                            onChange={(e) => setPrompt(e.target.value)}

                            placeholder="Write your prompt here..."

                            className="w-full mt-6 h-72 rounded-2xl border border-slate-300 p-5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"

                        />

                        <button

                            onClick={evaluatePrompt}

                            disabled={loading}

                            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"

                        >

                            {loading ? "Evaluating..." : "Evaluate Prompt →"}

                        </button>

                        <EvaluationResult result={result} />

                        <ChallengeResult
                            result={result}
                            track={track as string}
                            challengeId={Number(id)}
                            onRetry={retryChallenge}
                        />

                    </div>

                </div>

                {/* RIGHT SIDEBAR */}

                <div className="space-y-6">

                    {/* Details */}

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <h3 className="text-xl font-bold">

                            📋 Challenge Details

                        </h3>

                        <div className="mt-5 space-y-3">

                            <p>

                                Difficulty

                                <span className="float-right font-semibold">

                                    {challenge.difficulty}

                                </span>

                            </p>

                            <p>

                                XP Reward

                                <span className="float-right font-semibold">

                                    {challenge.xp} XP

                                </span>

                            </p>

                            <p>

                                Estimated Time

                                <span className="float-right font-semibold">

                                    {challenge.time}

                                </span>

                            </p>

                        </div>

                    </div>

                    {/* AI Mentor */}

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <h3 className="text-xl font-bold">

                            🤖 AI Mentor

                        </h3>

                        <ul className="mt-5 space-y-3 text-slate-600">

                            <li>✅ Define AI role</li>

                            <li>✅ Add context</li>

                            <li>✅ Mention constraints</li>

                            <li>✅ Specify output format</li>

                            <li>✅ Include examples</li>

                        </ul>

                    </div>

                    {/* Prompt Checklist */}

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <h3 className="text-xl font-bold">

                            📑 Prompt Checklist

                        </h3>

                        <div className="mt-5 space-y-3">

                            <p>⭕ Role</p>

                            <p>⭕ Context</p>

                            <p>⭕ Constraints</p>

                            <p>⭕ Output Format</p>

                            <p>⭕ Examples</p>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );

}