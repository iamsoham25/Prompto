"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import API from "@/services/api";

type Lesson = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  order: number;
};

type LevelProgress = {
  completed: number;
  total: number;
};

type DashboardData = {
  success: boolean;
  overall_progress: number;
  completed_lessons: number;
  total_lessons: number;
  beginner: LevelProgress;
  intermediate: LevelProgress;
  advanced: LevelProgress;
};

export default function LearnPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);

  const [intermediateUnlocked, setIntermediateUnlocked] =
    useState(false);

  const [advancedUnlocked, setAdvancedUnlocked] =
    useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    fetchLessons();

    if (email) {
      fetchDashboard(email);
    } else {
      setLoading(false);
    }
  }, []);

  /* =========================================================
     FETCH LESSONS
  ========================================================= */

  const fetchLessons = async () => {
    try {
      const response = await API.get("/lessons");

      const sortedLessons = [...(response.data.lessons || [])].sort(
        (a: Lesson, b: Lesson) => a.order - b.order
      );

      setLessons(sortedLessons);
    } catch (error) {
      console.log("Error fetching lessons:", error);
    }
  };

  /* =========================================================
     FETCH DASHBOARD
  ========================================================= */

  const fetchDashboard = async (email: string) => {
    try {
      const [dashboardResponse, completedResponse] =
        await Promise.all([
          API.get(`/learning-dashboard/${email}`),
          API.get(`/completed-lessons/${email}`),
        ]);

      if (dashboardResponse.data.success) {
        const data: DashboardData = dashboardResponse.data;

        const completed =
          completedResponse.data.completed_lessons || [];

        setDashboard(data);
        setCompletedLessons(completed);

        setProgress(Math.round(data.overall_progress || 0));
        setCompletedCount(data.completed_lessons || 0);
        setTotalLessons(data.total_lessons || 0);

        setIntermediateUnlocked(
          data.beginner.completed === data.beginner.total
        );

        setAdvancedUnlocked(
          data.intermediate.completed ===
            data.intermediate.total
        );
      }
    } catch (error) {
      console.log("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FILTER LESSONS
  ========================================================= */

  const beginnerLessons = useMemo(
    () =>
      lessons
        .filter((lesson) => lesson.level === "Beginner")
        .sort((a, b) => a.order - b.order),
    [lessons]
  );

  const intermediateLessons = useMemo(
    () =>
      lessons
        .filter((lesson) => lesson.level === "Intermediate")
        .sort((a, b) => a.order - b.order),
    [lessons]
  );

  const advancedLessons = useMemo(
    () =>
      lessons
        .filter((lesson) => lesson.level === "Advanced")
        .sort((a, b) => a.order - b.order),
    [lessons]
  );

  /* =========================================================
     LEVEL PROGRESS
  ========================================================= */

  const getLevelCompleted = (levelLessons: Lesson[]) => {
    return levelLessons.filter((lesson) =>
      completedLessons.includes(lesson.id)
    ).length;
  };

  const getLevelPercentage = (levelLessons: Lesson[]) => {
    if (levelLessons.length === 0) return 0;

    return Math.round(
      (getLevelCompleted(levelLessons) /
        levelLessons.length) *
        100
    );
  };

  /* =========================================================
     LESSON STATUS
  ========================================================= */

  const getLessonStatus = (
    lesson: Lesson,
    levelLessons: Lesson[],
    levelUnlocked: boolean
  ) => {
    if (completedLessons.includes(lesson.id)) {
      return "completed";
    }

    if (!levelUnlocked) {
      return "locked";
    }

    const firstIncompleteIndex = levelLessons.findIndex(
      (item) => !completedLessons.includes(item.id)
    );

    const lessonIndex = levelLessons.findIndex(
      (item) => item.id === lesson.id
    );

    if (
      firstIncompleteIndex !== -1 &&
      lessonIndex === firstIncompleteIndex
    ) {
      return "current";
    }

    return "locked";
  };

  /* =========================================================
     LEVEL CONFIG
  ========================================================= */

  const levelConfig = {
    Beginner: {
      number: "01",
      icon: "📘",
      title: "Beginner",
      description:
        "Master the fundamentals of AI and prompt engineering.",
      unlocked: true,
      color: "green",
    },

    Intermediate: {
      number: "02",
      icon: "📗",
      title: "Intermediate",
      description:
        "Build stronger prompting techniques, workflows and structured outputs.",
      unlocked: intermediateUnlocked,
      color: "orange",
    },

    Advanced: {
      number: "03",
      icon: "📕",
      title: "Advanced",
      description:
        "Master advanced AI prompting, reasoning, RAG and security techniques.",
      unlocked: advancedUnlocked,
      color: "pink",
    },
  };

  /* =========================================================
     LEVEL SECTION
  ========================================================= */

  const renderLevelSection = (
    level: "Beginner" | "Intermediate" | "Advanced",
    levelLessons: Lesson[]
  ) => {
    const config = levelConfig[level];

    const completed = getLevelCompleted(levelLessons);
    const percentage = getLevelPercentage(levelLessons);

    return (
      <section
        key={level}
        className="mb-20"
      >
        {/* Level Header */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-[0_8px_30px_rgba(15,23,42,0.06)] px-8 py-7 mb-9">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-5">
              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-slate-50
                  border border-slate-200
                  flex items-center justify-center
                  text-3xl
                  shadow-sm
                "
              >
                {config.icon}
              </div>

              <div>
                <p className="text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-1">
                  Level {config.number}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-950">
                    {config.title}
                  </h2>

                  <span
                    className={`
                      px-3 py-1.5
                      rounded-full
                      text-xs
                      font-bold
                      ${
                        config.unlocked
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }
                    `}
                  >
                    {config.unlocked
                      ? "Unlocked"
                      : "Locked"}
                  </span>
                </div>

                <p className="text-slate-500 mt-1 text-base">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Right Progress */}
            <div className="w-full lg:w-[230px]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-500">
                  {completed} / {levelLessons.length} lessons
                </span>

                <span className="text-sm font-bold text-slate-400">
                  {percentage}%
                </span>
              </div>

              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-orange-400
                    via-pink-500
                    to-purple-500
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <p className="text-right text-xs font-semibold text-slate-400 mt-2">
                {percentage}% complete
              </p>
            </div>
          </div>
        </div>

        {/* Lesson Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {levelLessons.map((lesson) => {
            const status = getLessonStatus(
              lesson,
              levelLessons,
              config.unlocked
            );

            return renderLessonCard(
              lesson,
              status
            );
          })}
        </div>
      </section>
    );
  };

  /* =========================================================
     LESSON CARD
  ========================================================= */

  const renderLessonCard = (
    lesson: Lesson,
    status: string
  ) => {
    const isCompleted = status === "completed";
    const isCurrent = status === "current";
    const isLocked = status === "locked";

    const lessonNumber = String(
      lesson.order
    ).padStart(2, "0");

    const cardContent = (
      <div
        className={`
          relative
          min-h-[390px]
          rounded-[30px]
          p-7
          flex
          flex-col
          justify-between
          transition-all
          duration-300
          border

          ${
            isCompleted
              ? `
                bg-white
                border-emerald-300
                shadow-[0_12px_35px_rgba(16,185,129,0.08)]
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(16,185,129,0.14)]
              `
              : isCurrent
              ? `
                bg-white
                border-orange-300
                shadow-[0_12px_35px_rgba(249,115,22,0.08)]
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(249,115,22,0.15)]
              `
              : `
                bg-slate-50/70
                border-slate-200
              `
          }
        `}
      >
        {/* Top Row */}
        <div>
          <div className="flex items-center justify-between mb-8">
            {/* Status Icon */}
            <div
              className={`
                w-12 h-12
                rounded-2xl
                flex items-center justify-center
                text-lg
                font-bold

                ${
                  isCompleted
                    ? "bg-emerald-100 text-emerald-600"
                    : isCurrent
                    ? "bg-orange-100 text-orange-600"
                    : "bg-slate-100 text-slate-400"
                }
              `}
            >
              {isCompleted
                ? "✓"
                : isCurrent
                ? lessonNumber
                : "🔒"}
            </div>

            {/* Status Badge */}
            <span
              className={`
                px-3.5
                py-2
                rounded-full
                text-xs
                font-bold

                ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-600"
                    : isCurrent
                    ? "bg-orange-50 text-orange-600"
                    : "bg-slate-100 text-slate-400"
                }
              `}
            >
              {isCompleted
                ? "Completed"
                : isCurrent
                ? "Current"
                : "Locked"}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`
              text-2xl
              font-black
              leading-tight
              mb-5

              ${
                isLocked
                  ? "text-slate-500"
                  : "text-slate-950"
              }
            `}
          >
            {isCompleted && "✓ "}
            {lesson.title}
          </h3>

          {/* Description */}
          <p
            className={`
              text-base
              leading-8
              line-clamp-3

              ${
                isLocked
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            {lesson.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold">
              {lesson.level}
            </span>

            <span
              className={`
                text-xs
                font-semibold
                ${
                  isLocked
                    ? "text-slate-300"
                    : "text-slate-400"
                }
              `}
            >
              Lesson {lessonNumber}
            </span>
          </div>

          <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
            <span
              className={`
                font-bold
                text-sm

                ${
                  isCompleted
                    ? "text-emerald-600"
                    : isCurrent
                    ? "text-orange-600"
                    : "text-slate-400"
                }
              `}
            >
              {isCompleted
                ? "✓ Review Lesson"
                : isCurrent
                ? "Continue Learning"
                : "🔒 Complete previous lessons"}
            </span>

            <span
              className={`
                text-xl

                ${
                  isLocked
                    ? "text-slate-300"
                    : isCompleted
                    ? "text-slate-700"
                    : "text-orange-500"
                }
              `}
            >
              {isLocked ? "" : "→"}
            </span>
          </div>
        </div>
      </div>
    );

    if (isLocked) {
      return (
        <div key={lesson.id}>
          {cardContent}
        </div>
      );
    }

    return (
      <Link
        key={lesson.id}
        href={`/learn/${lesson.id}`}
        className="block"
      >
        {cardContent}
      </Link>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-white">
        {/* Very subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 pt-20 pb-20">
          <div className="grid lg:grid-cols-[1fr_0.95fr] gap-14 items-center">
            {/* =================================================
                HERO LEFT
            ================================================= */}

            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-black tracking-[0.2em] uppercase mb-8">
                🚀 Prompto Learning Studio
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl xl:text-[76px] leading-[0.94] font-black tracking-[-0.045em] text-slate-950">
                Learn AI
                <br />
                Engineering.
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Master Prompt
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Engineering.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-8 max-w-[680px] text-lg md:text-xl leading-8 text-slate-500">
                Build your AI engineering skills step by
                step, from fundamental prompt concepts
                to advanced prompting techniques.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-5 py-3 rounded-full border border-slate-200 bg-white shadow-sm text-sm font-bold text-slate-700">
                  📚 Structured Lessons
                </span>

                <span className="px-5 py-3 rounded-full border border-slate-200 bg-white shadow-sm text-sm font-bold text-slate-700">
                  🎯 Beginner → Advanced
                </span>

                <span className="px-5 py-3 rounded-full border border-slate-200 bg-white shadow-sm text-sm font-bold text-slate-700">
                  ⚡ Learn by Practice
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-10">
                <div className="min-w-[140px] rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-950">
                    {totalLessons || lessons.length}+
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Learning Lessons
                  </div>
                </div>

                <div className="min-w-[140px] rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-950">
                    3
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Skill Levels
                  </div>
                </div>

                <div className="min-w-[140px] rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-950">
                    {progress}%
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Overall Progress
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                HERO RIGHT — LEARNING JOURNEY
            ================================================= */}

            <div className="relative">
              {/* Floating Badge */}
              <div className="absolute -top-5 right-8 z-10 px-6 py-3 rounded-2xl bg-white border border-orange-100 shadow-lg text-orange-500 text-xs font-black tracking-wide">
                ✨ YOUR LEARNING JOURNEY
              </div>

              {/* Main Card */}
              <div className="rounded-[34px] bg-white border border-slate-200 shadow-[0_25px_70px_rgba(15,23,42,0.10)] p-7 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      AI Engineering Path
                    </h2>

                    <p className="text-slate-500 mt-1">
                      Progress through your learning journey
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
                    🚀
                  </div>
                </div>

                {/* Beginner */}
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-xl">
                      📘
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-slate-900">
                          Beginner
                        </span>

                        <span className="text-sm font-bold text-emerald-600">
                          {getLevelPercentage(
                            beginnerLessons
                          )}
                          %
                        </span>
                      </div>

                      <div className="h-2 mt-3 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${getLevelPercentage(
                              beginnerLessons
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {getLevelPercentage(
                      beginnerLessons
                    ) === 100 && (
                      <span className="text-emerald-500 text-xl">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Intermediate */}
                <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-xl">
                      📗
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-slate-900">
                          Intermediate
                        </span>

                        <span className="text-sm font-bold text-orange-600">
                          {getLevelPercentage(
                            intermediateLessons
                          )}
                          %
                        </span>
                      </div>

                      <div className="h-2 mt-3 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${getLevelPercentage(
                              intermediateLessons
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <span className="text-slate-500 text-xl">
                      →
                    </span>
                  </div>
                </div>

                {/* Advanced */}
                <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-xl">
                      📕
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-slate-900">
                          Advanced
                        </span>

                        <span className="text-sm font-bold text-purple-600">
                          {getLevelPercentage(
                            advancedLessons
                          )}
                          %
                        </span>
                      </div>

                      <div className="h-2 mt-3 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-700"
                          style={{
                            width: `${getLevelPercentage(
                              advancedLessons
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <span className="text-slate-500 text-xl">
                      →
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black">
                        Ready for your next lesson?
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        Keep learning and build your AI
                        skills.
                      </p>
                    </div>

                    <span className="text-3xl">
                      ⭐
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERALL PROGRESS
      ===================================================== */}

      <section className="max-w-[1280px] mx-auto px-6 md:px-8 mb-16">
        <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] p-7 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase text-orange-500">
                Learning Progress
              </p>

              <h2 className="text-2xl font-black text-slate-950 mt-1">
                Keep going 🚀
              </h2>

              <p className="text-slate-500 mt-1">
                Complete each lesson to build your AI
                engineering skills.
              </p>
            </div>

            <div className="text-right">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                {progress}%
              </div>

              <p className="text-sm font-semibold text-slate-400">
                {completedCount} / {totalLessons} completed
              </p>
            </div>
          </div>

          <div className="mt-7 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          LESSON LEVELS
      ===================================================== */}

      <section className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Beginner */}
        {renderLevelSection(
          "Beginner",
          beginnerLessons
        )}

        {/* Intermediate */}
        {renderLevelSection(
          "Intermediate",
          intermediateLessons
        )}

        {/* Advanced */}
        {renderLevelSection(
          "Advanced",
          advancedLessons
        )}
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="max-w-[1280px] mx-auto px-6 md:px-8 pb-24">
        <div className="relative overflow-hidden rounded-[34px] bg-slate-950 px-8 md:px-16 py-16 text-center">
          {/* Decorative glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="text-5xl mb-5">
              🚀
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white">
              Keep building your AI skills.
            </h2>

            <p className="max-w-2xl mx-auto text-slate-400 text-lg mt-5 leading-8">
              Master the fundamentals, practice advanced
              techniques, and become a stronger AI engineer
              one lesson at a time.
            </p>

            <div className="mt-8">
              <Link
                href={
                  advancedLessons.length > 0
                    ? `/learn/${
                        advancedLessons.find(
                          (lesson) =>
                            !completedLessons.includes(
                              lesson.id
                            )
                        )?.id ||
                        advancedLessons[0].id
                      }`
                    : beginnerLessons.length > 0
                    ? `/learn/${
                        beginnerLessons.find(
                          (lesson) =>
                            !completedLessons.includes(
                              lesson.id
                            )
                        )?.id ||
                        beginnerLessons[0].id
                      }`
                    : "#"
                }
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-8
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  to-pink-500
                  text-white
                  font-black
                  shadow-lg
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  transition-all
                "
              >
                Continue Learning
                <span className="text-xl">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold">
            Loading learning progress...
          </div>
        </div>
      )}
    </main>
  );
}