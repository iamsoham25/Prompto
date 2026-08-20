"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/services/api";

/* ============================================================
   DASHBOARD DATA
   ------------------------------------------------------------
   Keep Dashboard data separate from Analytics data.

   Dashboard = current state, progression, recent activity,
   achievements and next actions.

   Analytics = historical trends, comparisons, detailed
   evaluation analysis, charts, etc.
   ============================================================ */

type DashboardData = {
  user: {
    name: string;
    greeting: string;
  };

  overview: {
    totalXP: number;
    currentLevel: number;
    levelName: string;
    rank: number | string;
    streak: number;
    challengesCompleted: number;
    challengeAttempts: number;
    levelProgress: number;
  };

  skills: {
    name: string;
    score: number;
    description: string;
    icon: string;
  }[];

  learning: {
    id: string;
    name: string;
    progress: number;
    status: string;
  }[];

  recentActivity: {
    id : string;
    title: string;
    type: string;
    score: number;
    xp: number | null;
    status: string;
    icon: string;
  }[];

  achievements: {
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
  }[];
};


const initialDashboardData: DashboardData = {
  user: {
    name: "User",
    greeting: "GOOD AFTERNOON",
  },

  overview: {
    totalXP: 0,
    currentLevel: 1,
    levelName: "Beginner",
    rank: "-",
    streak: 0,
    challengesCompleted: 0,
    challengeAttempts: 0,
    levelProgress: 0,
  },

  skills: [
    {
      name: "Clarity",
      score: 0,
      description: "Clear and precise instructions",
      icon: "✦",
    },
    {
      name: "Context",
      score: 0,
      description: "Relevant background information",
      icon: "◉",
    },
    {
      name: "Constraints",
      score: 0,
      description: "Well-defined requirements",
      icon: "◇",
    },
    {
      name: "Output Format",
      score: 0,
      description: "Structured expected output",
      icon: "▣",
    },
  ],

  learning: [],

  recentActivity: [],

  achievements: [],
};


/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

function AnimatedNumber({
  value,
  duration = 900,
}: {
  value: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{displayValue}</>;
}


/* ============================================================
   FLOATING 3D PARTICLES
   ============================================================ */

function Particles() {
  const particles = Array.from({ length: 28 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const left = (index * 37) % 100;
        const top = (index * 61) % 100;
        const delay = (index % 8) * 0.7;

        return (
          <span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-white/50 animate-pulse"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}


/* ============================================================
   3D PROMPT ORB
   ============================================================ */

function PromptOrb({
  level,
}: {
  level: number;
}) {
  return (
    <div className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center sm:h-[350px] sm:w-[350px]">

      {/* Outer glow */}
      <div className="absolute h-[230px] w-[230px] rounded-full bg-fuchsia-600/30 blur-[70px] animate-pulse" />

      {/* Outer rotating ring */}
      <div
        className="absolute h-[280px] w-[280px] rounded-full border border-purple-400/30 animate-[spin_18s_linear_infinite]"
      />

      {/* Second rotating ring */}
      <div
        className="absolute h-[235px] w-[235px] rounded-full border border-pink-400/30 animate-[spin_12s_linear_infinite_reverse]"
      />

      {/* Orbit */}
      <div
        className="absolute h-[205px] w-[205px] rounded-full border border-orange-400/30 animate-[spin_8s_linear_infinite]"
      >
        <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-orange-400 shadow-[0_0_20px_#fb923c]" />
      </div>

      {/* Main sphere */}
      <div className="relative h-[170px] w-[170px] rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700 shadow-[0_0_80px_rgba(217,70,239,0.55)] animate-[float_5s_ease-in-out_infinite]">

        {/* Sphere highlight */}
        <div className="absolute left-8 top-7 h-12 w-12 rounded-full bg-white/35 blur-md" />

        {/* Inner sphere */}
        <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-purple-950/80 via-pink-700/50 to-orange-500/40 backdrop-blur" />

        {/* Prompt symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black text-white drop-shadow-lg">
            P
          </span>
        </div>
      </div>

      {/* Floating labels */}

      <div className="absolute -left-5 top-10 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2 backdrop-blur-xl animate-[float_4s_ease-in-out_infinite]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">
          Skill
        </p>
        <p className="text-sm font-black text-white">
          Prompting
        </p>
      </div>

      <div className="absolute -right-4 bottom-10 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2 backdrop-blur-xl animate-[float_4.5s_ease-in-out_infinite]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">
          Level
        </p>
        <p className="text-sm font-black text-white">
          {String(level).padStart(2, "0")}
        </p>
      </div>

    </div>
  );
}

function getAchievementDescription(title: string) {

  const descriptions: Record<string, string> = {

    "First Prompt":
      "Created your first prompt.",

    "Prompt Explorer":
      "Completed 5 prompt activities.",

    "Prompt Engineer":
      "Reached 250 XP.",

    "Prompt Guru":
      "Reached 500 XP.",

    "Consistency Master":
      "Maintained a 7 day learning streak.",

  };

  return (
    descriptions[title] ||
    "Achievement unlocked."
  );
}
/* ============================================================
   MAIN DASHBOARD
   ============================================================ */

export default function DashboardPage() {

  const [data, setData] = useState<DashboardData>( initialDashboardData );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------------------------
     Current skill score

     Dashboard = current state.
     Analytics = historical trends.

     Therefore the score shown here is calculated from the
     current skill snapshot returned by /current-skills/{email}.
     ------------------------------------------------------------ */

  const validSkills = data.skills.filter(
    (skill) => Number.isFinite(Number(skill.score))
  );

  const currentSkillScore =
    validSkills.length > 0
      ? Math.round(
          validSkills.reduce(
            (sum, skill) => sum + Math.min(100, Math.max(0, Number(skill.score))),
            0
          ) / validSkills.length
        )
      : 0;

  const strongestSkill =
    [...data.skills].sort(
      (a, b) => b.score - a.score
    )[0] || {
      name: "your skills",
      score: 0,
      description: "",
      icon: "✦",
    };

  const weakestSkill =
    [...data.skills].sort(
      (a, b) => a.score - b.score
    )[0] || {
      name: "your skills",
      score: 0,
      description: "",
      icon: "✦",
    };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const email = localStorage.getItem("userEmail");

      if (!email) {
        setError("User session not found. Please log in again.");
        return;
      }

      const encodedEmail = encodeURIComponent(email);

      const [
        summaryResponse,
        xpResponse,
        rankResponse,
        challengeResponse,
        skillsResponse,
        activityResponse,
        streakResponse,
        achievementsResponse,
        learningResponse,
      ] = await Promise.all([
        API.get(`/dashboard-summary/${encodedEmail}`),
        API.get(`/xp/${encodedEmail}`),
        API.get(`/user-rank/${encodedEmail}`),
        API.get(`/challenge-stats/${encodedEmail}`),
        API.get(`/current-skills/${encodedEmail}`),
        API.get(`/recent-activity/${encodedEmail}`),
        API.get(`/streak/${encodedEmail}`),
        API.post(`/achievements/check/${encodedEmail}`),
        API.get(`/learning-dashboard/${encodedEmail}`),
      ]);

      const summary = summaryResponse.data || {};
      const xp = xpResponse.data || {};
      const rank = rankResponse.data || {};
      const challenges = challengeResponse.data || {};
      const skillsResponseData = skillsResponse.data || {};
      const activitiesResponseData = activityResponse.data || {};
      const streak = streakResponse.data || {};
      const achievementsResponseData = achievementsResponse.data || {};
      const learning = learningResponse.data || {};

      if (summary.success === false) {
        throw new Error("Unable to load dashboard summary.");
      }

      const skillDescriptions: Record<string, string> = {
        clarity: "Clear and precise instructions",
        specificity: "Specific and actionable requirements",
        context: "Relevant background information",
        constraints: "Well-defined requirements",
        role: "Clear role and perspective",
        output: "Structured expected output",
        "output format": "Structured expected output",
        examples: "Useful examples and demonstrations",
      };

      const skillIcons: Record<string, string> = {
        clarity: "✦",
        specificity: "◎",
        context: "◉",
        constraints: "◇",
        role: "◆",
        output: "▣",
        "output format": "▣",
        examples: "⌘",
      };

      const apiSkills = Array.isArray(skillsResponseData.skills)
        ? skillsResponseData.skills
        : [];

      const normalizedSkills = apiSkills.map(
        (skill: any, index: number) => {
          const name = String(skill?.name || `Skill ${index + 1}`);
          const key = name.toLowerCase();

          return {
            name,
            score: Math.min(
              100,
              Math.max(0, Number(skill?.score ?? 0))
            ),
            description:
              skillDescriptions[key] ||
              "Current prompt engineering skill score",
            icon:
              skillIcons[key] ||
              ["✦", "◉", "◇", "▣", "◆", "⌘"][index % 6],
          };
        }
      );

      const fallbackSkills = initialDashboardData.skills;

      const finalSkills =
        normalizedSkills.length > 0
          ? normalizedSkills
          : fallbackSkills;

      const safeProgress = (value: any) =>
        Math.min(
          100,
          Math.max(0, Number(value ?? 0))
        );

      const beginnerProgress = safeProgress(
        learning?.beginner?.progress
      );

      const intermediateProgress = safeProgress(
        learning?.intermediate?.progress
      );

      const advancedProgress = safeProgress(
        learning?.advanced?.progress
      );

      const agentsProgress = safeProgress(
        learning?.agents?.progress ??
        learning?.ai_agents?.progress ??
        0
      );

      const normalizedActivities = Array.isArray(
        activitiesResponseData.activities
      )
        ? activitiesResponseData.activities.map(
            (activity: any, index: number) => ({
              id:
                String(
                  activity?.id ??
                  activity?._id ??
                  `${activity?.created_at ?? "activity"}-${index}`
                ),

              title:
                String(
                  activity?.title ??
                  activity?.name ??
                  "Prompt Activity"
                ),

              type:
                String(
                  activity?.type ??
                  "Activity"
                ),

              score:
                Number.isFinite(
                  Number(activity?.score)
                )
                  ? Number(activity.score)
                  : 0,

              xp:
                activity?.xp !== undefined &&
                activity?.xp !== null
                  ? Number(activity.xp)
                  : null,

              status:
                String(
                  activity?.status ??
                  "Completed"
                ),

              icon:
                String(
                  activity?.icon ??
                  String(index + 1).padStart(2, "0")
                ),
            })
          )
        : [];

      const normalizedAchievements = Array.isArray(
        achievementsResponseData.achievements
      )
        ? achievementsResponseData.achievements.map(
            (achievement: any) => ({
              title: String(
                achievement?.title ??
                "Achievement"
              ),

              description:
                getAchievementDescription(
                  String(
                    achievement?.title ??
                    "Achievement"
                  )
                ),

              icon:
                String(
                  achievement?.icon ??
                  "🏆"
                ),

              unlocked:
                achievement?.unlocked !== false,
            })
          )
        : [];

      const streakValue = Number(
        streak?.current_streak ??
        streak?.streak ??
        0
      );

      setData({
        user: {
          name:
            summary.username ||
            localStorage.getItem("userName") ||
            email.split("@")[0] ||
            "User",

          greeting:
            new Date().getHours() < 12
              ? "GOOD MORNING"
              : new Date().getHours() < 18
                ? "GOOD AFTERNOON"
                : "GOOD EVENING",
        },

        overview: {
          totalXP: Number(
            summary.xp ??
            xp.xp ??
            0
          ),

          currentLevel: Number(
            summary.level ??
            xp.level ??
            1
          ),

          levelName:
            summary.rank ??
            xp.rank ??
            "Beginner",

          rank:
            rank.rank ??
            "-",

          streak:
            Number.isFinite(streakValue)
              ? streakValue
              : 0,

          challengesCompleted:
            Number(
              challenges.completed ??
              summary.completed_challenges ??
              0
            ),

          challengeAttempts:
            Number(
              challenges.attempts ??
              0
            ),

          levelProgress: safeProgress(
            summary.xp_progress ??
            xp.progress ??
            0
          ),
        },

        skills: finalSkills,

        learning: [
          {
            id: "beginner",
            name: "Prompt Fundamentals",
            status:
              beginnerProgress >= 100
                ? "Completed"
                : beginnerProgress > 0
                  ? "In Progress"
                  : "Locked",
            progress: beginnerProgress,
          },

          {
            id: "intermediate",
            name: "Prompt Structure",
            status:
              intermediateProgress >= 100
                ? "Completed"
                : intermediateProgress > 0
                  ? "In Progress"
                  : "Locked",
            progress: intermediateProgress,
          },

          {
            id: "advanced",
            name: "Advanced Prompting",
            status:
              advancedProgress >= 100
                ? "Completed"
                : advancedProgress > 0
                  ? "In Progress"
                  : "Locked",
            progress: advancedProgress,
          },

          {
            id: "agents",
            name: "AI Agents",
            status:
              agentsProgress > 0
                ? agentsProgress >= 100
                  ? "Completed"
                  : "In Progress"
                : advancedProgress >= 100
                  ? "In Progress"
                  : "Locked",
            progress: agentsProgress,
          },
        ],

        recentActivity:
          normalizedActivities,

        achievements:
          normalizedAchievements,
      });

    } catch (err) {
      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        "Unable to load dashboard data. Check that the backend is running and try again."
      );

    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-10 py-8 text-center shadow-xl">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
          <p className="mt-5 text-lg font-black">
            Loading your dashboard...
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Fetching your current progress and achievements.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-6">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl">
          <div className="text-4xl">⚠️</div>

          <h1 className="mt-4 text-2xl font-black">
            Dashboard could not load
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-6 rounded-xl bg-[#ff6b00] px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-[#071126]">

      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="relative overflow-hidden bg-[#070713]">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <Particles />

        {/* Background glows */}

        <div className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-purple-700/30 blur-[150px]" />

        <div className="absolute right-[-120px] top-[-100px] h-[600px] w-[600px] rounded-full bg-pink-600/20 blur-[150px]" />

        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[150px]" />


        <div className="relative mx-auto max-w-[1500px] px-6 py-16 lg:px-12 lg:py-20">

          {/* Workspace label */}

          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 backdrop-blur-xl">

            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)] animate-pulse" />

            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
              Personal AI Workspace
            </span>

          </div>


          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">

            {/* ==================================================
                HERO LEFT
                ================================================== */}

            <div>

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-purple-300">
                Prompt Engineering Dashboard
              </p>

              <h1 className="max-w-[900px] text-6xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-[94px]">

                {data.user.greeting},
                <br />

                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {data.user.name}.
                </span>

              </h1>


              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Keep building better prompts, complete challenges,
                strengthen your weak skills and move toward Prompt
                Engineering mastery.
              </p>


              {/* Quick stats */}

              <div className="mt-9 flex flex-wrap gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.09]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    XP
                  </p>
                  <p className="mt-1 text-2xl font-black text-white">
                    <AnimatedNumber value={data.overview.totalXP} />
                  </p>
                </div>


                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.09]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Rank
                  </p>
                  <p className="mt-1 text-2xl font-black text-white">
                    #{data.overview.rank}
                  </p>
                </div>


                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.09]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Streak
                  </p>
                  <p className="mt-1 text-2xl font-black text-white">
                    {data.overview.streak} days 🔥
                  </p>
                </div>

              </div>


              {/* CTA */}

              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  href="/playground"
                  className="group rounded-xl bg-[#ff6b00] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_40px_rgba(255,107,0,0.25)] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#ff7a1a]"
                >
                  Continue Practicing
                  <span className="ml-2 transition group-hover:translate-x-1 inline-block">
                    →
                  </span>
                </Link>


                <Link
                  href="/learn"
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  Continue Learning
                </Link>

              </div>

            </div>


            {/* ==================================================
                HERO RIGHT / 3D AREA
                ================================================== */}

            <div className="relative">

              <PromptOrb
                level={data.overview.currentLevel}
              />

              {/* Mastery card */}

              <div className="relative mx-auto -mt-8 max-w-[430px] rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Prompt Mastery
                    </p>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Current Level
                    </p>

                    <h2 className="mt-1 text-3xl font-black text-white">
                      {data.overview.levelName}
                    </h2>
                  </div>


                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff6b00] text-xl shadow-[0_0_30px_rgba(255,107,0,0.25)]">
                    ✦
                  </div>

                </div>


                {/* Average */}

                <div className="mt-7">

                  <p className="text-xs font-semibold text-slate-400">
                    Current Skill Score
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <span className="text-4xl font-black text-white">
                      {currentSkillScore}
                    </span>

                    <span className="pb-1 text-sm text-slate-500">
                      /100
                    </span>

                  </div>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Based on your current skill snapshot
                  </p>

                </div>


                {/* Level progress */}

                <div className="mt-7">

                  <div className="mb-2 flex justify-between text-xs font-semibold">

                    <span className="text-slate-400">
                      Progress to next level
                    </span>

                    <span className="text-white">
                      {data.overview.levelProgress}%
                    </span>

                  </div>


                  <div className="h-3 overflow-hidden rounded-full bg-white/10">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-[0_0_18px_rgba(217,70,239,0.5)] transition-all duration-1000"
                      style={{
                        width: `${Math.min(100, Math.max(0, data.overview.levelProgress))}%`,
                      }}
                    />

                  </div>

                </div>


                {/* Challenges */}

                <div className="mt-7 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">

                    <p className="text-xs text-slate-500">
                      Challenges
                    </p>

                    <p className="mt-1 text-2xl font-black text-white">
                      {data.overview.challengesCompleted}
                    </p>

                  </div>


                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">

                    <p className="text-xs text-slate-500">
                      Attempts
                    </p>

                    <p className="mt-1 text-2xl font-black text-white">
                      {data.overview.challengeAttempts}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          QUICK STATS
          ====================================================== */}

      <section className="relative bg-[#f7f8fc] px-6 py-14 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {[
              {
                label: "TOTAL XP",
                value: data.overview.totalXP,
                suffix: "XP",
                icon: "⚡",
              },
              {
                label: "STREAK",
                value: data.overview.streak,
                suffix: "days",
                icon: "🔥",
              },
              {
                label: "CHALLENGES",
                value: data.overview.challengesCompleted,
                suffix: "",
                icon: "🏆",
              },
              {
                label: "ATTEMPTS",
                value: data.overview.challengeAttempts,
                suffix: "",
                icon: "🎯",
              },
              {
                label: "LEVEL",
                value: data.overview.currentLevel,
                suffix: "",
                icon: "🚀",
              },
            ].map((stat) => (

              <div
                key={stat.label}
                className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.09)]"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      {stat.label}
                    </p>

                    <div className="mt-4 flex items-end gap-2">

                      <span className="text-4xl font-black tracking-tight">
                        <AnimatedNumber value={stat.value} />
                      </span>

                      {stat.suffix && (
                        <span className="pb-1 text-sm font-bold text-slate-400">
                          {stat.suffix}
                        </span>
                      )}

                    </div>

                  </div>


                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff3e9] text-xl transition duration-300 group-hover:rotate-12">
                    {stat.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          PROGRESS + LEVEL
          ====================================================== */}

      <section className="relative overflow-hidden bg-[#f7f8fc] px-6 pb-20 lg:px-12">

        <div className="absolute right-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px]" />

        <div className="relative mx-auto max-w-[1500px]">

          <div className="mb-9">

            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff6b00]">
              Your Progress
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">

              Build better prompts.
              <br />

              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Build better skills.
              </span>

            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Your Dashboard shows your current skill state.
              Detailed trends and historical analysis are available
              separately in Analytics.
            </p>

          </div>


          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

            {/* Skills */}

            <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    Current Snapshot
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    Prompt Engineering Skills
                  </h3>

                </div>

                <Link
                  href="/analytics"
                  className="hidden text-sm font-bold text-[#ff6b00] transition hover:translate-x-1 sm:block"
                >
                  View Analytics →
                </Link>

              </div>


              <div className="mt-8 space-y-7">

                {data.skills.map((skill) => (

                  <div key={skill.name} className="group">

                    <div className="flex items-end justify-between">

                      <div className="flex items-start gap-3">

                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-sm font-bold text-purple-600 transition group-hover:scale-110">
                          {skill.icon}
                        </div>

                        <div>

                          <p className="font-bold text-[#071126]">
                            {skill.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            {skill.description}
                          </p>

                        </div>

                      </div>


                      <span className="text-lg font-black">
                        {skill.score}
                      </span>

                    </div>


                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-1000 group-hover:brightness-110"
                        style={{
                          width: `${Math.min(100, Math.max(0, skill.score))}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* Level */}

            <div className="relative overflow-hidden rounded-[30px] bg-[#070713] p-7 text-white">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-700/30 blur-[70px]" />

              <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-pink-600/20 blur-[70px]" />

              <div className="relative">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-400">
                  Current Level
                </p>

                <h3 className="mt-5 text-4xl font-black">
                  {data.overview.levelName}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Build a strong foundation in roles, context,
                  constraints and structured output.
                </p>


                <div className="mt-8">

                  <div className="flex justify-between text-xs font-bold">

                    <span className="text-slate-400">
                      Level Progress
                    </span>

                    <span>
                      {data.overview.levelProgress}%
                    </span>

                  </div>


                  <div className="mt-3 h-3 rounded-full bg-white/10">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, data.overview.levelProgress))}%`,
                      }}
                    />

                  </div>

                </div>


                <Link
                  href="/learn"
                  className="mt-8 inline-flex rounded-xl bg-[#ff6b00] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-orange-500"
                >
                  Continue Learning →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          AI RECOMMENDATION
          ====================================================== */}

      <section className="bg-[#f7f8fc] px-6 pb-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="relative overflow-hidden rounded-[32px] border border-purple-200 bg-gradient-to-br from-white via-purple-50/50 to-pink-50 p-8 shadow-[0_15px_50px_rgba(124,58,237,0.08)] sm:p-10">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-300/30 blur-[80px]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#070713] text-xl text-white">
                    ✦
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-600">
                    AI Recommendation
                  </p>

                </div>


                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  Your next improvement is{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    {weakestSkill.name}.
                  </span>
                </h2>


                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">

                  Your current score is{" "}
                  <strong>{weakestSkill.score}/100</strong>.
                  Your weakest current area is{" "}
                  <strong>{weakestSkill.name}</strong>. Practice this skill
                  in the Playground and re-evaluate your prompts to track
                  improvement.

                </p>

              </div>


              <Link
                href="/playground"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#070713] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-black"
              >
                Practice {weakestSkill.name} →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ACHIEVEMENTS
          ====================================================== */}

      <section className="bg-white px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="mb-9">

            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff6b00]">
              Achievements
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Progress worth celebrating.
            </h2>

          </div>


          {data.achievements.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-[#f8f9fc] p-8 text-slate-500">
              <p className="font-bold">
                No achievements unlocked yet.
              </p>
              <p className="mt-2 text-sm">
                Complete prompts, earn XP and maintain your learning streak
                to unlock achievements.
              </p>
            </div>
          ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {data.achievements.map((achievement) => (

              <div
                key={achievement.title}
                className="group rounded-[24px] border border-slate-200 bg-[#f8f9fc] p-6 transition duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-[0_20px_40px_rgba(124,58,237,0.08)]"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {achievement.icon}
                </div>

                <h3 className="mt-5 font-black">
                  {achievement.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {achievement.description}
                </p>

                <div className="mt-5 text-xs font-bold text-emerald-500">
                  ✓ Unlocked
                </div>

              </div>

            ))}

          </div>
          )}

        </div>

      </section>


      {/* ======================================================
          LEARNING PATH
          ====================================================== */}

      <section className="bg-[#f7f8fc] px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="mb-9">

            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-500">
              Learning Path
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Your next skill always has a path.
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Learn concepts in order, practice them with real tools,
              and gradually move toward advanced Prompt Engineering.
            </p>

          </div>


          <div className="grid gap-4">

            {data.learning.map((item, index) => (

              <div
                key={item.name}
                className="group flex flex-col gap-5 rounded-[24px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center"
              >

                {/* Number */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#070713] text-sm font-black text-white">
                  {(index + 1).toString().padStart(2, "0")}
                </div>


                {/* Name */}

                <div className="min-w-[200px] sm:w-[260px]">

                  <h3 className="font-black">
                    {item.name}
                  </h3>

                  <p
                    className={`mt-1 text-xs font-bold ${
                      item.status === "Completed"
                        ? "text-emerald-500"
                        : item.status === "Locked"
                        ? "text-slate-400"
                        : "text-orange-500"
                    }`}
                  >
                    {item.status}
                  </p>

                </div>


                {/* Progress */}

                <div className="flex-1">

                  <div className="mb-2 flex justify-between text-xs font-bold">

                    <span className="text-slate-400">
                      Progress
                    </span>

                    <span>
                      {item.progress}%
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.status === "Locked"
                          ? "bg-slate-300"
                          : "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(0, item.progress))}%`,
                      }}
                    />

                  </div>

                </div>


                <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500">
                  →
                </span>

              </div>

            ))}

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

            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">

              Keep practicing.
              <br />

              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Keep improving.
              </span>

            </h2>

          </div>


          {data.recentActivity.length === 0 ? (
            <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-8 text-slate-400">
              <p className="font-bold text-white">
                No recent activity yet.
              </p>
              <p className="mt-2 text-sm">
                Complete an evaluation, lesson or challenge to see your
                latest activity here.
              </p>
            </div>
          ) : (
          <div className="grid gap-4">

            {data.recentActivity.map((activity) => (

              <div
                key={activity.id}
                className="group flex flex-col gap-5 rounded-[22px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 text-sm font-black">
                    {activity.icon}
                  </div>

                  <div>

                    <p className="font-bold">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {activity.type}
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
                      {activity.xp !== null
                        ? `+${activity.xp} XP`
                        : "—"}
                    </p>

                  </div>


                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-400">
                    {activity.status}
                  </span>

                </div>

              </div>

            ))}

          </div>
          )}

        </div>

      </section>


      {/* ======================================================
          FINAL CTA
          ====================================================== */}

      <section className="bg-[#f7f8fc] px-6 py-16 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="relative overflow-hidden rounded-[32px] bg-[#070713] p-8 sm:p-12 lg:p-14">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(255,107,0,0.16),transparent_30%)]" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                  Structured Progression
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                  Your next skill always has a path.
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                  Learn concepts in order, practice them with real tools
                  and build the skills required for modern AI applications.
                </p>

              </div>


              <Link
                href="/learn"
                className="shrink-0 rounded-xl bg-[#ff6b00] px-7 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,107,0,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-orange-500"
              >
                Explore Learning →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ANIMATION KEYFRAMES
          ====================================================== */}

      <style jsx global>{`

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

      `}</style>

    </main>
  );
}