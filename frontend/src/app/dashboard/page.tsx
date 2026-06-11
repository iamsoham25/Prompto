"use client";

import API from "@/services/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { pre } from "framer-motion/m";

export default function DashboardPage() {

  const router = useRouter();

  const [recentChats, setRecentChats] = useState<any[]>([]);

  const [xp, setXp] = useState(0);

  const [completedChallenges, setCompletedChallenges] = useState(0);

  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const [badges, setBadges] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [dailyChallenge, setDailyChallenge] = useState<any>(null);  

  const [rank, setRank] = useState<number | null>(null);

  const [greeting, setGreeting] = useState("");

  const [promptMastery, setPromptMastery] = useState<any>(null);

  const [masteryLoading, setMasteryLoading] = useState(true);

  const [stats, setStats] = useState({
    username: "",
    email: "",
    total_chats: 0,
    completed_lessons: 0,
    skill_level: "Beginner",
  });

  // Protect Dashboard Route
  useEffect(() => {

    fetchPromptMastery();

    // Always open dashboard at top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const loadDashboard = async () => {

      const token = localStorage.getItem("token");

      const email = localStorage.getItem("userEmail");

      if (!token) {

        router.push("/login");

        return;

      }

      try {

        await fetchDashboardStats(email);

        await fetchRecentChats(email);

        await fetchUserXP(email);

        await fetchLeaderboard();

        await fetchAchievements(email);

        await fetchDailyChallenge();

        await fetchUserRank(email);

        setGreeting(getGreeting());

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    };

    loadDashboard();

  }, []);

const fetchPromptMastery =
  async () => {

    try {

      const email =
        localStorage.getItem(
          "userEmail"
        );

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

      console.log(
        "Prompt Mastery Error:",
        error
      );

    } finally {

      setMasteryLoading(false);

    }

  };

const fetchUserXP = async (
  email: string | null
) => {

  if (!email) return;

  try {

    const res = await API.get(
      `/user-xp/${email}`
    );

    if (res.data.success) {

      setXp(res.data.xp);

      setCompletedChallenges(
        Math.floor(res.data.xp / 50)
      );

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
        res.data.challenge
      );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchAchievements = async (
  email: string | null
) => {

  if (!email) return;

  try {

    const res = await API.get(
      `/achievements/${email}`
    );

    if (res.data.success) {

      setBadges(
        res.data.badges
      );

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

    localStorage.removeItem("token");

    router.push("/login");

  };
  if (loading) {

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl font-bold">
      Loading Dashboard...
    </div>

  );
}

const progress = getProgressData();
  return (

    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">

      <section
        className=" bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white mb-8 shadow-xl "
      >

        <h1 className="text-4xl font-bold mb-2">

          {greeting}, {stats.username} 👋

        </h1>

        <p className="text-lg opacity-90">

          Keep learning and level up your
          Prompt Engineering skills.

        </p>

        <div className="flex flex-wrap gap-4 mt-6">

          <span className="bg-white/20 px-4 py-2 rounded-xl">

            🎯 XP: {xp}

          </span>

          <span className="bg-white/20 px-4 py-2 rounded-xl">

            🏆 Rank #{rank ?? "-"}

          </span>

          <span className="bg-white/20 px-4 py-2 rounded-xl">

            🚀 {stats.skill_level}

          </span>

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
          title="Challenges Completed"
          value={completedChallenges.toString()}
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
        grid-cols-2
        md:grid-cols-3
        gap-6
      "
          >

            <div
              className="
          bg-blue-50
          rounded-2xl
          p-5
          text-center
        "
            >
              <p className="text-slate-500">
                Total Prompts
              </p>
      
              <h3
                className="
            text-3xl
            font-bold
            text-blue-600
          "
              >
                {promptMastery.total_prompts}
              </h3>
            </div>

            <div
              className="
    bg-green-50
    rounded-2xl
    p-5
  "
            >

              <p className="text-slate-500">
                Clarity
              </p>

              <h3
                className="
      text-3xl
      font-bold
      text-green-600
      mb-3
    "
              >
                {promptMastery.average_clarity}/10
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
                      promptMastery.average_clarity * 10
                    }%`
                  }}
                />

              </div>

            </div>

            <div
              className="
    bg-green-50
    rounded-2xl
    p-5
  "
            >

              <p className="text-slate-500">
                Specificity
              </p>

              <h3
                className="
      text-3xl
      font-bold
      text-green-600
      mb-3
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
    bg-green-50
    rounded-2xl
    p-5
  "
            >

              <p className="text-slate-500">
                Context
              </p>

              <h3
                className="
      text-3xl
      font-bold
      text-green-600
      mb-3
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
    bg-green-50
    rounded-2xl
    p-5
  "
            >

              <p className="text-slate-500">
                Contraints
              </p>

              <h3
                className="
      text-3xl
      font-bold
      text-green-600
      mb-3
    "
              >
                {promptMastery.average_constraints}/10
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
                      promptMastery.average_constraints * 10
                    }%`
                  }}
                />

              </div>

            </div>

            <div
              className="
    bg-green-50
    rounded-2xl
    p-5
  "
            >

              <p className="text-slate-500">
                Overall
              </p>

              <h3
                className="
      text-3xl
      font-bold
      text-green-600
      mb-3
    "
              >
                {promptMastery.average_overall}/10
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
                      promptMastery.average_overall * 10
                    }%`
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      )}

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

                {completedChallenges}

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
                <span>Prompt Basics</span>
                <span>80%</span>
              </div>

              <div className="w-full h-3 bg-slate-50 rounded-full">
                <div className="w-[80%] h-3 bg-orange-500 rounded-full"></div>
              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>Chain of Thought</span>
                <span>45%</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full">
                <div className="w-[45%] h-3 bg-green-500 rounded-full"></div>
              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>AI Agents</span>
                <span>20%</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full">
                <div className="w-[20%] h-3 bg-purple-500 rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

        {/* Daily Challenge */}

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-3">
            {dailyChallenge?.title}
          </h2>

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

          <Button text="Start Challenge" />

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

        <div className="bg-white backdrop-blur-lg border border-white/10 rounded-3xl p-8">
      
          <h2 className="text-2xl font-bold mb-6">
      
            Achievements 🏅

          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "Beginner Explorer"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "Beginner Explorer"
              )
                ? "🏅"
                : "🔒"}{" "}
              Beginner Explorer
            </div>

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "Prompt Apprentice"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "Prompt Apprentice"
              )
                ? "🏅"
                : "🔒"}{" "}
              Prompt Apprentice
            </div>

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "Prompt Engineer"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "Prompt Engineer"
              )
                ? "🏅"
                : "🔒"}{" "}
              Prompt Engineer
            </div>

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "AI Architect"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "AI Architect"
              )
                ? "🏅"
                : "🔒"}{" "}
              AI Architect
            </div>

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "First Lesson"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "First Lesson"
              )
                ? "🏅"
                : "🔒"}{" "}
              First Lesson
            </div>

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "Learning Streak"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                 : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "Learning Streak"
              )
                ? "🏅"
                : "🔒"}{" "}
              Learning Streak
            </div>

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "AI Explorer"
                )
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {badges.includes(
                "AI Explorer"
              )
                ? "🏅"
                : "🔒"}{" "}
              AI Explorer
            </div>

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

                        {user.email}

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