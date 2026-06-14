"use client";

import API from "@/services/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";

export default function DashboardPage() {

  const router = useRouter();

  const [recentChats, setRecentChats] = useState<any[]>([]);

  const [xp, setXp] = useState(0);

  const [completedChallenge, setCompletedChallenge] = useState(0);

  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const [badges, setBadges] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [dailyChallenge, setDailyChallenge] = useState<any>(null);  

  const [rank, setRank] = useState<number | null>(null);

  const [greeting, setGreeting] = useState("");

  const [masteryLoading, setMasteryLoading] = useState(false);

  const [promptTrend, setPromptTrend] = useState<number[]>([]);

  const [promptMastery, setPromptMastery] = useState<any>(null);
  
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

      await fetchAchievements(email);

      await fetchDailyChallenge();

      await fetchUserRank(email);

      await fetchPromptMastery();

      await fetchPromptTrend();

      setGreeting(getGreeting());
      

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

  const fetchPromptTrend = async () => {

  try {

    const email =
      localStorage.getItem(
        "userEmail"
      );

    const res =
      await API.get(
        `/prompt-trend/${email}`
      );

    console.log(
      "PROMPT TREND:",
      res.data
    );

    if (res.data.success) {

      setPromptTrend(
        res.data.scores
      );

    }

  } catch (error) {

    console.log(
      "Prompt Trend Error:",
      error
    );

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

      setCompletedChallenge(
        Math.floor(res.data.xp / 50)
      );

    }

  } catch (error) {

    console.log(error);

  }

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

  if (xp >= 300) {

    return "Advanced";

  }

  if (xp >= 100) {

    return "Intermediate";

  }

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
      currentLevel:
        "Intermediate",
      nextLevel:
        "Advanced",
      currentXP:
        xp - 100,
      targetXP: 200,
      percentage:
        ((xp - 100) / 200) * 100
    };

  }

  return {
    currentLevel:
      "Advanced",
    nextLevel:
      "Master",
    currentXP: 300,
    targetXP: 300,
    percentage: 100
  };

};

const fetchRecentChats = async (
  email: string | null
) => {

  if (!email) return;

  try {

    const res = await API.get(
      `/recent-chats/${email}`
    );

    if (res.data.success) {

      setRecentChats(res.data.chats);

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchDashboardStats = async (
  email: string | null
) => {

  if (!email) return;

  try {

    const res = await API.get(
      `/dashboard-stats/${email}`
    );

    if (res.data.success) {

      setStats(res.data);

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchLeaderboard = async () => {

  try {

    const res = await API.get(
      "/leaderboard"
    );

    if (res.data.success) {

      setLeaderboard(
        res.data.leaderboard
      );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchUserRank = async (
  email: string | null
) => {

  if (!email) return;

  try {

    const res = await API.get(
      `/user-rank/${email}`
    );

    if (res.data.success) {

      setRank(
        res.data.rank
      );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchDailyChallenge =
  async () => {

  try {

    const res = await API.get(
      "/daily-challenge"
    );

    if (res.data.success) {

      setDailyChallenge(
        res.data.challenges
      );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchAchievements = async (email: string | null) => {

  if (!email) return;

  try {

    const res = await API.get(
      `/achievements/${email}`
    );

    console.log(
      "ACHIEVEMENTS RESPONSE:",
      res.data
    );

    if (res.data.success) {

      setBadges(
        res.data.badges || []
      );

    }

  } catch (error) {

    console.log(error);

    setBadges([]);

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

  return (

    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">

      <section
        className="
    bg-gradient-to-r
    from-blue-600
    via-purple-600
    to-pink-500
    rounded-3xl
    p-8
    text-white
    mb-8
    shadow-xl
  "
      >

        <div
          className="
      flex
      justify-between
      items-start
      gap-10
    "
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
                className="
            bg-white/20
            backdrop-blur-md
            px-5
            py-3
            rounded-2xl
          "
              >
                🎯 XP: {xp}
              </span>

              <span
                className="
            bg-white/20
            backdrop-blur-md
            px-5
            py-3
            rounded-2xl
          "
              >
                🏆 Rank #{rank ?? "-"}
              </span>

              <span
                className="
            bg-white/20
            backdrop-blur-md
            px-5
            py-3
            rounded-2xl
          "
              >
                🚀 {stats.skill_level}
              </span>
      
            </div>
      
          </div>

          {/* RIGHT SIDE */}

          <div
            className="
        bg-gradient-to-br
        from-emerald-500
        to-green-700
        rounded-3xl
        px-8
        py-6
        shadow-2xl
        min-w-[320px]
      "
          >

            <p
              className="
          text-sm
          text-center
          opacity-90
        "
            >
              Prompt Level
            </p>

            <div
              className="
          flex
          items-center
          justify-center
          gap-4
          mt-4
        "
            >

              <h3
                className="
            text-4xl
            font-extrabold
          "
              >
                {promptLevel}
              </h3>

            </div>

            <p
              className="
          text-sm
          text-center
          mt-4
          opacity-90
        "
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

      {promptMastery && (

        
        
        <div
          className="
      mt-8
      bg-white
      rounded-3xl
      p-8
      shadow-lg
      border
      border-slate-200
    "
        >

          <h2
            className="
        text-3xl
        font-bold
        text-slate-800
        mb-6
      "
          >
            🎯 Prompt Mastery
          </h2>

          <div
            className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
      "
          >

           {/* ADD THIS CARD */}



            <div
              className="
    bg-gradient-to-r
    from-blue-500
    to-cyan-500
    text-white
    rounded-3xl
    p-6
    shadow-lg
    hover:scale-105
    transition-all
    duration-300
        "
            >
              <p className="text-white/80 text-sm text-center">
                Total Prompts
              </p>
      
              <h3
                className="
    text-5xl
    font-bold
    mt-3
    text-center
          "
              >
                {promptMastery.total_prompts}
              </h3>

              <p className="mt-3 text-white/80 text-sm text-center">
                Prompts analyzed
              </p>

            </div>

            <div
              className="
  bg-gradient-to-r
  from-green-500
  to-emerald-600
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
  "
            >

              <p className="text-white/80">
                Clarity
              </p>

              <h3
                className="
      text-5xl
      font-bold
      text-white-600
      mb-2
      text-center
    "
              >
                {promptMastery.average_clarity}/10
              </h3>

              <div
                className="
      w-full
      bg-white/30
      rounded-full
      h-3
    "
              >

                <div
                  className="
  bg-white
  h-3
  rounded-full
  transition-all
  duration-700
      "
                  style={{
                    width: `${
                      promptMastery.average_clarity * 10
                    }%`
                  }}
                />

              </div>

            </div>

            <div
              className="
  bg-gradient-to-r
  from-purple-500
  to-violet-600
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
  "
            >

              <p className="text-white/80">
                Specificity
              </p>

              <h3
                className="
      text-5xl
      font-bold
      text-white-600
      mb-2
      text-center
    "
              >
                {promptMastery.average_specificity}/10
              </h3>

              <div
                className="
      w-full
      bg-slate-200
      rounded-full
      h-3
    "
              >

                <div
                  className="
  bg-green-500
  h-3
  rounded-full
  transition-all
  duration-700
      "
                  style={{
                    width: `${
                      promptMastery.average_specificity * 10
                    }%`
                  }}
                />

              </div>

            </div>

            <div
              className="
  bg-gradient-to-r
  from-yellow-500
  to-orange-500
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
  "
            >

              <p className="text-white/80">
                Context
              </p>

              <h3
                className="
      text-5xl
      font-bold
      text-white-600
      mb-2
      text-center
    "
              >
                {promptMastery.average_context}/10
              </h3>

              <div
                className="
      w-full
      bg-slate-200
      rounded-full
      h-3
    "
              >

                <div
                  className="
  bg-green-500
  h-3
  rounded-full
  transition-all
  duration-700
      "
                  style={{
                    width: `${
                      promptMastery.average_context * 10
                    }%`
                  }}
                />

              </div>

            </div>

            <div
              className="
  bg-gradient-to-r
  from-red-500
  to-pink-600
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
  "
            >

              <p className="text-white/80">
                Constraints
              </p>

              <h3
                className="
      text-5xl
      font-bold
      text-white-600
      mb-2
      text-center 
    "
              >
                {promptMastery.average_constraints}/10
              </h3>

              <div
                className="
      w-full
      bg-white/30
      rounded-full
      h-3
    "
              >

                <div
                  className="
  bg-green-500
  h-3
  rounded-full
  transition-all
  duration-700
      "
                  style={{
                    width: `${
                      promptMastery.average_constraints * 10
                    }%`
                  }}
                />

              </div>

            </div>

            <div
              className="
  bg-gradient-to-r
  from-indigo-600
  via-purple-600
  to-pink-600
  text-white
  rounded-3xl
  p-6
  shadow-xl
  hover:scale-105
  transition-all
  duration-300
  text-center
  "
            >

              <p className="text-white/80">
                Overall
              </p>

              <h3
                className="
      text-5xl
      font-bold
      text-white-600
      mb-2
      text-center 
    "
              >
                {promptMastery.average_overall}/10
              </h3>

              <div
                className="
  bg-gradient-to-r
  from-cyan-500
  to-blue-600
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
"
              >
                <p className="text-white/80">
                  Best Score
                </p>

                <div
                  className="
  bg-gradient-to-r
  from-orange-500
  to-red-500
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
"
                >
                  <p className="text-white/80">
                    Improvement
                  </p>

                  <h3 className="text-5xl font-bold mt-2">
                    {promptMastery.improvement > 0
                      ? `+${promptMastery.improvement}`
                      : promptMastery.improvement}
                  </h3>

                  <p className="mt-3 text-white/80">
                    Growth Since First Prompt
                  </p>
                </div>

                <h3 className="text-5xl font-bold mt-2">
                  {promptMastery.best_score}
                </h3>

                <p className="mt-3 text-white/80">
                  Highest Prompt Score
                </p>
              </div>

              <div
                className="
  bg-gradient-to-r
  from-orange-500
  to-red-500
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
"
               >
                <p className="text-white/80">
                  Improvement
                </p>

                <h3 className="text-5xl font-bold mt-2">
                  {promptMastery.improvement > 0
                    ? `+${promptMastery.improvement}`
                    : promptMastery.improvement}
                </h3>

                <p className="mt-3 text-white/80">
                  Growth Since First Prompt
                </p>
              </div>

              <div
                className="
  bg-gradient-to-r
  from-purple-600
  to-pink-600
  text-white
  rounded-3xl
  p-6
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  text-center
"
              >
                <p className="text-white/80">
                  Mastery Level
                </p>

                <h3 className="text-3xl font-bold mt-4">
                  {promptMastery.mastery_level}
                </h3>

                <p className="mt-3 text-white/80">
                  Current Prompt Skill
                </p>
              </div>

              <p className="mt-3 text-white/80">
                Prompt Quality Index
              </p>

              <div
                className=" w-full bg-slate-200 rounded-full h-3 "
              >

                <div
                  className=" bg-green-500 h-3 rounded-full transition-all duration-700 "
                  style={{
                    width: `${
                      promptMastery.average_overall * 10
                    }%`
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      )}

      <section className="mt-8">

        <div className="bg-white rounded-3xl p-8 shadow-lg">
      
          <h2 className="text-3xl font-bold mb-6">
      
            📈 Prompt Growth Trend

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            {promptTrend.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No prompt history yet.
              </div>
            ) : (

              <LineChart
                data={promptTrend.map((score, index) => ({
                  prompt: `Prompt ${index + 1}`,
                  score: score
                }))}
              >
  
                <XAxis dataKey="prompt" />

                <YAxis domain={[0, 10]} />

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none"
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />

              </LineChart>

            )}

          </ResponsiveContainer>

        </div>



      </section>

      {/* stats cards section */}

      <section className="mb-12">
      
        <div className="bg-white backdrop-blur-lg border border-slate-200 shadow-md rounded-3xl p-8">
      
          <h2 className="text-2xl font-bold mb-4">
            User Profile
          </h2>


          <div className="space-y-2 text-slate-600">

            <p>
              <span className="font-semibold text-slate-900">
                Username:
              </span>{" "}
              {stats.username}
            </p>

            <p>
              <span className="font-semibold text-slate-900">
                Email:
              </span>{" "}
              {stats.email}
            </p>

            <p>
              <span className="font-semibold text-slate-900">
                Skill Level:
              </span>{" "}
              {getLevel()}
            </p>
      
          </div>
      
        </div>
      
      </section>

      <section className="mb-12">

        <div className="bg-white backdrop-blur-lg border border-slate-200 shadow-md rounded-3xl p-8">

          <div className="flex justify-between mb-4">

            <h2 className="text-2xl font-bold">

              Level Progress 📈

            </h2>

            <span className="text-slate-400">

              {progress.currentLevel}
              {" → "}
              {progress.nextLevel}

            </span>

          </div>

          <div className="w-full h-4 bg-bg-slate-200 rounded-full overflow-hidden">

            <div
              className="h-4 bg-orange-500 rounded-full transition-all duration-500"
              style={{
                width:
                  `${progress.percentage}%`
              }}
            />

          </div>

          <div className="flex justify-between mt-3 text-sm text-slate-400">

            <span>

              {Math.floor(
                progress.currentXP
              )} XP

            </span>

            <span>

              {Math.floor(
                progress.targetXP
              )} XP

            </span>

          </div>

          <div className="mt-3 text-center text-orange-400 font-semibold">

            {Math.floor(
              progress.percentage
            )}% Completed

          </div>

        </div>

      </section>

      <section className="mb-12">

        <div className="bg-white backdrop-blur-lg border border-slate-200 shadow-md rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Analytics Overview 📊

          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-400 text-sm">

                Total Chats

              </p>

              <p className="text-3xl font-bold">

                {stats.total_chats}

              </p>

            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-400 text-sm">

                Total XP

              </p>
      
              <p className="text-3xl font-bold text-orange-400">

                {xp}

              </p>

            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-400 text-sm">

                Challenges

              </p>

              <p className="text-3xl font-bold text-purple-400">

                {completedChallenge}

              </p>

            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-400 text-sm">

                Rank

              </p>

              <p className="text-3xl font-bold text-green-500">

                #{rank ?? "-"}

              </p>

            </div>

          </div>

       </div>

      </section>

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

      {/* Achievements */}

      <section className="mt-8">

        <div className="bg-white rounded-3xl p-8 shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Achievements 🏅
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {(badges || []).length > 0 ? (
      
              badges.map((badge, index) => (

                <div
                  key={index}
                  className="
            p-4
            rounded-xl
            bg-green-50
            border
            border-green-300
            text-green-700
            font-semibold
          "
                >
                  🏅 {badge}
                </div>

              ))
      
            ) : (
      
              <p>No achievements unlocked yet.</p>

            )}

          </div>

        </div>

      </section>

      {/* Leaderboard */}

      <section className="mt-8">

        <div className="bg-white backdrop-blur-lg border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Leaderboard 🏆
          </h2>

          <div className="space-y-3">

            {leaderboard.length > 0 ? (

              leaderboard.map(
                (user, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-white/5"
                  >

                    <div>

                      <p className="font-semibold">
                        #{index + 1} {user.username}
                      </p>

                      <p className="text-slate-500 text-sm">
                        Prompt Engineer
                      </p>

                    </div>

                    <div className="text-orange-500 font-bold">      

                    {user.xp} XP

                    </div>

                  </div>

                )
              )

            ) : (      

            <p className="text-slate-500">
              No leaderboard data
            </p>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}
