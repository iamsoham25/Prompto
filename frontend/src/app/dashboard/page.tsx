"use client";

import API from "@/services/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DashboardPage() {

  const router = useRouter();

  const [recentChats, setRecentChats] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

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

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };

  loadDashboard();

}, []);

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
          title="Chats Generated"
          value={stats.total_chats.toString()}
          color="text-blue-400"
        />
    
        <Card
          title="Lessons Completed"
          value={stats.completed_lessons.toString()}
          color="text-orange-400"
        />
    
        <Card
          title="Skill Level"
          value={stats.skill_level}
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
              {stats.skill_level}
            </p>
      
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

          <h2 className="text-2xl font-bold mb-6">
            Daily Challenge
          </h2>

          <p className="text-slate-400 mb-8">
            Create a prompt that forces AI to respond only in JSON format.
          </p>

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

    </main>
  );
}