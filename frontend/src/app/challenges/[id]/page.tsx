"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/services/api";



export default function ChallengeDetailPage() {

  const params = useParams();

  const [challenge, setChallenge] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [answer, setAnswer] =
    useState("");

  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">

          Challenge #{params.id}

        </h1>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-4">

            JSON Response Challenge

          </h2>

          <p className="text-slate-400 mb-8">

            Create a prompt that forces AI
            to answer only in JSON format.

          </p>

          <textarea
            placeholder="Write your prompt here..."
            rows={8}
            className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 mb-6 outline-none"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold"
          >
            Submit Answer
          </button>

        </div>

      </div>

    </main>

  );

}