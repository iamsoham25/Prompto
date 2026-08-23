"use client";

import { useParams, useRouter } from "next/navigation";
import { challengeTracks } from "@/data/challengeTracks";
import { useEffect, useMemo, useState } from "react";
import API from "@/services/api";

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

type ProgressItem = {
  challenge_id: number;
  score?: number;
  completed?: boolean;
  xp?: number;
};

const trackContent: Record<
  string,
  {
    icon: string;
    accent: string;
    words: string[];
    description: string;
  }
> = {
  coding: {
    icon: "💻",
    accent: "Code.",
    words: ["Practice.", "Debug.", "Master Prompt Engineering."],
    description:
      "Solve practical coding and debugging challenges using clear, reliable prompts.",
  },

  summarization: {
    icon: "📄",
    accent: "Summarize.",
    words: ["Practice.", "Improve.", "Master Prompt Engineering."],
    description:
      "Practice real-world summarization challenges and learn to create precise AI prompts.",
  },

  "json-generation": {
    icon: "📊",
    accent: "Structure.",
    words: ["Practice.", "Improve.", "Master Prompt Engineering."],
    description:
      "Create structured prompts that consistently produce accurate JSON responses.",
  },

  marketing: {
    icon: "📣",
    accent: "Create.",
    words: ["Persuade.", "Improve.", "Master Prompt Engineering."],
    description:
      "Build persuasive marketing prompts for real-world AI content generation.",
  },

  "chain-of-thought": {
    icon: "🧠",
    accent: "Reason.",
    words: ["Practice.", "Improve.", "Master Prompt Engineering."],
    description:
      "Practice structured reasoning and improve prompts for complex problem solving.",
  },

  "agentic-ai": {
    icon: "🤖",
    accent: "Build.",
    words: ["Reason.", "Automate.", "Master Prompt Engineering."],
    description:
      "Design effective prompts for autonomous AI agents and multi-step workflows.",
  },
};

export default function TrackPage() {
  const params = useParams();
  const router = useRouter();

  const track =
    typeof params.track === "string"
      ? params.track
      : "";

  const challenges: Challenge[] =
    track && track in challengeTracks
      ? (challengeTracks[
          track as keyof typeof challengeTracks
        ] as Challenge[])
      : [];

  const [progress, setProgress] =
    useState<ProgressItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
   * ------------------------------------------------------
   * LOAD USER PROGRESS
   * ------------------------------------------------------
   */

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const email =
          localStorage.getItem("userEmail");

        if (!email || !track) {
          setProgress([]);
          return;
        }

        const res = await API.get(
          `/challenge-progress/${encodeURIComponent(
            email
          )}/${encodeURIComponent(track)}`
        );

        if (res.data.success) {
          setProgress(
            res.data.progress ?? []
          );
        }
      } catch (error) {
        console.error(
          "Failed to load challenge progress:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [track]);

  /*
   * ------------------------------------------------------
   * COMPLETED CHALLENGES
   * ------------------------------------------------------
   */

  const completedChallenges = useMemo(
    () =>
      new Set(
        progress
          .filter(
            (item) =>
              item.completed !== false
          )
          .map(
            (item) =>
              item.challenge_id
          )
      ),
    [progress]
  );

  const completedCount =
    completedChallenges.size;

  const totalXP = challenges.reduce(
    (sum, challenge) =>
      sum + challenge.xp,
    0
  );

  const progressPercentage =
    challenges.length > 0
      ? Math.round(
          (completedCount /
            challenges.length) *
            100
        )
      : 0;

  /*
   * ------------------------------------------------------
   * TRACK INFORMATION
   * ------------------------------------------------------
   */

  const formattedTrack =
    track
      ? track
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() +
              word.slice(1)
          )
          .join(" ")
      : "Challenges";

  const content =
    trackContent[track] ?? {
      icon: "🚀",
      accent: "Practice.",
      words: [
        "Improve.",
        "Level Up.",
        "Master Prompt Engineering.",
      ],
      description:
        "Practice real-world prompt engineering challenges and improve your AI skills.",
    };

  /*
   * ------------------------------------------------------
   * NOT FOUND
   * ------------------------------------------------------
   */

  if (challenges.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f8fb] flex items-center justify-center">

        <div className="text-center">

          <div className="text-6xl mb-5">
            🚀
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            Track not found
          </h1>

          <p className="text-slate-500 mt-2">
            The requested challenge track does not exist.
          </p>

          <button
            onClick={() =>
              router.push("/challenges")
            }
            className="mt-6 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold"
          >
            ← Back to Challenges
          </button>

        </div>

      </main>
    );
  }

  /*
   * ------------------------------------------------------
   * PAGE
   * ------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-900">

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="max-w-[1380px] mx-auto px-5 sm:px-8 pt-7">

        <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">

          {/* Top gradient line */}

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] min-h-[650px]">

            {/* ========================================== */}
            {/* LEFT HERO */}
            {/* ========================================== */}

            <div className="p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-center">

              {/* Label */}

              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs sm:text-sm font-bold tracking-[0.18em]">

                <span className="w-2 h-2 rounded-full bg-orange-500" />

                PROMPTO CHALLENGE ARENA

              </div>


              {/* Heading */}

              <h1 className="mt-8 text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-[-0.045em] max-w-[720px]">

                <span className="block text-slate-950">
                  {content.accent}
                </span>

                <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {content.words[0]}
                </span>

                <span className="block text-slate-950">
                  {content.words[1]}
                </span>

                <span className="block text-slate-950">
                  {content.words[2]}
                </span>

              </h1>


              {/* Description */}

              <p className="mt-8 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl">

                {content.description}

              </p>


              {/* Feature Pills */}

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
                  value={`${challenges.length}`}
                  label="Challenges"
                />

                <HeroStat
                  value={`${totalXP}`}
                  label="Total XP"
                />

                <HeroStat
                  value={`${completedCount}`}
                  label="Completed"
                />

              </div>

            </div>


            {/* ========================================== */}
            {/* RIGHT ARENA PANEL */}
            {/* ========================================== */}

            <div className="bg-gradient-to-br from-orange-50 via-white to-purple-50 p-6 sm:p-10 lg:p-12 flex items-center">

              <div className="w-full rounded-[30px] border border-slate-200 bg-white shadow-xl p-6 sm:p-7">

                {/* Panel Header */}

                <div className="flex items-center justify-between mb-7">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-2xl shadow-md">

                      {content.icon}

                    </div>

                    <div>

                      <h2 className="text-lg font-black text-slate-950">
                        Challenge Arena
                      </h2>

                      <p className="text-sm text-slate-500">
                        Pick a challenge and start practicing
                      </p>

                    </div>

                  </div>

                  <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.12)]" />

                </div>


                {/* Preview Challenges */}

                <div className="space-y-3">

                  {challenges
                    .slice(0, 3)
                    .map((challenge) => {

                      const completed =
                        completedChallenges.has(
                          challenge.id
                        );

                      return (
                        <button
                          key={challenge.id}
                          onClick={() =>
                            router.push(
                              `/challenges/${track}/${challenge.id}`
                            )
                          }
                          className="w-full text-left flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all group"
                        >

                          <div
                            className={`
                              w-11 h-11 rounded-xl
                              flex items-center justify-center
                              shrink-0 font-bold
                              ${
                                completed
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-white text-slate-600"
                              }
                            `}
                          >
                            {completed
                              ? "✓"
                              : content.icon}
                          </div>


                          <div className="min-w-0 flex-1">

                            <p className="font-bold text-slate-900 truncate">

                              {challenge.title}

                            </p>

                            <p className="text-xs text-slate-500 mt-1 truncate">

                              {challenge.description}

                            </p>

                          </div>


                          <span className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all text-xl">

                            →

                          </span>

                        </button>
                      );
                    })}

                </div>


                {/* Bottom CTA */}

                <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white flex items-center justify-between">

                  <div>

                    <p className="font-bold">
                      Ready for your next challenge?
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
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


      {/* ================================================== */}
      {/* TRACK PROGRESS */}
      {/* ================================================== */}

      <section className="max-w-[1380px] mx-auto px-5 sm:px-8 mt-7">

        <div className="bg-white border border-slate-200 rounded-3xl px-6 sm:px-8 py-5 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                Track Progress
              </p>

              <p className="font-bold text-slate-900 mt-1">
                {completedCount} of {challenges.length} challenges completed
              </p>

            </div>


            <div className="flex items-center gap-3">

              <div className="w-40 h-2.5 rounded-full bg-slate-100 overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transition-all duration-700"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />

              </div>

              <span className="font-black text-indigo-600">
                {progressPercentage}%
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================== */}
      {/* CHALLENGES */}
      {/* ================================================== */}

      <section className="max-w-[1380px] mx-auto px-5 sm:px-8 pt-12 pb-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              {formattedTrack} Track
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-2">
              Practice & Improve
            </h2>

            <p className="mt-2 text-slate-500">
              Complete each challenge to strengthen your prompt engineering skills.
            </p>

          </div>


          <div className="text-sm font-semibold text-slate-500">

            {challenges.length} challenges

          </div>

        </div>


        {/* Cards */}

        {loading ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-[390px] bg-white rounded-3xl border border-slate-200 animate-pulse"
                />
              )
            )}

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {challenges.map(
              (
                challenge,
                index
              ) => {

                const completed =
                  completedChallenges.has(
                    challenge.id
                  );

                return (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    index={index}
                    completed={completed}
                    onOpen={() =>
                      router.push(
                        `/challenges/${track}/${challenge.id}`
                      )
                    }
                  />
                );
              }
            )}

          </div>

        )}

      </section>

    </main>
  );
}


/* ======================================================== */
/* FEATURE PILL */
/* ======================================================== */

function FeaturePill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-700">

      {children}

    </div>
  );
}


/* ======================================================== */
/* HERO STAT */
/* ======================================================== */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">

      <p className="text-2xl sm:text-3xl font-black text-slate-950">
        {value}
      </p>

      <p className="text-xs sm:text-sm text-slate-500 mt-1">
        {label}
      </p>

    </div>
  );
}


/* ======================================================== */
/* CHALLENGE CARD */
/* ======================================================== */

function ChallengeCard({
  challenge,
  index,
  completed,
  onOpen,
}: {
  challenge: Challenge;
  index: number;
  completed: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      className={`
        group relative
        overflow-hidden
        rounded-3xl
        border
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${
          completed
            ? "border-emerald-200"
            : "border-slate-200"
        }
      `}
    >

      {/* Gradient top border */}

      <div
        className={`
          h-1
          ${
            completed
              ? "bg-emerald-400"
              : "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"
          }
        `}
      />


      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div
            className={`
              w-11 h-11 rounded-xl
              flex items-center justify-center
              font-black
              ${
                completed
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-50 text-slate-700"
              }
            `}
          >
            {completed
              ? "✓"
              : String(index + 1).padStart(2, "0")}
          </div>


          <div className="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold">

            ⭐ {challenge.xp} XP

          </div>

        </div>


        {/* Title */}

        <h3 className="mt-6 text-xl font-black leading-tight text-slate-950">

          {challenge.title}

        </h3>


        {/* Description */}

        <p className="mt-3 text-sm leading-relaxed text-slate-500 min-h-[48px]">

          {challenge.description}

        </p>


        {/* Metadata */}

        <div className="mt-6 flex flex-wrap gap-2">

          <span
            className={`
              px-3 py-1.5 rounded-full text-xs font-semibold
              ${
                challenge.difficulty.toLowerCase() ===
                "easy"
                  ? "bg-blue-50 text-blue-600"
                  : challenge.difficulty.toLowerCase() ===
                    "medium"
                  ? "bg-purple-50 text-purple-600"
                  : "bg-red-50 text-red-600"
              }
            `}
          >
            {challenge.difficulty}
          </span>

          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">

            ⏱ {challenge.time}

          </span>

        </div>


        {/* Divider */}

        <div className="border-t border-slate-100 mt-6 pt-5">

          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-xs text-slate-400">
                Learning Track
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Practice & improve
              </p>

            </div>

            <span className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">
              →
            </span>

          </div>


          {/* CTA */}

          <button
            onClick={onOpen}
            className={`
              w-full
              rounded-xl
              py-3.5
              text-sm
              font-bold
              transition-all
              ${
                completed
                  ? "bg-slate-950 hover:bg-slate-800 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100"
              }
            `}
          >

            {completed
              ? "Review Challenge →"
              : "Start Challenge →"}

          </button>

        </div>

      </div>

    </article>
  );
}