"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DashboardPage() {

  const router = useRouter();

  // Protect Dashboard Route
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, []);

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");

    router.push("/login");

  };

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}

      <section className="flex justify-between items-center mb-12">

        <div>

          <h1 className="text-6xl font-bold mb-4">
            Welcome Back 👋
          </h1>

          <p className="text-slate-400 text-lg">
            Continue mastering Prompt Engineering.
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl transition-all"
        >
          Logout
        </button>

      </section>

      {/* Stats Cards */}

      <section className="grid md:grid-cols-3 gap-6 mb-12">

        <Card
          title="XP Points"
          value="1200"
          color="text-blue-400"
        />

        <Card
          title="Current Streak"
          value="7 Days"
          color="text-orange-400"
        />

        <Card
          title="Skill Level"
          value="Beginner"
          color="text-green-400"
        />

      </section>

      {/* Main Content */}

      <section className="grid lg:grid-cols-2 gap-6">

        {/* Learning Progress */}

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
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

          <h2 className="text-3xl font-bold mb-6">
            Daily Challenge
          </h2>

          <p className="text-slate-400 mb-8">
            Create a prompt that forces AI to respond only in JSON format.
          </p>

          <Button text="Start Challenge" />

        </div>

      </section>

    </main>
  );
}