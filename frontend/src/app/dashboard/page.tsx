"use client";

import API from "@/services/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { motion } from "framer-motion";

export default function DashboardPage() {

  const router = useRouter();

  const [recentChats, setRecentChats] = useState<any[]>([]);

  const [xp, setXp] = useState(0);

  const [completedChallenge, setCompletedChallenge] = useState(0);

  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [dailyChallenge, setDailyChallenge] = useState<any>(null);  

  const [rank, setRank] = useState<number | null>(null);

  const [greeting, setGreeting] = useState("");

  const [masteryLoading, setMasteryLoading] = useState(false);

  const [promptTrend, setPromptTrend] = useState<any[]>([]);

  const [promptMastery, setPromptMastery] = useState<any>(null);

  const [xpData, setXpData] = useState<any>(null);

  const [xpLoading, setXpLoading] = useState(false);

  const [streakData, setStreakData] = useState<any>(null);

  const [achievements, setAchievements] = useState<any[]>([]);

  const [coach,setCoach] = useState<any>({});

  const [prompt, setPrompt] = useState("");

  const [lessonAnalytics, setLessonAnalytics] = useState<any>(null);

  const [improvedPrompt, setImprovedPrompt] = useState("");
  
  const [stats, setStats] = useState({
    username: "",
    email: "",
    total_chats: 0,
    completed_lessons: 0,
    skill_level: "Beginner",
  });

  const [lessonProgress, setLessonProgress] = useState({
    total_lessons: 0,
    completed_lessons: 0,
    progress: 0,
    beginner_completed: 0,
    intermediate_completed: 0,
    intermediate_unlocked: false,
    advanced_unlocked: false,
  });

  const achievementIcons: Record<string, string> = {
    "Beginner Explorer": "🧭",
    "First Lesson": "📚",
    "Learning Streak": "🔥",
    "AI Explorer": "🤖",
    "Prompt Engineer": "🚀",
    "Prompt Master": "👑",
    "Challenge Champion": "🏆",
    "XP Hunter": "⚡"
  };

  const trendData = Array.isArray(promptTrend)
  ? promptTrend
  : [];

  const copyPrompt = () => {
    navigator.clipboard.writeText(
      improvedPrompt
    );
  };

  const lessonMap:any = {

    Clarity:
      "Prompt Clarity Masterclass",

    Context:
      "Context Engineering",

    Constraints:
      "Constraint Engineering",

    Specificity:
      "Specific Prompting"

  };


  useEffect(() => {
    const initDashboard = async () => {
      fetchPromptMastery();
      
      fetchPromptTrend();

      fetchXP();

      fetchStreak();

      fetchAchievements();

      await fetchCoach();
    };

    initDashboard();

  }, []);

  // Protect Dashboard Route
useEffect(() => {

  const loadDashboard = async () => {

    const token =localStorage.getItem("token");

    const email = localStorage.getItem("userEmail");

    const username = localStorage.getItem("userName");

    console.log( "Dashboard Email:", email);

    console.log("Dashboard Username:",username);

    console.log("Dashboard Email:",localStorage.getItem("userEmail"));

    console.log("Dashboard Username:",localStorage.getItem("userName"));

    if (!token) {

      router.push("/login");

      return;

    }

    try {

      await fetchDashboardStats(email);

      await fetchRecentChats(email);

      await fetchUserXP(email);

      await fetchLessonProgress(email);

      await fetchLeaderboard();

      await fetchDailyChallenge();

      await fetchUserRank(email);

      await fetchPromptMastery();

      await fetchPromptTrend();

      setGreeting(getGreeting());

      await fetchAchievements();

      await fetchLessonAnalytics(email);
      

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };

  loadDashboard();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

}, []);

const fetchPromptMastery = async () => {

  setMasteryLoading(true);

    try {

      const email =localStorage.getItem("userEmail");

      const res =await API.get(`/prompt-mastery/${email}`);

      console.log("PROMPT MASTERY DATA", res.data);

      console.log("PROMPT MASTERY:", res.data);

      if (res.data.success) {
        setPromptMastery(
          res.data
        );
      }
    } catch (error) {

      console.log("Prompt Mastery Error:",error);

    } finally {
      setMasteryLoading(false);
    }
  };

const fetchCoach = async () => {

  try {

    const email =
      localStorage.getItem("userEmail");

    const res =
      await API.get(`/coach/${email}`);

    console.log(
      "COACH DATA",
      res.data
    );

    setCoach(res.data);

  } catch(err){

    console.log(err);

  }

};

const fetchPromptTrend = async () => {

  try {

    const email = localStorage.getItem("userEmail");

    const res = await API.get(
      `/prompt-trend/${email}`
    );

    console.log("TREND RESPONSE:", res.data);

    if (res.data.success) {

      setPromptTrend( res.data.trend || [] );

    }

  } catch (error) {

    console.log(
      "Trend Error:",
      error
    );

  }
};

const improvePrompt = async () => {

  const res = await API.post(
    "/improve-prompt",
    {
      prompt
    }
  );

  setImprovedPrompt(
    res.data.improved_prompt
  );
};

const fetchStreak = async () => {

  try {

    const email = localStorage.getItem( "userEmail" );

    const res = await API.get( `/streak/${email}` );

    console.log( "STREAK:", res.data );

    setStreakData( res.data );

  } catch(err) {

    console.log(err);

  }
};


const fetchUserXP = async (email: string | null) => {

  if (!email) return;

  try {

    const res = await API.get(`/user-xp/${email}`);

    console.log("USER XP RESPONSE:",res.data);

    if (res.data.success) {

      console.log("XP API Response:",res.data);
      
      setXp(res.data.xp);

      setCompletedChallenge( Math.floor(res.data.xp / 50) );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchLessonAnalytics = async (email: string | null) => {

    if (!email) return;

    try {

        const res = await API.get(
            `/lesson-analytics/${email}`
        );

        if(res.data.success){

            setLessonAnalytics(res.data);

        }

    } catch(err){

        console.log(err);

    }

}

const fetchXP = async () => {

  try {

    setXpLoading(true);

    const email = localStorage.getItem("userEmail");

    const res = await API.get(`/xp/${email}`);

    console.log("XP DATA:", res.data);

    setXpData(res.data);

  } catch (err) {

    console.log(
      "XP Error:",
      err
    );

  } finally {

    setXpLoading(false);

  }
};

const getProgress = () => {

  if (!xpData) return 0;

  const xp = xpData.xp;

  if (xp < 200)
    return (xp / 200) * 100;

  if (xp < 500)
    return ((xp - 200) / 300) * 100;

  if (xp < 1000)
    return ((xp - 500) / 500) * 100;

  if (xp < 2000)
    return ((xp - 1000) / 1000) * 100;

  return 100;
};


const fetchLessonProgress = async (email: string | null) => {

  if (!email) return;

  try {

    const res = await API.get(`/lesson-progress/${email}`);

    console.log("LESSON PROGRESS:",res.data);

    if (res.data.success) {

      setLessonProgress(res.data);

    }

  } catch (error) {

    console.log(error);

  }

};

const getLevel = () => {

  if (xp >= 300) { return "Advanced"; }

  if (xp >= 100) { return "Intermediate"; }

  return "Beginner";

};

const getProgressData = () => {

  if (xp < 100) {

    return {
      currentLevel: "Beginner",
      nextLevel: "Intermediate",
      currentXP: xp,
      targetXP: 100,
      percentage:
        (xp / 100) * 100
    };

  }

  if (xp < 300) {

    return {
      currentLevel: "Intermediate",
      nextLevel: "Advanced",
      currentXP: xp - 100,
      targetXP: 200,
      percentage: ((xp - 100) / 200) * 100
    };

  }

  return {
    currentLevel: "Advanced",
    nextLevel: "Master",
    currentXP: 300,
    targetXP: 300,
    percentage: 100
  };

};

const fetchRecentChats = async ( email: string | null ) => {

  if (!email) return;

  try {

    const res = await API.get( `/recent-chats/${email}` );

    if (res.data.success) {

      setRecentChats(res.data.chats);

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchDashboardStats = async ( email: string | null ) => {

  if (!email) return;

  try {

    const res = await API.get( `/dashboard-stats/${email}` );

    if (res.data.success) {

      setStats(res.data);

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchLeaderboard = async () => {

  try {

    const res = await API.get( "/leaderboard" );

    if (res.data.success) {

      setLeaderboard( res.data.leaderboard );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchAchievements = async () => {

  try {

    const email = localStorage.getItem("userEmail");

    await API.post( `/achievements/check/${email}`
    );

    const res = await API.get( `/achievements/${email}` );

    console.log( "ACHIEVEMENTS:", res.data );

    console.log( "ACHIEVEMENTS ARRAY:", res.data.badges );

    if (res.data.success) {

      setAchievements(
        res.data.badges || []
      );

    }

  } catch (error) {

    console.log( "Achievement Error:", error );

  }

};

const fetchUserRank = async ( email: string | null ) => {

  if (!email) return;

  try {

    const res = await API.get( `/user-rank/${email}` );

    if (res.data.success) {

      setRank( res.data.rank );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchDailyChallenge = async () => {

  try {

    const res = await API.get( "/daily-challenge" );

    if (res.data.success) {

      setDailyChallenge( res.data.challenges );

    }

  } catch (error) {

    console.log(error);

  }

};


const getGreeting = () => {

  const hour = new Date().getHours();

  if (hour < 12) {

    return "Good Morning ☀️";

  }

  if (hour < 18) {

    return "Good Afternoon 🌤️";

  }

  return "Good Evening 🌙";

};

  // Logout Function
const handleLogout = () => {

  localStorage.clear();

  router.push("/login");

  };


  if (loading) {

    const chartData = promptTrend.map(
      (score, index) => ({
        prompt: index + 1,
        score
      })
    );
  
    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl font-bold">
        Loading Dashboard...
      </div>

    );
  }

const progress = getProgressData();

  let promptLevel = "🟢 Beginner";

    if (
      promptMastery?.average_overall >= 3
    ) {
      promptLevel = "🟡 Intermediate";
    }

    if (
      promptMastery?.average_overall >= 6
    ) {
      promptLevel = "🔵 Advanced";
    }

    if (
      promptMastery?.average_overall >= 8
    ) {
      promptLevel = "🟣 Prompt Engineer";
    }

  console.log("TREND DATA", trendData );

  return (

    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">

      <section
        className=" bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white mb-8 shadow-xl "
      >

        <div
          className=" flex justify-between items-start gap-10 "
        >
      
          {/* LEFT SIDE */}

          <div className="flex-1">

            <h1 className="text-5xl font-bold mb-3">

              {greeting || "Welcome"}, {stats.username} 👋

            </h1>

            <p className="text-xl opacity-90">

              Keep learning and level up your
              Prompt Engineering skills.

            </p>

            <div className="flex gap-4 mt-8 flex-wrap">

              <span
                className=" bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl "
              >
                🎯 XP: {xp}
              </span>

              <span
                className=" bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl "
              >
                🏆 Rank #{rank ?? "-"}
              </span>

              <span
                className=" bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl
          "
              >
                🚀 {stats.skill_level}
              </span>
      
            </div>
      
          </div>

          {/* RIGHT SIDE */}

          <div
            className=" bg-gradient-to-br from-emerald-500 to-green-700 rounded-3xl px-8 py-6 shadow-2xl min-w-[320px] "
          >

            <p
              className=" text-sm text-center opacity-90 "
            >
              Prompt Level
            </p>

            <div
              className=" flex items-center justify-center gap-4 mt-4 "
            >

              <h3
                className=" text-4xl font-extrabold "
              >
                {promptLevel}
              </h3>

            </div>

            <p
              className=" text-sm text-center mt-4 opacity-90 "
            >
              Your current prompt engineering level
            </p>

          </div>

        </div>

      </section>

      {/* Header */}

      <section className="flex justify-between items-center mb-12">

        <div>

        </div>

      </section>

        {/* Stats Cards */}

        <section className="grid md:grid-cols-3 gap-6 mb-12">

        <Card
          title="Total XP"
          value={`${xp} XP`}
          color="text-yellow-400"
        />

        <Card
          title="Challenge Completed"
          value={completedChallenge.toString()}
          color="text-orange-400"
        />

        <Card
          title="Skill Level"
          value={getLevel()}
          color="text-green-400"
        />
    
      </section>

    {

      xpData && (
          
        <div
          className=" mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white "
          >

          <h2
            className=" text-3xl font-bold mb-6 "
          >
            🏆 Prompt Engineer Profile
          </h2>

          <div
            className=" grid grid-cols-1 md:grid-cols-3 gap-6 "
            >

            <div>

              <p className="text-white/70">
                Current XP
              </p>

              <h3 className="text-6xl font-bold">
                {xpData.xp}
              </h3>

            </div>

            <div>

              <p className="text-white/70">
                Level
              </p>

              <h3 className="text-6xl font-bold">
                {xpData.level}
              </h3>

            </div>

            <div>

              <p className="text-white/70">
                Rank
              </p>

              <h3 className="text-4xl font-bold">
                {xpData.rank}
              </h3>

            </div>

            <div className="mt-8">

              <p className="mb-2">
                Progress To Next Level
              </p>

              <div
                className=" w-full h-5 bg-white/20 rounded-full overflow-hidden "
                >

                <div
                  className=" h-5 bg-yellow-400 transition-all duration-1000 "
                  style={{ width: `${getProgress()}%` }}
                />

              </div>

            </div>

          </div>

        </div>

      )

    }

    {
      
      streakData && (

        <div
          className=" mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 shadow-xl text-white "
          >

          <h2
            className=" text-3xl font-bold mb-6 "
          >
            🔥 Learning Streak
          </h2>

          <div
            className=" grid grid-cols-2 gap-6 "
            >

            <div>

              <p className="text-white/80">
                Current Streak
              </p>

                <h3 className="text-6xl font-bold">
                  {streakData.current_streak}
                </h3>

              <p>Days</p>

            </div>

            <div>

              <p className="text-white/80">
                Best Streak
                </p>

                <h3 className="text-6xl font-bold">
                  {streakData.best_streak}
                </h3>

              <p>Days</p>

            </div>

          </div>

          <p className="mt-6 text-white/80 text-lg">
            ⭐ Keep learning daily to build your streak!
          </p>

          <motion.div

          animate={{
            scale:[1,1.03,1]
          }}

          transition={{
            repeat:Infinity,
            duration:2
          }}

          ></motion.div>

        </div>

      )

    }

    {

      Array.isArray(achievements) && achievements.length > 0 && (

        <motion.div
          initial={{
            opacity:0,
            y:50
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration : 0.6
          }}
          className=" mt-10 bg-white rounded-3xl p-8 shadow-xl border border-slate-200 "
          >

          <h2
            className=" text-4xl font-bold text-slate-800 mb-8 "
            >
            🏆 Achievements
          </h2>

          <div
            className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 "
            >

            {
              achievements.map(
                (achievement,index)=>(

                  <div
                    key={index}
                    className=" bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-3xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 "
                    >

                    <div className="text-6xl text-center">
                      {
                        achievementIcons[
                          achievement
                        ] || "🏆"
                      }

                    </div>

                    <h3 className="text-xl font-bold mt-4 text-center">
                      {achievement}
                    </h3>

                    <p
                      className=" mt-2 text-center text-white/80 "
                    >

                    Achievement Unlocked

                  </p>

                </div>

              ))

            }

          </div>

        </motion.div>

      )

    }


    {

      coach && (

        <div className=" mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-3xl p-8 shadow-xl" >

          <h2 className=" text-4xl font-bold mb-8 " >
            🤖 AI Coach
          </h2>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 " >

            <div>

              <h3 className="text-2xl font-bold">
                💪 Strongest Skill
              </h3>

              <p className="text-3xl font-bold mt-3">
                {coach?.strength || "Loading..."}
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold">
                🎯 Weakest Skill
              </h3>

              <p className="text-3xl font-bold mt-3">

              {
              lessonMap[
               coach?.weakness
              ] || "Prompt Fundamentals"
              }

              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold">
                📚 Recommended Lesson
              </h3>

              <p className="text-3xl font-bold mt-3">
                {coach?.recommendation || "Loading..."}
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold">
                🚀 Recommendation
              </h3>

              <p className="text-3xl font-bold mt-3">
                {coach?.recommendation}
              </p>

            </div>

          </div>

        </div>

      )

    }


      {/* Main Content */}

      <section className="grid lg:grid-cols-2 gap-6">

        {/* Learning Progress */}

        <div className="bg-white backdrop-blur-lg border border-slate-200 shadow-md rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Learning Progress
          </h2>

          <div className="space-y-6">

            <div>

              <div className="flex justify-between mb-2">
                <span>Completed Lessons</span>
                <span>
                  {lessonProgress.completed_lessons}
                  /
                  {lessonProgress.total_lessons}
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full">

                <div
                  className="h-3 bg-orange-500 rounded-full"
                  style={{
                    width: `${lessonProgress.progress}%`
                  }}
                />

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-blue-50 p-4 rounded-xl">

                <p className="text-sm text-slate-500">
                  Beginner Completed
                </p>

                <p className="text-2xl font-bold">
                  {lessonProgress.beginner_completed}
                </p>

              </div>

              <div className="bg-green-50 p-4 rounded-xl">

                <p className="text-sm text-slate-500">
                  Intermediate Completed
                </p>

                <p className="text-2xl font-bold">
                  {lessonProgress.intermediate_completed}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Daily Challenge */}

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-3">

            {dailyChallenge?.title}

          </h2>

          <p className="text-slate-500 mb-6">

            Daily Challenge 🎯

          </p>

          <p className="text-slate-400 mb-4">
            {dailyChallenge?.description}
          </p>

          <div className="mb-6">

            <span className="bg-orange-500 px-3 py-1 rounded-lg text-sm">

              {dailyChallenge?.difficulty}

            </span>

          </div>

          <button
            type="button"
            className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => router.push("/challenges/0")}
          >
            Start Challenge
          </button>

        </div>

      </section>

      {/* Recent Activity */}

      <section className="mt-8">

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-3">

            {recentChats.length > 0 ? (

              recentChats.map((chat, index) => (

                <div
                  key={index}
                  className="bg-slate-50 p-4 rounded-xl border border-white/5"
                >
                  <p className="text-slate-700">
                    {chat.prompt}
                  </p>
                </div>

              ))

            ) : (

              <p className="text-slate-500">
                No recent chats found
              </p>

            )}

          </div>
      
        </div>

      </section>

  
    </main>

  );

}
