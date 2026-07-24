"use client";

import { arenaTracks } from "@/data/arenaTracks";

import TrackCard from "@/components/arena/TrackCard";

export default function ArenaPage() {

  return (

    <main className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">

        <div className="max-w-7xl mx-auto px-8 py-16">

          <h1 className="text-6xl font-extrabold">

            🚀 Prompt Engineering Arena

          </h1>

          <p className="mt-6 text-xl max-w-3xl leading-9 opacity-90">

            Master Prompt Engineering through AI-powered missions.

            Solve real-world challenges across Coding, RAG,

            Marketing, Agentic AI, JSON Generation,

            Enterprise AI and much more.

          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <div className="bg-white/20 px-6 py-3 rounded-2xl">

              🧩 10 Learning Tracks

            </div>

            <div className="bg-white/20 px-6 py-3 rounded-2xl">

              🎯 200+ Challenges (Coming Soon)

            </div>

            <div className="bg-white/20 px-6 py-3 rounded-2xl">

              ⭐ Earn XP & Level Up

            </div>

          </div>

        </div>

      </section>

      {/* ================= INTRO ================= */}

      <section className="max-w-7xl mx-auto px-8 py-14">

        <div className="text-center">

          <h2 className="text-4xl font-bold">

            Choose Your Learning Track

          </h2>

          <p className="mt-4 text-slate-600 text-lg">

            Every track contains AI-powered challenges,

            increasing difficulty levels, XP rewards,

            and real-world Prompt Engineering practice.

          </p>

        </div>

      </section>

      {/* ================= TRACKS ================= */}

      <section className="max-w-7xl mx-auto px-8 pb-20">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {arenaTracks.map((track) => (

            <TrackCard

              key={track.id}

              title={track.title}

              slug={track.slug}

              icon={track.icon}

              description={track.description}

              difficulty={track.difficulty}

              xp={track.xp}

              challenges={track.challenges}

              color={track.color}

            />

          ))}

        </div>

      </section>

    </main>

  );

}