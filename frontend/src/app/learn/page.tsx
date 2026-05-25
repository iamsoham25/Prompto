"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      <section className="flex flex-col items-center justify-center text-center h-[85vh] px-6">

        <h1 className="text-7xl font-bold mb-6">
          Prompto
        </h1>

        <p className="text-slate-400 text-xl max-w-3xl leading-relaxed">
          Learn Prompt Engineering, AI Agents, RAG, Evals,
          Multimodal AI, and Production AI Systems from Beginner to Master Level.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-10 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold"
        >
          Start Learning
        </button>

      </section>

    </main>
  );
}