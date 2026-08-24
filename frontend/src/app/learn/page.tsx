"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/services/api";

type Lesson = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  order: number;
};

export default function LearnPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);

  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);

  const [intermediateUnlocked, setIntermediateUnlocked] =
    useState(false);

  const [advancedUnlocked, setAdvancedUnlocked] =
    useState(false);

  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    fetchLessons();

    if (email) {
      fetchDashboard(email);
    }
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await API.get("/lessons");

      const sortedLessons = response.data.lessons.sort(
        (a: Lesson, b: Lesson) => a.order - b.order
      );

      setLessons(sortedLessons);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboard = async (email: string) => {
    try {
      const dashboardResponse = await API.get(
        `/learning-dashboard/${email}`
      );

      const completedResponse = await API.get(
        `/completed-lessons/${email}`
      );

      if (dashboardResponse.data.success) {
        const data = dashboardResponse.data;

        setDashboard(data);

        setCompletedLessons(
          completedResponse.data.completed_lessons
        );

        setProgress(data.overall_progress);
        setCompletedCount(data.completed_lessons);
        setTotalLessons(data.total_lessons);

        setIntermediateUnlocked(
          data.beginner.completed === data.beginner.total
        );

        setAdvancedUnlocked(
          data.intermediate.completed === data.intermediate.total
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const beginnerLessons = lessons.filter(
    (lesson) => lesson.level === "Beginner"
  );

  const intermediateLessons = lessons.filter(
    (lesson) => lesson.level === "Intermediate"
  );

  const advancedLessons = lessons.filter(
    (lesson) => lesson.level === "Advanced"
  );

  const getLessonStatus = (lesson: Lesson) => {
    if (completedLessons.includes(lesson.id)) {
      return "completed";
    }

    return "available";
  };

  const renderLessonCard = (lesson: Lesson) => {
    const completed = getLessonStatus(lesson) === "completed";

    return (
      <Link
        href={`/learn/${lesson.id}`}
        key={lesson.id}
        className={`
          group relative flex min-h-[300px] flex-col
          justify-between overflow-hidden rounded-[26px]
          border bg-white p-7
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl

          ${
            completed
              ? "border-emerald-300 shadow-sm"
              : "border-slate-200 shadow-sm hover:border-orange-200"
          }
        `}
      >
        {/* Top accent */}
        <div
          className={`
            absolute left-0 right-0 top-0 h-1
            bg-gradient-to-r
            ${
              completed
                ? "from-emerald-400 to-green-500"
                : "from-orange-400 via-pink-500 to-purple-500"
            }
          `}
        />

        <div>
          {/* Status + title */}
          <div className="flex items-start gap-3">
            <div
              className={`
                mt-1 flex h-7 w-7 shrink-0
                items-center justify-center rounded-lg
                text-sm font-bold
                ${
                  completed
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              {completed ? "✓" : "•"}
            </div>

            <h3
              className="
                text-xl font-bold leading-snug
                text-slate-950
                transition-colors
                group-hover:text-orange-600
              "
            >
              {lesson.title}
            </h3>
          </div>

          {/* Description */}
          <p className="mt-5 line-clamp-3 text-[15px] leading-7 text-slate-600">
            {lesson.description.length > 130
              ? lesson.description.slice(0, 130) + "..."
              : lesson.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span
              className="
                rounded-xl bg-orange-50
                px-4 py-2
                text-sm font-semibold
                text-orange-600
              "
            >
              {lesson.level}
            </span>

            {completed && (
              <span
                className="
                  rounded-full bg-emerald-50
                  px-3 py-1.5
                  text-xs font-semibold
                  text-emerald-600
                "
              >
                Completed
              </span>
            )}
          </div>

          <div
            className="
              mt-5 flex items-center
              text-sm font-bold
              text-orange-500
              transition-all
              group-hover:gap-2
            "
          >
            {completed ? "Review Lesson" : "Read Lesson"}
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    );
  };

  const renderLevelHeader = (
    emoji: string,
    label: string,
    description: string,
    accent: string
  ) => (
    <div className="mb-7 flex items-end justify-between gap-6">
      <div>
        <div
          className={`mb-2 text-xs font-bold uppercase tracking-[0.22em] ${accent}`}
        >
          Learning Path
        </div>

        <h2 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          <span>{emoji}</span>
          {label} Level
        </h2>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* Unlock notification */}
      {showUnlock && (
        <div
          className="
            fixed left-1/2 top-8 z-50
            -translate-x-1/2
            rounded-2xl bg-emerald-500
            px-8 py-4
            font-semibold text-white
            shadow-2xl
          "
        >
          🎉 New Level Unlocked!
        </div>
      )}

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-orange-500
            via-pink-500
            to-purple-600
          "
        />

        <div className="absolute inset-0 opacity-20">
          <div
            className="
              absolute -right-32 -top-32
              h-[500px] w-[500px]
              rounded-full
              bg-white blur-3xl
            "
          />

          <div
            className="
              absolute -bottom-40 left-10
              h-[400px] w-[400px]
              rounded-full
              bg-purple-900 blur-3xl
            "
          />
        </div>

        <div
          className="
            relative mx-auto
            max-w-7xl
            px-5 py-16
            sm:px-8 sm:py-20
            lg:px-10
          "
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-white/30
              bg-white/10
              px-4 py-2
              text-xs font-bold
              uppercase tracking-[0.18em]
              text-white
              backdrop-blur-md
            "
          >
            🚀 Prompto Learning Studio
          </div>

          <div className="mt-7 max-w-4xl">
            <h1
              className="
                text-4xl font-black
                leading-[1.05]
                tracking-tight text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Learn AI Engineering.
              <br />
              <span className="text-orange-100">
                Master Prompt Engineering.
              </span>
            </h1>

            <p
              className="
                mt-6 max-w-2xl
                text-base leading-7
                text-white/85
                sm:text-lg
              "
            >
              Build your AI engineering skills step by step,
              from fundamental prompt concepts to advanced
              prompting techniques.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                📚 Structured Lessons
              </span>

              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                🎯 Beginner → Advanced
              </span>

              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                ⚡ Learn by Practice
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PROGRESS */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          className="
            rounded-[28px]
            border border-slate-200
            bg-white
            p-6
            shadow-xl
            sm:p-8
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="
                  text-xs font-bold
                  uppercase tracking-[0.2em]
                  text-orange-500
                "
              >
                Learning Progress
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Keep going 🚀
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete each lesson to build your AI engineering skills.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl font-black text-orange-500">
                {progress}%
              </div>

              <div className="text-sm font-medium text-slate-500">
                {completedCount} / {totalLessons}
              </div>
            </div>
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="
                h-full rounded-full
                bg-gradient-to-r
                from-orange-400
                via-pink-500
                to-purple-500
                transition-all duration-700
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-4 text-sm font-medium text-slate-500">
            {completedCount} of {totalLessons} lessons completed
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* LESSONS */}
      {/* ========================================================= */}

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 lg:px-10">

        {/* BEGINNER */}
        <section>
          {renderLevelHeader(
            "📘",
            "Beginner",
            "Build a strong foundation in AI and prompt engineering.",
            "text-blue-600"
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beginnerLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* INTERMEDIATE */}
        <section className="mt-20">
          {renderLevelHeader(
            "📗",
            "Intermediate",
            "Move beyond the basics and learn practical prompting techniques.",
            "text-emerald-600"
          )}

          {intermediateUnlocked ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {intermediateLessons.map(renderLessonCard)}
            </div>
          ) : (
            <div
              className="
                relative overflow-hidden
                rounded-[28px]
                border border-slate-200
                bg-white
                p-10
                text-center
                shadow-sm
                sm:p-14
              "
            >
              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  bg-slate-100
                  text-3xl
                "
              >
                🔒
              </div>

              <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
                Intermediate Locked
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Complete all Beginner lessons to unlock the
                Intermediate learning path.
              </p>

              <div className="mx-auto mt-6 h-2 max-w-sm overflow-hidden rounded-full bg-slate-100">
                <div
                  className="
                    h-full rounded-full
                    bg-gradient-to-r
                    from-orange-400 to-pink-500
                  "
                  style={{
                    width: `${
                      beginnerLessons.length > 0
                        ? Math.min(
                            100,
                            (completedLessons.filter((id) =>
                              beginnerLessons.some(
                                (lesson) => lesson.id === id
                              )
                            ).length /
                              beginnerLessons.length) *
                              100
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          )}
        </section>

        {/* ADVANCED */}
        <section className="mt-20">
          {renderLevelHeader(
            "📕",
            "Advanced",
            "Explore advanced prompting frameworks and AI engineering techniques.",
            "text-pink-600"
          )}

          {advancedUnlocked ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {advancedLessons.map(renderLessonCard)}
            </div>
          ) : (
            <div
              className="
                relative overflow-hidden
                rounded-[28px]
                border border-slate-200
                bg-white
                p-10
                text-center
                shadow-sm
                sm:p-14
              "
            >
              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  bg-slate-100
                  text-3xl
                "
              >
                🔒
              </div>

              <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
                Advanced Locked
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Complete the Intermediate learning path to
                unlock Advanced lessons.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
                🔐 Complete Intermediate to unlock
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}