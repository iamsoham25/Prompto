"use client";

import { useRouter } from "next/navigation";
import { challengeTracks } from "@/data/challengeTracks";

type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  time: string;
  passScore: number;
  bonusScore: number;
  bonusXP: number;
};

type TrackConfig = {
  icon: string;
  description: string;
  accent: string;
};

const trackConfig: Record<string, TrackConfig> = {
  coding: {
    icon: "💻",
    description:
      "Master prompts for coding assistants and debugging.",
    accent: "Coding",
  },

  summarization: {
    icon: "📄",
    description:
      "Create high-quality document summaries.",
    accent: "Summarization",
  },

  "json-generation": {
    icon: "📊",
    description:
      "Generate structured JSON responses.",
    accent: "JSON Generation",
  },

  marketing: {
    icon: "📣",
    description:
      "Create persuasive marketing prompts.",
    accent: "Marketing",
  },

  "chain-of-thought": {
    icon: "🧠",
    description:
      "Practice reasoning and structured thinking.",
    accent: "Chain of Thought",
  },

  "agentic-ai": {
    icon: "🤖",
    description:
      "Design prompts for autonomous AI agents.",
    accent: "Agentic AI",
  },

  "rag": {
    icon: "🔎",
    description:
      "Build prompts for retrieval-augmented generation.",
    accent: "RAG",
  },

  "research": {
    icon: "🔬",
    description:
      "Create precise prompts for research and analysis.",
    accent: "Research",
  },

  "enterprise-ai": {
    icon: "🏢",
    description:
      "Solve enterprise problems with effective AI prompts.",
    accent: "Enterprise AI",
  },

  "prompt-engineering": {
    icon: "⚡",
    description:
      "Master advanced prompt engineering techniques.",
    accent: "Prompt Engineering",
  },
};

function formatTrackName(track: string) {
  return track
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function getTrackConfig(track: string): TrackConfig {
  return (
    trackConfig[track] ?? {
      icon: "🚀",
      description:
        "Practice real-world prompt engineering challenges.",
      accent: formatTrackName(track),
    }
  );
}

export default function ChallengesPage() {
  const router = useRouter();

  const tracks = Object.entries(challengeTracks);

  const totalChallenges = tracks.reduce(
    (total, [, challenges]) =>
      total + (challenges as Challenge[]).length,
    0
  );

  const totalXP = tracks.reduce(
    (total, [, challenges]) =>
      total +
      (challenges as Challenge[]).reduce(
        (sum, challenge) => sum + challenge.xp,
        0
      ),
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-900">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="max-w-[1380px] mx-auto px-5 sm:px-8 pt-7">

        <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">

          {/* Top gradient line */}

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] min-h-[650px]">

            {/* ========================================= */}
            {/* LEFT */}
            {/* ========================================= */}

            <div className="p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-center">

              {/* Label */}

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs sm:text-sm font-bold tracking-[0.18em] text-orange-600">

                <span className="h-2 w-2 rounded-full bg-orange-500" />

                PROMPTO CHALLENGE ARENA

              </div>


              {/* Main heading */}

              <h1 className="mt-8 max-w-[700px] text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.94] tracking-[-0.045em]">

                <span className="block text-slate-950">
                  Practice.
                </span>

                <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Improve.
                </span>

                <span className="block text-slate-950">
                  Master Prompt
                </span>

                <span className="block text-slate-950">
                  Engineering.
                </span>

              </h1>


              {/* Description */}

              <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600">

                Solve practical prompt engineering challenges
                across coding, RAG, Agentic AI, JSON generation,
                marketing, research and enterprise AI.

              </p>


              {/* Feature pills */}

              <div className="mt-8 flex flex-wrap gap-3">

                <FeaturePill>
                  🎯 Real-world challenges
                </FeaturePill>

                <FeaturePill>
                  ⭐ Earn XP
                </FeaturePill>

                <FeaturePill>
                  📈 Level up
                </FeaturePill>

              </div>


              {/* Stats */}

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-[540px]">

                <HeroStat
                  value={`${totalChallenges}+`}
                  label="Challenges"
                />

                <HeroStat
                  value={`${tracks.length}`}
                  label="Learning Tracks"
                />

                <HeroStat
                  value="3"
                  label="Difficulty Levels"
                />

              </div>

            </div>


            {/* ========================================= */}
            {/* RIGHT ARENA */}
            {/* ========================================= */}

            <div className="bg-gradient-to-br from-orange-50 via-white to-purple-50 p-6 sm:p-10 lg:p-12 flex items-center">

              <div className="w-full max-w-[560px] mx-auto rounded-[30px] border border-slate-200 bg-white p-6 sm:p-7 shadow-xl">

                {/* Panel header */}

                <div className="mb-7 flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-2xl shadow-md">
                      🚀
                    </div>

                    <div>

                      <h2 className="text-lg font-black text-slate-950">
                        Challenge Arena
                      </h2>

                      <p className="text-sm text-slate-500">
                        Pick a skill and start practicing
                      </p>

                    </div>

                  </div>

                  <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.12)]" />

                </div>


                {/* Track preview */}

                <div className="space-y-3">

                  {tracks.slice(0, 3).map(
                    ([track]) => {

                      const config =
                        getTrackConfig(track);

                      const challenges =
                        challengeTracks[
                          track as keyof typeof challengeTracks
                        ] as Challenge[];

                      return (
                        <button
                          key={track}
                          onClick={() =>
                            router.push(
                              `/challenges/${track}`
                            )
                          }
                          className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-200 hover:border-orange-200 hover:bg-white hover:shadow-md"
                        >

                          {/* Icon */}

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl shadow-sm">
                            {config.icon}
                          </div>


                          {/* Content */}

                          <div className="min-w-0 flex-1">

                            <p className="text-base font-black text-slate-950">
                              {config.accent}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {config.description}
                            </p>

                          </div>


                          {/* Arrow */}

                          <div className="text-xl text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500">
                            →
                          </div>

                        </button>
                      );
                    }
                  )}

                </div>


                {/* Bottom CTA */}

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-950 p-5 text-white">

                  <div>

                    <p className="font-bold">
                      Ready for your next challenge?
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Complete challenges and build your XP.
                    </p>

                  </div>

                  <span className="text-2xl">
                    ⭐
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* LEARNING TRACKS */}
      {/* ================================================= */}

      <section className="mx-auto max-w-[1380px] px-5 pb-24 pt-16 sm:px-8">

        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Learning Tracks
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Practice & Improve
          </h2>

          <p className="mt-2 max-w-2xl text-slate-500">
            Choose a learning track and complete practical
            challenges to build your prompt engineering skills.
          </p>

        </div>


        {/* Track grid */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {tracks.map(
            ([track, trackChallenges]) => {

              const config =
                getTrackConfig(track);

              const challenges =
                trackChallenges as Challenge[];

              const trackXP =
                challenges.reduce(
                  (sum, challenge) =>
                    sum + challenge.xp,
                  0
                );

              const difficulty =
                challenges[0]?.difficulty ??
                "Easy";

              return (
                <article
                  key={track}
                  className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
                >

                  {/* Gradient top line */}

                  <div className="h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />


                  <div className="p-6">

                    {/* Header */}

                    <div className="flex items-start justify-between">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-3xl shadow-sm">
                        {config.icon}
                      </div>

                      <div className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                        ⭐ {trackXP} XP
                      </div>

                    </div>


                    {/* Title */}

                    <h3 className="mt-6 text-2xl font-black text-slate-950">
                      {config.accent}
                    </h3>


                    {/* Description */}

                    <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-slate-500">
                      {config.description}
                    </p>


                    {/* Meta */}

                    <div className="mt-6 flex flex-wrap gap-2">

                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                        {difficulty}
                      </span>

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                        📄 {challenges.length} Challenges
                      </span>

                    </div>


                    {/* Divider */}

                    <div className="mt-6 border-t border-slate-100 pt-5">

                      <div className="mb-4 flex items-center justify-between">

                        <div>

                          <p className="text-xs text-slate-400">
                            Learning Track
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            Practice & improve
                          </p>

                        </div>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all group-hover:bg-orange-50 group-hover:text-orange-500">
                          →
                        </span>

                      </div>


                      {/* Button */}

                      <button
                        onClick={() =>
                          router.push(
                            `/challenges/${track}`
                          )
                        }
                        className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-100 transition-all hover:bg-orange-600 hover:shadow-lg"
                      >
                        Open Track →
                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>

      </section>

    </main>
  );
}


/* ========================================================= */
/* FEATURE PILL */
/* ========================================================= */

function FeaturePill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
      {children}
    </div>
  );
}


/* ========================================================= */
/* HERO STAT */
/* ========================================================= */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">

      <p className="text-2xl font-black text-slate-950 sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        {label}
      </p>

    </div>
  );
}