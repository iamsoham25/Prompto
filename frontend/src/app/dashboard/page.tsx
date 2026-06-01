"use client";

import API from "@/services/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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

  const [stats, setStats] = useState({
    username: "",
    email: "",
    total_chats: 0,
    completed_lessons: 0,
    skill_level: "Beginner",
  });

  // Protect Dashboard Route
useEffect(() => {

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

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };

  loadDashboard();

}, []);

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

    <main className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}

      <section className="flex justify-between items-center mb-12">

        <div>

          <h1 className="text-5xl font-bold mb-4">
            Welcome Back {stats.username} 👋
          </h1>

          <p className="text-slate-400 text-lg">
            Continue mastering Prompt Engineering.
          </p>

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

      {/* stats cards section */}

      <section className="mb-12">
      
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
      
          <h2 className="text-2xl font-bold mb-4">
            User Profile
          </h2>


          <div className="space-y-2 text-slate-300">

            <p>
              <span className="font-semibold text-white">
                Username:
              </span>{" "}
              {stats.username}
            </p>

            <p>
              <span className="font-semibold text-white">
                Email:
              </span>{" "}
              {stats.email}
            </p>

            <p>
              <span className="font-semibold text-white">
                Skill Level:
              </span>{" "}
              {getLevel()}
            </p>
      
          </div>
      
        </div>
      
      </section>

      <section className="mb-12">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

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

          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="h-4 bg-blue-500 rounded-full transition-all duration-500"
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

          <div className="mt-3 text-center text-blue-400 font-semibold">

            {Math.floor(
              progress.percentage
            )}% Completed

          </div>

        </div>

      </section>

      <section className="mb-12">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Analytics Overview 📊

          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-slate-900 rounded-2xl p-5">

              <p className="text-slate-400 text-sm">

                Total Chats

              </p>

              <p className="text-3xl font-bold">

                {stats.total_chats}

              </p>

            </div>

            <div className="bg-slate-900 rounded-2xl p-5">

              <p className="text-slate-400 text-sm">

                Total XP

              </p>
      
              <p className="text-3xl font-bold text-yellow-400">

                {xp}

              </p>

            </div>

            <div className="bg-slate-900 rounded-2xl p-5">

              <p className="text-slate-400 text-sm">

                Challenges

              </p>

              <p className="text-3xl font-bold text-orange-400">

                {completedChallenges}

              </p>

            </div>

            <div className="bg-slate-900 rounded-2xl p-5">

              <p className="text-slate-400 text-sm">

                Rank

              </p>

              <p className="text-3xl font-bold text-green-400">

                #{rank ?? "-"}

              </p>

            </div>

          </div>

       </div>

      </section>

      {/* Main Content */}

      <section className="grid lg:grid-cols-2 gap-6">

        {/* Learning Progress */}

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Learning Progress
          </h2>

          <div className="space-y-6">

            <div>

              <div className="flex justify-between mb-2">
                <span>Prompt Basics</span>
                <span>80%</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full">
                <div className="w-[80%] h-3 bg-blue-500 rounded-full"></div>
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

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

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

            <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm">

              {dailyChallenge?.difficulty}

            </span>

          </div>

          <Button text="Start Challenge" />

        </div>

      </section>

      <section className="mt-8">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-3">

            {recentChats.length > 0 ? (

              recentChats.map((chat, index) => (

                <div
                  key={index}
                  className="bg-slate-900 p-4 rounded-xl border border-white/5"
                >
                  <p className="text-slate-300">
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

      <section className="mt-8">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
      
          <h2 className="text-2xl font-bold mb-6">
      
            Achievements 🏅

          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div
              className={`p-4 rounded-xl border ${
                badges.includes(
                  "Beginner Explorer"
                )
                  ? "bg-green-500/10 border-green-500 text-green-400"
                  : "bg-slate-900 border-slate-800 text-slate-500"
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
                  ? "bg-green-500/10 border-green-500 text-green-400"
                  : "bg-slate-900 border-slate-800 text-slate-500"
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
                  ? "bg-green-500/10 border-green-500 text-green-400"
                  : "bg-slate-900 border-slate-800 text-slate-500"
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
                  ? "bg-green-500/10 border-green-500 text-green-400"
                  : "bg-slate-900 border-slate-800 text-slate-500"
              }`}
            >
              {badges.includes(
                "AI Architect"
              )
                ? "🏅"
                : "🔒"}{" "}
              AI Architect
            </div>

          </div>

        </div>

      </section>

      <section className="mt-8">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Leaderboard 🏆
          </h2>

          <div className="space-y-3">

            {leaderboard.length > 0 ? (

              leaderboard.map(
                (user, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-white/5"
                  >

                    <div>

                <p className="font-semibold">

                  #{index + 1} {user.username}

                      </p>

                      <p className="text-slate-500 text-sm">

                        {user.email}

                      </p>

                    </div>

                    <div className="text-yellow-400 font-bold">      

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