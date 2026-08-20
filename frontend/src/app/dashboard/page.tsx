"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/services/api";

/* ============================================================
   TYPES
   ============================================================ */

   
type Skill = {
  name: string;
  score: number;
};

type Achievement = {
  title: string;
  icon: string;
  unlocked: boolean;
};

type Activity = {
  id?: string;
  title: string;
  type: string;
  score: number;
  xp: number;
  status: string;
  created_at?: string;
};

type DashboardData = {
  username: string;
  email: string;

  xp: number;
  level: number;
  rank: string;
  xp_progress: number;

  completed_lessons: number;
  completed_challenges: number;

  streak: number;
  attempts: number;

  skills: Skill[];

  mastery_level: string;
  average_score: number;
  best_score: number;
  lowest_score: number;

  strongest_skill: string;
  weakest_skill: string;
  recommendation: string;

  achievements: Achievement[];

  recentActivity: Activity[];

  learningPath: {
    name: string;
    progress: number;
    status: string;
  }[];
};

/* ============================================================
   HELPERS
   ============================================================ */

function safeNumber(value: any, fallback = 0): number {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}


function calculateMastery(score: number): string {
  if (score >= 90) return "Master";
  if (score >= 80) return "Advanced";
  if (score >= 60) return "Intermediate";

  return "Beginner";
}


function formatDate(value?: string): string {
  if (!value) return "";

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}


/* ============================================================
   DEFAULT SKILLS
   ============================================================ */

const DEFAULT_SKILLS: Skill[] = [
  {
    name: "Clarity",
    score: 0,
  },
  {
    name: "Specificity",
    score: 0,
  },
  {
    name: "Context",
    score: 0,
  },
  {
    name: "Constraints",
    score: 0,
  },
  {
    name: "Role",
    score: 0,
  },
  {
    name: "Output Format",
    score: 0,
  },
  {
    name: "Examples",
    score: 0,
  },
];


/* ============================================================
   MAIN DASHBOARD
   ============================================================ */

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [data, setData] = useState<DashboardData>({
    username: "User",
    email: "",

    xp: 0,
    level: 1,
    rank: "Beginner",
    xp_progress: 0,

    completed_lessons: 0,
    completed_challenges: 0,

    streak: 0,
    attempts: 0,

    skills: DEFAULT_SKILLS,

    mastery_level: "Beginner",
    average_score: 0,
    best_score: 0,
    lowest_score: 0,

    strongest_skill: "-",
    weakest_skill: "-",

    recommendation:
      "Start practicing prompts to build your Prompt Engineering skills.",

    achievements: [],

    recentActivity: [],

    learningPath: [
      {
        name: "Prompt Fundamentals",
        progress: 0,
        status: "Locked",
      },
      {
        name: "Prompt Structure",
        progress: 0,
        status: "Locked",
      },
      {
        name: "Advanced Prompting",
        progress: 0,
        status: "Locked",
      },
      {
        name: "AI Agents",
        progress: 0,
        status: "Locked",
      },
    ],
  });

  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();

    // Keep the greeting synchronized with the real time.
    const interval = setInterval(updateGreeting, 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  /* ==========================================================
     LOAD DASHBOARD
     ========================================================== */

  useEffect(() => {

    const token = localStorage.getItem("token");

    const email = localStorage.getItem("userEmail");

    if (!token || !email) {

      router.push("/login");

      return;
    }

    loadDashboard(email);

  }, [router]);


  /* ==========================================================
     DASHBOARD API LOADER
     ========================================================== */

  const loadDashboard = async (email: string) => {

    setLoading(true);

    setError("");

    try {

      /*
       * IMPORTANT:
       *
       * We use Promise.allSettled instead of Promise.all.
       *
       * If one optional API fails, the entire Dashboard
       * should NOT disappear.
       */

      const results = await Promise.allSettled([

        // 1. Main dashboard information
        API.get(
          `/dashboard-summary/${encodeURIComponent(email)}`
        ),

        // 2. XP profile
        API.get(
          `/xp/${encodeURIComponent(email)}`
        ),

        // 3. User rank
        API.get(
          `/user-rank/${encodeURIComponent(email)}`
        ),

        // 4. Challenge statistics
        API.get(
          `/challenge-stats/${encodeURIComponent(email)}`
        ),

        // 5. Lesson analytics
        API.get(
          `/lesson-analytics/${encodeURIComponent(email)}`
        ),

        // 6. Prompt skill snapshot
        API.get(
          `/current-skills/${encodeURIComponent(email)}`
        ),

        // 7. Prompt activity
        API.get(
          `/recent-activity/${encodeURIComponent(email)}`
        ),

        // 8. Achievements
        API.get(
          `/achievements/${encodeURIComponent(email)}`
        ),

        // 9. Prompt analytics
        API.get(
          `/dashboard/analytics/${encodeURIComponent(email)}`
        ),

      ]);


      /* ========================================================
         SAFE RESPONSE EXTRACTION
         ======================================================== */

      const getResponse = (index: number): any => {

        const result = results[index];

        if (result.status === "fulfilled") {

          return result.value.data;

        }

        console.warn(
          `Dashboard API ${index + 1} failed:`,
          result.reason
        );

        return null;
      };


      const dashboardResponse = getResponse(0);

      const xpResponse = getResponse(1);

      const rankResponse = getResponse(2);

      const challengeResponse = getResponse(3);

      const lessonResponse = getResponse(4);

      const skillsResponse = getResponse(5);

      const activityResponse = getResponse(6);

      const achievementsResponse = getResponse(7);

      const analyticsResponse = getResponse(8);


      /* ========================================================
         USER
         ======================================================== */

      const username =
        dashboardResponse?.username ||
        localStorage.getItem("userName") ||
        email.split("@")[0] ||
        "User";


      /* ========================================================
         XP
         ======================================================== */

      const xp = safeNumber(
        xpResponse?.xp ??
        dashboardResponse?.xp,
        0
      );


      const level = safeNumber(
        xpResponse?.level ??
        dashboardResponse?.level,
        1
      );


      const rank =
        rankResponse?.rank !== undefined
          ? `#${rankResponse.rank}`
          : dashboardResponse?.rank || "—";


      const xpProgress = safeNumber(
        xpResponse?.progress ??
        dashboardResponse?.xp_progress,
        0
      );


      /* ========================================================
         CHALLENGES
         ======================================================== */

      const completedChallenges = safeNumber(
        challengeResponse?.completed ??
        dashboardResponse?.completed_challenges,
        0
      );


      const attempts = safeNumber(
        challengeResponse?.attempts,
        0
      );


      /* ========================================================
         STREAK
         ======================================================== */

      const streak = safeNumber(
        lessonResponse?.streak ??
        dashboardResponse?.streak,
        0
      );


      /* ========================================================
         SKILLS
         ======================================================== */

      let skills: Skill[] = [];


      if (
        skillsResponse &&
        Array.isArray(skillsResponse.skills)
      ) {

        skills = skillsResponse.skills.map(
          (skill: any) => ({
            name:
              skill.name ||
              skill.skill ||
              "Skill",

            score: Math.max(
              0,
              Math.min(
                100,
                safeNumber(
                  skill.score,
                  0
                )
              )
            ),
          })
        );

      }


      /*
       * If current-skills API doesn't return data,
       * try the analytics API.
       */

      if (skills.length === 0) {

        if (
          analyticsResponse &&
          Array.isArray(
            analyticsResponse.radar
          )
        ) {

          skills =
            analyticsResponse.radar.map(
              (skill: any) => ({
                name:
                  skill.skill ||
                  skill.name ||
                  "Skill",

                score: Math.max(
                  0,
                  Math.min(
                    100,
                    safeNumber(
                      skill.score,
                      0
                    )
                  )
                ),
              })
            );

        }

      }


      /*
       * Finally use the known skill structure.
       */

      if (skills.length === 0) {

        skills = DEFAULT_SKILLS.map(
          (skill) => ({
            ...skill,
          })
        );

      }


      /* ========================================================
         NORMALIZE SKILLS
         ======================================================== */

      const skillMap: Record<string, number> = {};

      skills.forEach((skill) => {

        skillMap[
          skill.name.toLowerCase()
        ] = skill.score;

      });


      const normalizedSkills: Skill[] =
        DEFAULT_SKILLS.map(
          (defaultSkill) => {

            const exact =
              skillMap[
                defaultSkill.name.toLowerCase()
              ];

            return {

              name: defaultSkill.name,

              score:
                exact !== undefined
                  ? exact
                  : 0,

            };

          }
        );


      /* ========================================================
         SKILL SCORE
         ======================================================== */

      const validSkillScores =
        normalizedSkills
          .map(
            (skill) =>
              safeNumber(
                skill.score,
                0
              )
          );


      const averageScore =
        validSkillScores.length > 0
          ? Math.round(
              validSkillScores.reduce(
                (sum, score) =>
                  sum + score,
                0
              ) /
                validSkillScores.length
            )
          : safeNumber(
              analyticsResponse?.cards
                ?.average_score,
              0
            );


      const bestScore =
        analyticsResponse?.cards
          ?.best_score !== undefined
          ? safeNumber(
              analyticsResponse.cards
                .best_score
            )
          : Math.max(
              ...validSkillScores,
              0
            );


      const lowestScore =
        analyticsResponse?.cards
          ?.lowest_score !== undefined
          ? safeNumber(
              analyticsResponse.cards
                .lowest_score
            )
          : Math.min(
              ...validSkillScores,
              0
            );


      /* ========================================================
         STRONGEST / WEAKEST
         ======================================================== */

      const sortedSkills =
        [...normalizedSkills].sort(
          (a, b) =>
            b.score - a.score
        );


      const strongestSkill =
        analyticsResponse?.insights
          ?.strongest ||
        sortedSkills[0]?.name ||
        "-";


      const weakestSkill =
        analyticsResponse?.insights
          ?.weakest ||
        sortedSkills[
          sortedSkills.length - 1
        ]?.name ||
        "-";


      /* ========================================================
         MASTERY
         ======================================================== */

      const masteryLevel =
        analyticsResponse?.mastery_level ||
        calculateMastery(
          averageScore
        );


      /* ========================================================
         RECOMMENDATION
         ======================================================== */

      const recommendation =
        analyticsResponse?.insights
          ?.recommendation ||
        dashboardResponse?.recommendation ||
        `Your weakest current area is ${weakestSkill}. Practice this skill in the Playground and re-evaluate your prompts to track improvement.`;


      /* ========================================================
         ACHIEVEMENTS
         ======================================================== */

      let achievements: Achievement[] =
        [];

      if (
        achievementsResponse &&
        Array.isArray(
          achievementsResponse.achievements
        )
      ) {

        achievements =
          achievementsResponse.achievements.map(
            (achievement: any) => ({

              title:
                achievement.title ||
                "Achievement",

              icon:
                achievement.icon ||
                "🏆",

              /*
               * IMPORTANT:
               *
               * Never assume an achievement
               * is unlocked.
               */

              unlocked:
                achievement.unlocked === true,

            })
          );

      }


      /* ========================================================
         RECENT ACTIVITY
         ======================================================== */

      let recentActivity: Activity[] =
        [];


      if (
        activityResponse &&
        Array.isArray(
          activityResponse.activities
        )
      ) {

        recentActivity =
          activityResponse.activities
            .map(
              (
                activity: any,
                index: number
              ) => ({

                id:
                  activity.id ||
                  `${index}-${activity.created_at || ""}`,

                title:
                  activity.title ||
                  "Prompt Activity",

                type:
                  activity.type ||
                  "Activity",

                score:
                  safeNumber(
                    activity.score,
                    0
                  ),

                xp:
                  safeNumber(
                    activity.xp ??
                    activity.reward ??
                    activity.reward_xp,
                    0
                  ),

                status:
                  activity.status ||
                  "Completed",

                created_at:
                  activity.created_at,

              })
            );

      }


      /*
       * Do not allow hundreds of activities
       * to make the Dashboard unnecessarily huge.
       */

      recentActivity =
        recentActivity.slice(0, 10);


      /* ========================================================
         LEARNING PATH
         ======================================================== */

      const completedLessons =
        safeNumber(
          lessonResponse?.completed_lessons ??
          dashboardResponse?.completed_lessons,
          0
        );


      const totalLessons =
        safeNumber(
          lessonResponse?.completed_lessons,
          completedLessons
        ) +
        safeNumber(
          lessonResponse?.remaining_lessons,
          0
        );


      const overallProgress =
        safeNumber(
          lessonResponse?.overall_progress,
          0
        );


      /*
       * We intentionally do NOT invent individual lesson
       * percentages if the backend doesn't provide them.
       *
       * The first two levels can be represented using
       * the overall learning progress only when enough
       * information is available.
       */

      let learningPath = [
        {
          name: "Prompt Fundamentals",
          progress: 0,
          status: "Locked",
        },
        {
          name: "Prompt Structure",
          progress: 0,
          status: "Locked",
        },
        {
          name: "Advanced Prompting",
          progress: 0,
          status: "Locked",
        },
        {
          name: "AI Agents",
          progress: 0,
          status: "Locked",
        },
      ];


      /*
       * If your backend provides a learning array,
       * use it directly.
       */

      if (
        Array.isArray(
          lessonResponse?.learning
        )
      ) {

        learningPath =
          lessonResponse.learning.map(
            (item: any) => ({

              name:
                item.name ||
                item.title ||
                "Learning Module",

              progress: Math.max(
                0,
                Math.min(
                  100,
                  safeNumber(
                    item.progress,
                    0
                  )
                )
              ),

              status:
                item.status ||
                (
                  safeNumber(
                    item.progress,
                    0
                  ) >= 100
                    ? "Completed"
                    : "In Progress"
                ),

            })
          );

      } else {

        /*
         * Conservative fallback.
         *
         * If the backend says the entire course is 100%,
         * mark all available levels complete.
         *
         * Otherwise show overall progress only on the
         * first learning module.
         */

        if (overallProgress >= 100) {

          learningPath = [
            {
              name: "Prompt Fundamentals",
              progress: 100,
              status: "Completed",
            },
            {
              name: "Prompt Structure",
              progress: 100,
              status: "Completed",
            },
            {
              name: "Advanced Prompting",
              progress: 100,
              status: "Completed",
            },
            {
              name: "AI Agents",
              progress: 100,
              status: "Completed",
            },
          ];

        } else if (overallProgress > 0) {

          learningPath[0] = {

            name: "Prompt Fundamentals",

            progress:
              overallProgress,

            status:
              overallProgress >= 100
                ? "Completed"
                : "In Progress",

          };

        } else if (completedLessons > 0) {

          learningPath[0] = {

            name: "Prompt Fundamentals",

            progress: 100,

            status: "Completed",

          };

        }

      }


      /* ========================================================
         FINAL STATE
         ======================================================== */

      setData({

        username,

        email,

        xp,

        level,

        rank,

        xp_progress:
          Math.max(
            0,
            Math.min(
              100,
              xpProgress
            )
          ),

        completed_lessons:
          completedLessons,

        completed_challenges:
          completedChallenges,

        streak,

        attempts,

        skills:
          normalizedSkills,

        mastery_level:
          masteryLevel,

        average_score:
          averageScore,

        best_score:
          bestScore,

        lowest_score:
          lowestScore,

        strongest_skill:
          strongestSkill,

        weakest_skill:
          weakestSkill,

        recommendation,

        achievements,

        recentActivity,

        learningPath,

      });


    } catch (err) {

      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        "Unable to load dashboard data."
      );

    } finally {

      setLoading(false);

    }

  };


  /* ==========================================================
     DERIVED VALUES
     ========================================================== */

  const currentWeakestSkill =
    useMemo(() => {

      if (
        data.skills.length === 0
      ) {

        return "-";

      }

      return [...data.skills].sort(
        (a, b) =>
          a.score - b.score
      )[0].name;

    }, [data.skills]);


  const currentWeakestScore =
    useMemo(() => {

      if (
        data.skills.length === 0
      ) {

        return 0;

      }

      return Math.min(
        ...data.skills.map(
          (skill) =>
            skill.score
        )
      );

    }, [data.skills]);


  /* ==========================================================
     LOADING
     ========================================================== */

  if (loading) {

    return (

      <main className="min-h-screen bg-[#f7f8fc]">

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

            <p className="text-lg font-semibold text-slate-700">

              Loading your dashboard...

            </p>

          </div>

        </div>

      </main>

    );

  }


  /* ==========================================================
     DASHBOARD UI
     ========================================================== */

  return (

    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">

      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="relative overflow-hidden bg-[#080510] px-6 pt-6 pb-12 text-white lg:px-12 lg:pt-7 lg:pb-14">

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute left-[-150px] top-[-150px] h-[500px] w-[500px] rounded-full bg-purple-700/25 blur-[140px]" />

        <div className="absolute right-[-100px] top-[-100px] h-[500px] w-[500px] rounded-full bg-pink-700/25 blur-[140px]" />

        <div className="relative mx-auto max-w-[1500px]">

          {/* Workspace badge */}

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-300">

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            Personal AI Workspace

          </div>


          <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

            {/* LEFT */}

            <div>

              <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-300">

                Prompt Engineering Dashboard

              </p>


              <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-[76px]">
                <span className="block text-white">
                  {greeting.split(" ")[0]}
                </span>

                <span className="block text-white">
                  {greeting.split(" ")[1]},
                </span>

                <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {data.username}.
                </span>
              </h1>


              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">

                Keep building better prompts, complete challenges,
                strengthen your weak skills and move toward Prompt
                Engineering mastery.

              </p>


              {/* Mini stats */}

              <div className="mt-10 flex flex-wrap gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-5">

                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">

                    XP

                  </p>

                  <p className="mt-2 text-3xl font-black">

                    {data.xp}

                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-5">

                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">

                    Rank

                  </p>

                  <p className="mt-2 text-3xl font-black">

                    {data.rank}

                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-5">

                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">

                    Streak

                  </p>

                  <p className="mt-2 text-3xl font-black">

                    {data.streak} days 🔥

                  </p>

                </div>

              </div>


              {/* Buttons */}

              <div className="mt-10 flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    router.push("/playground")
                  }
                  className="rounded-2xl bg-orange-500 px-8 py-4 font-black text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
                >

                  Continue Practicing →

                </button>


                <button
                  onClick={() =>
                    router.push("/learn")
                  }
                  className="rounded-2xl border border-white/15 bg-white/[0.05] px-8 py-4 font-black text-white transition hover:bg-white/[0.1]"
                >

                  Continue Learning

                </button>

              </div>

            </div>


            {/* RIGHT - MASTERY */}

            <div className="relative">

              <div className="absolute right-10 top-[-80px] hidden rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 sm:block">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">

                  Skill

                </p>

                <p className="font-black">

                  Prompting

                </p>

              </div>


              <div className="relative -mt-2">

                <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
    
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-3xl" />

                  {/* Outer ring */}
                  <div className="absolute inset-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/[0.06] shadow-[0_0_90px_rgba(236,72,153,0.28)]" />

                  {/* 3D sphere */}

                  <div
                    className="
                      relative
                      flex h-40 w-40
                      items-center justify-center
                      overflow-hidden
                      rounded-full
                      border border-white/20
                      bg-gradient-to-br
                      from-orange-300
                      via-pink-500
                      to-purple-700
                      shadow-[inset_-18px_-22px_35px_rgba(45,0,70,0.45),inset_14px_12px_25px_rgba(255,255,255,0.32),0_20px_60px_rgba(236,72,153,0.35)]
                    "
                  >
                    {/* Main reflection */}
                    <div className="absolute left-7 top-5 h-12 w-20 rotate-[-25deg] rounded-full bg-white/35 blur-md" />

                    {/* Small reflection */}
                    <div className="absolute right-7 top-10 h-5 w-5 rounded-full bg-white/30 blur-sm" />

                    {/* Inner shadow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/30" />

                    {/* Initial */}
                    <span className="relative z-10 text-6xl font-black text-white drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
                      {data.username.charAt(0).toUpperCase()}

                    </span>

                  </div>

                </div>

              </div>


              <div className="mt-[-4px] rounded-[28px] border border-white/10 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-xl">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">

                  Prompt Mastery

                </p>


                <p className="mt-5 text-sm text-slate-400">

                  Current Level

                </p>


                <h2 className="mt-1 text-3xl font-black">

                  {data.mastery_level}

                </h2>


                <p className="mt-8 text-sm text-slate-400">

                  Current Skill Score

                </p>


                <div className="mt-1 flex items-end gap-2">

                  <span className="text-5xl font-black">

                    {data.average_score}

                  </span>

                  <span className="pb-2 text-slate-500">

                    /100

                  </span>

                </div>


                <p className="mt-2 text-sm text-slate-500">

                  Based on your current skill snapshot

                </p>


                <div className="mt-8">

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-400">

                      Progress to next level

                    </span>

                    <span className="font-bold">

                      {data.xp_progress}%

                    </span>

                  </div>


                  <div className="h-3 overflow-hidden rounded-full bg-white/10">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 transition-all"
                      style={{
                        width: `${data.xp_progress}%`,
                      }}
                    />

                  </div>

                </div>


                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-5">

                    <p className="text-sm text-slate-500">

                      Challenges

                    </p>

                    <p className="mt-2 text-3xl font-black">

                      {data.completed_challenges}

                    </p>

                  </div>


                  <div className="rounded-2xl border border-white/10 bg-black/10 p-5">

                    <p className="text-sm text-slate-500">

                      Attempts

                    </p>

                    <p className="mt-2 text-3xl font-black">

                      {data.attempts}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ERROR NOTICE
          ====================================================== */}

      {error && (

        <div className="mx-auto max-w-7xl px-6 pt-8">

          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">

            {error}

          </div>

        </div>

      )}


      {/* ======================================================
          KPI CARDS
          ====================================================== */}

      <section className="px-6 py-14 lg:px-12">

        <div className="mx-auto grid max-w-[1500px] gap-5 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            label="Total XP"
            value={data.xp}
            suffix="XP"
            icon="⚡"
          />

          <StatCard
            label="Streak"
            value={data.streak}
            suffix="days"
            icon="🔥"
          />

          <StatCard
            label="Challenges"
            value={data.completed_challenges}
            suffix=""
            icon="🏆"
          />

          <StatCard
            label="Attempts"
            value={data.attempts}
            suffix=""
            icon="🎯"
          />

          <StatCard
            label="Level"
            value={data.level}
            suffix=""
            icon="🚀"
          />

        </div>

      </section>


      {/* ======================================================
          SKILLS
          ====================================================== */}

      <section className="px-6 pb-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="mb-10">

            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">

              Your Progress

            </p>

            <h2 className="mt-3 text-5xl font-black tracking-[-0.05em]">

              Build better{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">

                skills.

              </span>

            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">

              Your Dashboard shows your current skill state.
              Detailed trends and historical analysis are available
              separately in Analytics.

            </p>

          </div>


          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

            {/* SKILL SNAPSHOT */}

            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">

                    Current Snapshot

                  </p>

                  <h3 className="mt-2 text-3xl font-black">

                    Prompt Engineering Skills

                  </h3>

                </div>


                <button
                  onClick={() =>
                    router.push("/analytics")
                  }
                  className="font-bold text-orange-500 hover:text-orange-600"
                >

                  View Analytics →

                </button>

              </div>


              <div className="mt-10 space-y-8">

                {data.skills.map(
                  (skill) => (

                    <div
                      key={skill.name}
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="font-black">

                            {skill.name}

                          </p>

                          <p className="mt-1 text-sm text-slate-400">

                            {getSkillDescription(
                              skill.name
                            )}

                          </p>

                        </div>


                        <span className="text-2xl font-black">

                          {skill.score}

                        </span>

                      </div>


                      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-all duration-700"
                          style={{
                            width: `${skill.score}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* CURRENT LEVEL */}

            <div className="self-start rounded-[30px] bg-gradient-to-br from-[#19002f] via-[#100018] to-[#050008] p-8 text-white shadow-[0_25px_70px_rgba(20,0,40,0.18)]">

              <div className="text-xs font-bold uppercase tracking-[0.22em] text-pink-400">
                Current Level
              </div>

              <h3 className="mt-5 text-4xl font-black tracking-tight">
                {data.mastery_level}
              </h3>

              <p className="mt-5 max-w-md text-base leading-7 text-blue-200/80">
                Build a strong foundation in roles, context,
                constraints and structured output.
              </p>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200/80">
                    Level Progress
                  </span>

                  <span className="text-sm font-bold text-white">
                    {data.xp_progress}%
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                    style={{
                      width: `${data.xp_progress}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                href="/learn"
                className="mt-10 inline-flex rounded-2xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
              >
                Continue Learning →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          AI RECOMMENDATION
          ====================================================== */}

      <section className="px-6 pb-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="relative overflow-hidden rounded-[30px] border border-purple-200 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-10 shadow-sm">

            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-purple-300/30 blur-[100px]" />

            <div className="relative">

              <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-600">

                ✦ AI Recommendation

              </p>


              <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-4xl font-black tracking-[-0.04em]">

                    Your next improvement is{" "}

                    <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">

                      {currentWeakestSkill}.

                    </span>

                  </h2>


                  <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">

                    Your current score is{" "}

                    <strong>
                      {currentWeakestScore}/100
                    </strong>
                    . Your weakest current area is{" "}

                    <strong>
                      {currentWeakestSkill}
                    </strong>
                    . Practice this skill in the Playground and
                    re-evaluate your prompts to track improvement.

                  </p>


                  <p className="mt-4 max-w-3xl text-slate-500">

                    {data.recommendation}

                  </p>

                </div>


                <button
                  onClick={() =>
                    router.push("/playground")
                  }
                  className="shrink-0 rounded-2xl bg-[#080510] px-7 py-4 font-black text-white transition hover:-translate-y-1"
                >

                  Practice {currentWeakestSkill} →

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ACHIEVEMENTS
          ====================================================== */}

      <section className="bg-white px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">

            Achievements

          </p>


          <h2 className="mt-3 text-5xl font-black tracking-[-0.05em]">

            Progress worth celebrating.

          </h2>


          {data.achievements.length === 0 ? (

            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 p-10 text-center">

              <p className="font-bold text-slate-500">

                No achievements unlocked yet.

              </p>

              <p className="mt-2 text-sm text-slate-400">

                Keep practicing to unlock your first achievement.

              </p>

            </div>

          ) : (

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {data.achievements.map(
                (achievement) => (

                  <div
                    key={achievement.title}
                    className={`rounded-[26px] border p-7 transition ${
                      achievement.unlocked
                        ? "border-slate-200 bg-[#f8f9fc] shadow-sm"
                        : "border-slate-200 bg-slate-50 opacity-60"
                    }`}
                  >

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">

                      {achievement.icon}

                    </div>


                    <h3 className="mt-7 text-xl font-black">

                      {achievement.title}

                    </h3>


                    <p className="mt-3 text-slate-500">

                      {getAchievementDescription(
                        achievement.title
                      )}

                    </p>


                    <p
                      className={`mt-6 font-bold ${
                        achievement.unlocked
                          ? "text-emerald-500"
                          : "text-slate-400"
                      }`}
                    >

                      {achievement.unlocked
                        ? "✓ Unlocked"
                        : "🔒 Locked"}

                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>


      {/* ======================================================
          LEARNING PATH
          ====================================================== */}

      <section className="bg-[#f7f8fc] px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-500">

            Learning Path

          </p>


          <h2 className="mt-3 text-5xl font-black tracking-[-0.05em]">

            Your next skill always has a path.

          </h2>


          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">

            Learn concepts in order, practice them with real tools,
            and gradually move toward advanced Prompt Engineering.

          </p>


          <div className="mt-12 space-y-5">

            {data.learningPath.map(
              (item, index) => (

                <div
                  key={item.name}
                  className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
                >

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

                    {/* NUMBER */}

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#080510] text-lg font-black text-white">

                      {String(
                        index + 1
                      ).padStart(2, "0")}

                    </div>


                    {/* NAME */}

                    <div className="w-full max-w-[280px]">

                      <h3 className="font-black text-lg">

                        {item.name}

                      </h3>


                      <p
                        className={`mt-2 font-semibold ${
                          item.status ===
                          "Completed"
                            ? "text-emerald-500"
                            : item.status ===
                              "In Progress"
                            ? "text-orange-500"
                            : "text-slate-400"
                        }`}
                      >

                        {item.status}

                      </p>

                    </div>


                    {/* PROGRESS */}

                    <div className="flex-1">

                      <div className="mb-3 flex justify-between">

                        <span className="text-sm font-semibold text-slate-400">

                          Progress

                        </span>

                        <span className="font-black">

                          {item.progress}%

                        </span>

                      </div>


                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 transition-all"
                          style={{
                            width: `${item.progress}%`,
                          }}
                        />

                      </div>

                    </div>


                    <button
                      onClick={() =>
                        router.push("/learn")
                      }
                      className="text-2xl text-slate-300 transition hover:text-orange-500"
                    >

                      →

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* ======================================================
          RECENT ACTIVITY
          ====================================================== */}

      <section className="relative overflow-hidden bg-[#070713] px-6 py-20 text-white lg:px-12">

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />


        <div className="absolute right-[-100px] top-[-100px] h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[120px]" />


        <div className="relative mx-auto max-w-[1500px]">

          <div className="mb-10">

            <p className="text-xs font-black uppercase tracking-[0.22em] text-pink-400">

              Recent Activity

            </p>


            <h2 className="mt-3 text-5xl font-black tracking-[-0.04em]">

              Keep practicing.

              <br />

              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">

                Keep improving.

              </span>

            </h2>

          </div>


          {data.recentActivity.length === 0 ? (

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-10 text-center">

              <p className="font-bold text-slate-400">

                No recent activity yet.

              </p>

              <button
                onClick={() =>
                  router.push("/playground")
                }
                className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-bold"
              >

                Start Practicing →

              </button>

            </div>

          ) : (

            <div className="grid gap-4">

              {data.recentActivity.map(
                (activity, index) => (

                  <div
                    key={
                      activity.id ||
                      `${activity.title}-${index}`
                    }
                    className="group flex flex-col gap-5 rounded-[22px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 text-sm font-black">

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </div>


                      <div>

                        <p className="font-bold">

                          {activity.title}

                        </p>


                        <p className="mt-1 text-sm text-slate-500">

                          {activity.type}

                          {activity.created_at &&
                            ` • ${formatDate(
                              activity.created_at
                            )}`}

                        </p>

                      </div>

                    </div>


                    <div className="flex flex-wrap items-center gap-7">

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-slate-500">

                          Score

                        </p>


                        <p className="mt-1 text-xl font-black">

                          {activity.score}

                        </p>

                      </div>


                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-slate-500">

                          Reward

                        </p>


                        <p className="mt-1 font-black text-orange-400">

                          {activity.xp > 0
                            ? `+${activity.xp} XP`
                            : "—"}

                        </p>

                      </div>


                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-400">

                        {activity.status}

                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>


      {/* ======================================================
          FINAL CTA
          ====================================================== */}

      <section className="bg-[#f7f8fc] px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#080510] via-[#13081e] to-[#080510] p-10 text-white lg:p-14">

            <div className="absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />


            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">

                  Structured Progression

                </p>


                <h2 className="mt-6 max-w-3xl text-5xl font-black tracking-[-0.05em]">

                  Your next skill always has a path.

                </h2>


                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">

                  Learn concepts in order, practice them with
                  real tools and build the skills required for
                  modern AI applications.

                </p>

              </div>


              <button
                onClick={() =>
                  router.push("/learn")
                }
                className="shrink-0 rounded-2xl bg-orange-500 px-8 py-5 font-black text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
              >

                Explore Learning →

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}


/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({
  label,
  value,
  suffix,
  icon,
}: {
  label: string;
  value: number | string;
  suffix: string;
  icon: string;
}) {

  return (

    <div className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">

            {label}

          </p>


          <div className="mt-5 flex items-end gap-2">

            <span className="text-4xl font-black">

              {value}

            </span>


            {suffix && (

              <span className="pb-1 font-semibold text-slate-400">

                {suffix}

              </span>

            )}

          </div>

        </div>


        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">

          {icon}

        </div>

      </div>

    </div>

  );
}


/* ============================================================
   SKILL DESCRIPTIONS
   ============================================================ */

function getSkillDescription(
  skill: string
): string {

  switch (
    skill.toLowerCase()
  ) {

    case "clarity":
      return "Clear and precise instructions";

    case "specificity":
      return "Specific and well-defined requirements";

    case "context":
      return "Relevant background information";

    case "constraints":
      return "Well-defined requirements";

    case "role":
      return "Clear AI role and perspective";

    case "output":
    case "output format":
      return "Structured expected output";

    case "examples":
      return "Useful examples and demonstrations";

    default:
      return "Prompt Engineering skill";

  }

}


/* ============================================================
   ACHIEVEMENT DESCRIPTIONS
   ============================================================ */

function getAchievementDescription(
  title: string
): string {

  switch (title) {

    case "First Prompt":
      return "Created your first prompt.";

    case "Prompt Explorer":
      return "Completed 5 prompt activities.";

    case "Prompt Engineer":
      return "Reached 250 XP.";

    case "Prompt Guru":
      return "Reached 500 XP.";

    case "Consistency Master":
      return "Maintained a 7-day learning streak.";

    default:
      return "Achievement unlocked through your learning progress.";

  }

}