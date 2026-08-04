"use client";

import API from "@/services/api";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  motion
} from "framer-motion";


export default function DashboardPage() {

  const router = useRouter();


  // ========================================================
  // Dashboard State
  // ========================================================

  const [loading, setLoading] =
    useState(true);

  const [greeting, setGreeting] =
    useState("");

  const [recentChats, setRecentChats] =
    useState<any[]>([]);

  const [rank, setRank] =
    useState<number | string>("-");

  const [dailyChallenge, setDailyChallenge] =
    useState<any>(null);

  const [xpData, setXpData] =
    useState<any>(null);

  const [streakData, setStreakData] =
    useState<any>(null);

  const [achievements, setAchievements] =
    useState<any[]>([]);

  const [coach, setCoach] =
    useState<any>(null);

  const [promptMastery, setPromptMastery] =
    useState<any>(null);

  const [
    completedChallenges,
    setCompletedChallenges
  ] = useState(0);

  const [
    challengeAttempts,
    setChallengeAttempts
  ] = useState(0);


  // ========================================================
  // User Stats
  // ========================================================

  const [stats, setStats] = useState({

    username: "",

    email: "",

    total_chats: 0,

    completed_lessons: 0,

    skill_level: "Beginner"

  });


  // ========================================================
  // Learning Progress
  // ========================================================

  const [
    lessonProgress,
    setLessonProgress
  ] = useState({

    total_lessons: 0,

    completed_lessons: 0,

    progress: 0,

    beginner_completed: 0,

    intermediate_completed: 0,

    intermediate_unlocked: false,

    advanced_unlocked: false

  });


  // ========================================================
  // Achievement Icons
  // ========================================================

  const achievementIcons:
    Record<string, string> = {

      "Beginner Explorer": "🧭",

      "First Lesson": "📚",

      "Learning Streak": "🔥",

      "AI Explorer": "🤖",

      "Prompt Engineer": "🚀",

      "Prompt Master": "👑",

      "Challenge Champion": "🏆",

      "XP Hunter": "⚡"

    };


  // ========================================================
  // Lesson Recommendation Map
  // ========================================================

  const lessonMap:
    Record<string, string> = {

      Clarity:
        "Prompt Clarity Masterclass",

      Context:
        "Context Engineering",

      Constraints:
        "Constraint Engineering",

      Specificity:
        "Specific Prompting",

      Role:
        "Role Prompting",

      Output:
        "Output Format Engineering",

      Examples:
        "Few-Shot Prompting"

    };


  // ========================================================
  // Greeting
  // ========================================================

  const getGreeting = () => {

    const hour =
      new Date().getHours();

    if (hour < 12) {

      return "Good Morning ☀️";

    }

    if (hour < 18) {

      return "Good Afternoon 🌤️";

    }

    return "Good Evening 🌙";

  };


  // ========================================================
  // Fetch Dashboard Stats
  // ========================================================

  const fetchDashboardStats =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/dashboard-stats/${email}`
          );

        if (res.data.success) {

          setStats(
            res.data
          );

        }

      } catch (error) {

        console.error(
          "Dashboard Stats Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch XP
  // ========================================================

  const fetchXP =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/xp/${email}`
          );

        if (res.data.success) {

          setXpData(
            res.data
          );

        }

      } catch (error) {

        console.error(
          "XP Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Rank
  // ========================================================

  const fetchUserRank =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/user-rank/${email}`
          );

        if (res.data.success) {

          setRank(
            res.data.rank
          );

        }

      } catch (error) {

        console.error(
          "Rank Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Challenge Stats
  // ========================================================

  const fetchChallengeStats =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/challenge-stats/${email}`
          );

        if (res.data.success) {

          setCompletedChallenges(
            res.data.completed || 0
          );

          setChallengeAttempts(
            res.data.attempts || 0
          );

        }

      } catch (error) {

        console.error(
          "Challenge Stats Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Lesson Progress
  // ========================================================

  const fetchLessonProgress =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/lesson-progress/${email}`
          );

        if (res.data.success) {

          setLessonProgress(
            res.data
          );

        }

      } catch (error) {

        console.error(
          "Lesson Progress Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Recent Chats
  // ========================================================

  const fetchRecentChats =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/recent-chats/${email}`
          );

        if (res.data.success) {

          setRecentChats(
            res.data.chats || []
          );

        }

      } catch (error) {

        console.error(
          "Recent Chats Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Daily Challenge
  // ========================================================

  const fetchDailyChallenge =
    async () => {

      try {

        const res =
          await API.get(
            "/daily-challenge"
          );

        if (res.data.success) {

          setDailyChallenge(
            res.data.challenge
          );

        }

      } catch (error) {

        console.error(
          "Daily Challenge Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Prompt Mastery
  // ========================================================

  const fetchPromptMastery =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/prompt-mastery/${email}`
          );

        if (res.data.success) {

          setPromptMastery(
            res.data
          );

        }

      } catch (error) {

        console.error(
          "Prompt Mastery Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Streak
  // ========================================================

  const fetchStreak =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/streak/${email}`
          );

        if (res.data.success !== false) {

          setStreakData(
            res.data
          );

        }

      } catch (error) {

        console.error(
          "Streak Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch Achievements
  // ========================================================

  const fetchAchievements =
    async (
      email: string
    ) => {

      try {

        await API.post(
          `/achievements/check/${email}`
        );

        const res =
          await API.get(
            `/achievements/${email}`
          );

        if (res.data.success) {

          setAchievements(
            res.data.badges || []
          );

        }

      } catch (error) {

        console.error(
          "Achievement Error:",
          error
        );

      }

    };


  // ========================================================
  // Fetch AI Coach
  // ========================================================

  const fetchCoach =
    async (
      email: string
    ) => {

      try {

        const res =
          await API.get(
            `/coach/${email}`
          );

        setCoach(
          res.data
        );

      } catch (error) {

        console.error(
          "Coach Error:",
          error
        );

      }

    };


  // ========================================================
  // Dashboard Initialization
  // ========================================================

  useEffect(() => {

    const loadDashboard =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          );

        const email =
          localStorage.getItem(
            "userEmail"
          );

        if (!token || !email) {

          router.push(
            "/login"
          );

          return;

        }

        setGreeting(
          getGreeting()
        );

        try {

          await Promise.all([

            fetchDashboardStats(
              email
            ),

            fetchXP(
              email
            ),

            fetchUserRank(
              email
            ),

            fetchChallengeStats(
              email
            ),

            fetchLessonProgress(
              email
            ),

            fetchRecentChats(
              email
            ),

            fetchDailyChallenge(),

            fetchPromptMastery(
              email
            ),

            fetchStreak(
              email
            ),

            fetchAchievements(
              email
            ),

            fetchCoach(
              email
            )

          ]);

        } catch (error) {

          console.error(
            "Dashboard Loading Error:",
            error
          );

        } finally {

          setLoading(
            false
          );

        }

      };

    loadDashboard();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [router]);


  // ========================================================
  // Loading Screen
  // ========================================================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-slate-950
          flex
          items-center
          justify-center
          text-white
          px-4
        "
      >

        <div className="text-center">

          <div
            className="
              text-4xl
              mb-4
              animate-pulse
            "
          >
            🧠
          </div>

          <p
            className="
              text-xl
              sm:text-2xl
              font-bold
            "
          >
            Loading Dashboard...
          </p>

        </div>

      </div>

    );

  }


  // ========================================================
  // Derived Real Data
  // ========================================================

  const xp =
    xpData?.xp ?? 0;

  const xpLevel =
    xpData?.level ?? 1;

  const xpRank =
    xpData?.rank ?? "Beginner";

  const xpProgress =
    Math.min(
      Math.max(
        xpData?.progress ?? 0,
        0
      ),
      100
    );

  const promptLevel =
    promptMastery?.mastery_level
    ?? "Beginner";

  const promptAverage =
    promptMastery?.average_score
    ?? 0;

  const username =
    stats.username
    || localStorage.getItem(
      "userName"
    )
    || "Learner";


  // ========================================================
  // UI
  // ========================================================

  return (

    <main
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          max-w-[1600px]
          mx-auto
        "
      >


        {/* ==================================================
            HERO
        ================================================== */}

        <section
          className="
            bg-gradient-to-r
            from-blue-600
            via-purple-600
            to-pink-500
            rounded-2xl
            sm:rounded-3xl
            p-5
            sm:p-7
            lg:p-8
            text-white
            shadow-xl
          "
        >

          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-center
              justify-between
              gap-8
            "
          >

            <div
              className="
                flex-1
                min-w-0
              "
            >

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-bold
                  break-words
                "
              >
                {greeting},{" "}
                {username} 👋
              </h1>

              <p
                className="
                  mt-3
                  text-base
                  sm:text-lg
                  lg:text-xl
                  text-white/90
                "
              >
                Keep learning and level up your
                Prompt Engineering skills.
              </p>


              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                "
              >

                <span
                  className="
                    bg-white/20
                    backdrop-blur-md
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    sm:text-base
                  "
                >
                  🎯 XP: {xp}
                </span>

                <span
                  className="
                    bg-white/20
                    backdrop-blur-md
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    sm:text-base
                  "
                >
                  🏆 Rank #{rank}
                </span>

                <span
                  className="
                    bg-white/20
                    backdrop-blur-md
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    sm:text-base
                  "
                >
                  🚀 {xpRank}
                </span>

              </div>

            </div>


            {/* Prompt Mastery */}

            <div
              className="
                w-full
                xl:w-[340px]
                bg-emerald-600
                rounded-2xl
                sm:rounded-3xl
                p-6
                shadow-xl
              "
            >

              <p
                className="
                  text-sm
                  text-center
                  text-white/80
                "
              >
                Prompt Mastery
              </p>

              <h3
                className="
                  mt-3
                  text-3xl
                  sm:text-4xl
                  font-extrabold
                  text-center
                  break-words
                "
              >
                {promptLevel}
              </h3>

              <p
                className="
                  mt-3
                  text-center
                  text-sm
                  text-white/90
                "
              >
                Average Prompt Score:
                {" "}
                {Number(
                  promptAverage
                ).toFixed(1)}
              </p>

            </div>

          </div>

        </section>


        {/* ==================================================
            KPI CARDS
        ================================================== */}

        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
            sm:gap-6
            mt-8
          "
        >

          <DashboardCard
            title="Total XP"
            value={`${xp} XP`}
            icon="⚡"
          />

          <DashboardCard
            title="Challenges Completed"
            value={
              completedChallenges.toString()
            }
            icon="🏆"
          />

          <DashboardCard
            title="Challenge Attempts"
            value={
              challengeAttempts.toString()
            }
            icon="🎯"
          />

          <DashboardCard
            title="Platform Level"
            value={xpRank}
            icon="🚀"
          />

        </section>


        {/* ==================================================
            PROMPT ENGINEER PROFILE
        ================================================== */}

        <section
          className="
            mt-8
            bg-gradient-to-r
            from-indigo-600
            via-purple-600
            to-pink-600
            rounded-2xl
            sm:rounded-3xl
            p-5
            sm:p-8
            shadow-xl
            text-white
          "
        >

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
            "
          >
            🏆 Prompt Engineer Profile
          </h2>


          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-6
              mt-7
            "
          >

            <ProfileStat
              label="Current XP"
              value={xp}
            />

            <ProfileStat
              label="Level"
              value={xpLevel}
            />

            <ProfileStat
              label="Rank"
              value={xpRank}
            />

          </div>


          <div
            className="
              mt-8
              max-w-3xl
            "
          >

            <div
              className="
                flex
                justify-between
                gap-4
                mb-2
                text-sm
                sm:text-base
              "
            >

              <span>
                Progress To Next Level
              </span>

              <span>
                {Math.round(
                  xpProgress
                )}%
              </span>

            </div>


            <div
              className="
                w-full
                h-4
                sm:h-5
                bg-white/20
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-yellow-400
                  rounded-full
                  transition-all
                  duration-1000
                "
                style={{
                  width:
                    `${xpProgress}%`
                }}
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            STREAK
        ================================================== */}

        {streakData && (

          <section
            className="
              mt-8
              bg-gradient-to-r
              from-orange-500
              to-red-500
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-8
              shadow-xl
              text-white
            "
          >

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
              "
            >
              🔥 Learning Streak
            </h2>


            <div
              className="
                grid
                grid-cols-2
                gap-5
                sm:gap-8
                mt-7
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-white/80
                  "
                >
                  Current Streak
                </p>

                <h3
                  className="
                    text-4xl
                    sm:text-6xl
                    font-bold
                    mt-1
                  "
                >
                  {
                    streakData.current_streak
                    ?? 0
                  }
                </h3>

                <p>
                  Days
                </p>

              </div>


              <div>

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-white/80
                  "
                >
                  Best Streak
                </p>

                <h3
                  className="
                    text-4xl
                    sm:text-6xl
                    font-bold
                    mt-1
                  "
                >
                  {
                    streakData.best_streak
                    ?? 0
                  }
                </h3>

                <p>
                  Days
                </p>

              </div>

            </div>


            <p
              className="
                mt-6
                text-sm
                sm:text-lg
                text-white/90
              "
            >
              ⭐ Keep learning daily to build
              your streak!
            </p>

          </section>

        )}


        {/* ==================================================
            ACHIEVEMENTS
        ================================================== */}

        {achievements.length > 0 && (

          <motion.section

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.5
            }}

            className="
              mt-8
              bg-white
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-8
              shadow-md
              border
              border-slate-200
            "
          >

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-slate-800
              "
            >
              🏆 Achievements
            </h2>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-4
                sm:gap-6
                mt-7
              "
            >

              {achievements.map(
                (
                  achievement,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      bg-gradient-to-r
                      from-yellow-400
                      to-orange-500
                      text-white
                      rounded-2xl
                      p-5
                      shadow-md
                      transition-transform
                      hover:-translate-y-1
                    "
                  >

                    <div
                      className="
                        text-5xl
                        text-center
                      "
                    >
                      {
                        achievementIcons[
                          achievement
                        ] || "🏆"
                      }
                    </div>

                    <h3
                      className="
                        text-lg
                        font-bold
                        mt-4
                        text-center
                      "
                    >
                      {achievement}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-center
                        text-sm
                        text-white/85
                      "
                    >
                      Achievement Unlocked
                    </p>

                  </div>

                )
              )}

            </div>

          </motion.section>

        )}


        {/* ==================================================
            AI COACH
        ================================================== */}

        {coach && (

          <section
            className="
              mt-8
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-8
              shadow-xl
            "
          >

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
              "
            >
              🤖 AI Coach
            </h2>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                mt-7
              "
            >

              <CoachItem
                title="💪 Strongest Skill"
                value={
                  coach.strength
                  || "Not enough data"
                }
              />


              <CoachItem
                title="🎯 Weakest Skill"
                value={
                  coach.weakness
                  || "Not enough data"
                }
              />


              <CoachItem
                title="📚 Recommended Lesson"
                value={
                  lessonMap[
                    coach.weakness
                  ]
                  ||
                  "Prompt Fundamentals"
                }
              />


              <CoachItem
                title="🚀 Recommendation"
                value={
                  coach.recommendation
                  ||
                  "Keep practicing prompt engineering."
                }
              />

            </div>

          </section>

        )}


        {/* ==================================================
            LEARNING + DAILY CHALLENGE
        ================================================== */}

        <section
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mt-8
          "
        >


          {/* Learning Progress */}

          <div
            className="
              bg-white
              border
              border-slate-200
              shadow-md
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-8
            "
          >

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              📚 Learning Progress
            </h2>


            <div className="mt-7">

              <div
                className="
                  flex
                  justify-between
                  gap-4
                  mb-2
                  text-sm
                  sm:text-base
                "
              >

                <span>
                  Completed Lessons
                </span>

                <span
                  className="
                    font-semibold
                  "
                >
                  {
                    lessonProgress.completed_lessons
                  }
                  /
                  {
                    lessonProgress.total_lessons
                  }
                </span>

              </div>


              <div
                className="
                  w-full
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    bg-orange-500
                    rounded-full
                  "
                  style={{
                    width:
                      `${Math.min(
                        lessonProgress.progress,
                        100
                      )}%`
                  }}
                />

              </div>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
                mt-7
              "
            >

              <div
                className="
                  bg-blue-50
                  p-4
                  rounded-xl
                "
              >

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Beginner Completed
                </p>

                <p
                  className="
                    text-2xl
                    font-bold
                    mt-1
                  "
                >
                  {
                    lessonProgress.beginner_completed
                  }
                </p>

              </div>


              <div
                className="
                  bg-green-50
                  p-4
                  rounded-xl
                "
              >

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Intermediate Completed
                </p>

                <p
                  className="
                    text-2xl
                    font-bold
                    mt-1
                  "
                >
                  {
                    lessonProgress.intermediate_completed
                  }
                </p>

              </div>

            </div>

          </div>


          {/* Daily Challenge */}

          <div
            className="
              bg-white
              border
              border-slate-200
              shadow-md
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-8
            "
          >

            <div
              className="
                flex
                justify-between
                gap-4
                items-start
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-orange-500
                  "
                >
                  🎯 DAILY CHALLENGE
                </p>

                <h2
                  className="
                    text-2xl
                    font-bold
                    mt-2
                  "
                >
                  {
                    dailyChallenge?.title
                    ||
                    "No Challenge Available"
                  }
                </h2>

              </div>


              {dailyChallenge?.xp !== undefined && (

                <span
                  className="
                    bg-yellow-100
                    text-yellow-700
                    px-3
                    py-1.5
                    rounded-lg
                    text-sm
                    font-bold
                    whitespace-nowrap
                  "
                >
                  +{dailyChallenge.xp} XP
                </span>

              )}

            </div>


            <p
              className="
                text-slate-500
                mt-5
                leading-relaxed
              "
            >
              {
                dailyChallenge?.description
                ||
                "Complete challenges to improve your prompt engineering skills."
              }
            </p>


            {dailyChallenge?.difficulty && (

              <div className="mt-5">

                <span
                  className="
                    inline-block
                    bg-orange-100
                    text-orange-700
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                    font-semibold
                  "
                >
                  {
                    dailyChallenge.difficulty
                  }
                </span>

              </div>

            )}


            <button
              type="button"

              disabled={
                !dailyChallenge
              }

              onClick={() => {

                if (
                  dailyChallenge?.id
                  !== undefined
                  &&
                  dailyChallenge?.id
                  !== null
                ) {

                  router.push(
                    `/challenges/${dailyChallenge.id}`
                  );

                } else {

                  router.push(
                    "/challenges"
                  );

                }

              }}

              className="
                mt-7
                w-full
                sm:w-auto
                px-7
                py-3.5
                rounded-xl
                bg-orange-500
                hover:bg-orange-600
                disabled:bg-slate-300
                disabled:cursor-not-allowed
                text-white
                font-semibold
                shadow-md
                transition
              "
            >
              Start Challenge
            </button>

          </div>

        </section>


        {/* ==================================================
            RECENT ACTIVITY
        ================================================== */}

        <section
          className="
            mt-8
            mb-8
          "
        >

          <div
            className="
              bg-white
              border
              border-slate-200
              shadow-md
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-8
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
                gap-4
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                🕒 Recent Activity
              </h2>

              <span
                className="
                  text-sm
                  text-slate-400
                "
              >
                Latest prompts
              </span>

            </div>


            <div
              className="
                space-y-3
                mt-6
              "
            >

              {recentChats.length > 0 ? (

                recentChats
                  .slice(
                    0,
                    5
                  )
                  .map(
                    (
                      chat,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                          bg-slate-50
                          p-4
                          rounded-xl
                          border
                          border-slate-100
                        "
                      >

                        <p
                          className="
                            text-slate-700
                            break-words
                          "
                        >
                          {
                            chat.prompt
                          }
                        </p>

                      </div>

                    )
                  )

              ) : (

                <div
                  className="
                    bg-slate-50
                    rounded-xl
                    p-6
                    text-center
                  "
                >

                  <p
                    className="
                      text-slate-500
                    "
                  >
                    No recent activity found.
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>


      </div>

    </main>

  );

}


// ==========================================================
// Dashboard Card
// ==========================================================

function DashboardCard({

  title,

  value,

  icon

}: {

  title: string;

  value: string;

  icon: string;

}) {

  return (

    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        sm:p-6
        shadow-sm
        min-w-0
      "
    >

      <div
        className="
          flex
          justify-between
          items-start
          gap-4
        "
      >

        <div
          className="
            min-w-0
          "
        >

          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <p
            className="
              text-2xl
              sm:text-3xl
              font-bold
              mt-2
              break-words
            "
          >
            {value}
          </p>

        </div>

        <span
          className="
            text-3xl
            shrink-0
          "
        >
          {icon}
        </span>

      </div>

    </div>

  );

}


// ==========================================================
// Profile Stat
// ==========================================================

function ProfileStat({

  label,

  value

}: {

  label: string;

  value: string | number;

}) {

  return (

    <div>

      <p
        className="
          text-sm
          sm:text-base
          text-white/70
        "
      >
        {label}
      </p>

      <h3
        className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          mt-1
          break-words
        "
      >
        {value}
      </h3>

    </div>

  );

}


// ==========================================================
// AI Coach Item
// ==========================================================

function CoachItem({

  title,

  value

}: {

  title: string;

  value: string;

}) {

  return (

    <div
      className="
        bg-white/10
        rounded-2xl
        p-5
        min-w-0
      "
    >

      <h3
        className="
          text-lg
          sm:text-xl
          font-bold
        "
      >
        {title}
      </h3>

      <p
        className="
          text-xl
          sm:text-2xl
          font-bold
          mt-3
          break-words
        "
      >
        {value}
      </p>

    </div>

  );

}