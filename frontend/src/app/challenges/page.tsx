"use client";

import { useMemo, useState } from "react";
import { arenaTracks } from "@/data/arenaTracks";
import TrackCard from "@/components/arena/TrackCard";

export default function ArenaPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const totalChallenges = arenaTracks.reduce(
    (sum, track) => sum + Number(track.challenges || 0),
    0
  );

  const difficulties = [
    "All",
    ...Array.from(
      new Set(arenaTracks.map((track) => track.difficulty))
    ),
  ];

  const filteredTracks = useMemo(() => {
    return arenaTracks.filter((track) => {
      const matchesSearch =
        search.trim() === "" ||
        track.title.toLowerCase().includes(search.toLowerCase()) ||
        track.description.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "All" ||
        track.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

  const featuredTracks = arenaTracks.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-6 pt-10 pb-8 md:px-10 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">

          {/* Top accent */}
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}
            <div className="px-8 py-12 md:px-12 md:py-14 lg:py-16">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Prompto Challenge Arena
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-6xl">
                Practice.
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Improve.
                </span>
                <br />
                Master Prompt Engineering.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                Solve practical prompt engineering challenges across coding,
                RAG, Agentic AI, JSON generation, marketing, research and
                enterprise AI.
              </p>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  🎯 Real-world challenges
                </div>

                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  ⭐ Earn XP
                </div>

                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  📈 Level up
                </div>
              </div>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap gap-3">

                <div className="min-w-[125px] rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-2xl font-black">
                    {totalChallenges}+
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Challenges
                  </p>
                </div>

                <div className="min-w-[125px] rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-2xl font-black">
                    {arenaTracks.length}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Learning Tracks
                  </p>
                </div>

                <div className="min-w-[125px] rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-2xl font-black">
                    {difficulties.length - 1}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Difficulty Levels
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex items-center bg-gradient-to-br from-orange-50 via-white to-purple-50 px-6 py-10 md:px-10 lg:px-8">

              <div className="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">

                {/* Card header */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-2xl shadow-md">
                      🚀
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Challenge Arena
                      </h2>
                      <p className="text-sm text-slate-500">
                        Pick a skill and start practicing
                      </p>
                    </div>
                  </div>

                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>

                {/* Featured tracks */}
                <div className="mt-6 space-y-3">

                  {featuredTracks.map((track) => (
                    <div
                      key={track.id}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-200 hover:bg-orange-50"
                    >

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                        {track.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-slate-900">
                          {track.title}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {track.description}
                        </p>
                      </div>

                      <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500">
                        →
                      </span>

                    </div>
                  ))}

                </div>

                {/* Bottom message */}
                <div className="mt-5 rounded-2xl bg-slate-900 px-5 py-4 text-white">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">
                        Ready for your next challenge?
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Complete challenges and build your XP.
                      </p>
                    </div>

                    <span className="text-xl">
                      ⭐
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SEARCH + FILTERS
      ========================================================= */}
      <section className="px-6 py-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search challenges, tracks, skills, or topics..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />

            </div>

            {/* Difficulty */}
            <div className="flex flex-wrap gap-2">

              {difficulties.map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    difficulty === level
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {level}
                </button>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          TRACKS HEADER
      ========================================================= */}
      <section className="px-6 pb-5 pt-8 md:px-10 lg:px-12">

        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">

          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
              Explore the arena
            </div>

            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Choose your learning track.
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Each track focuses on a different prompt engineering skill,
              with increasing difficulty and XP rewards.
            </p>
          </div>

          <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 md:block">
            {filteredTracks.length} tracks
          </div>

        </div>

      </section>

      {/* =========================================================
          TRACK CARDS
      ========================================================= */}
      <section className="px-6 pb-20 md:px-10 lg:px-12">

        <div className="mx-auto max-w-7xl">

          {filteredTracks.length > 0 ? (

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredTracks.map((track) => (

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

          ) : (

            <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="text-5xl">
                🔍
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                No tracks found
              </h3>

              <p className="mt-2 text-slate-500">
                Try a different search term or difficulty level.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setDifficulty("All");
                }}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}