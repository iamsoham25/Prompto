"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import MetricCard from "@/components/analytics/MetricCard";

export default function AnalyticsPage() {

  const [analytics, setAnalytics] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics = async () => {

    try {

      const email = localStorage.getItem("userEmail");

      const res = await API.get(
        `/analytics/${email}`
      );

      if (res.data.success) {

        setAnalytics(res.data);

      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading Analytics...

      </div>

    );

  }

  if (!analytics) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        No Analytics Found

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HERO */}

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-white shadow-xl">

          <h1 className="text-5xl font-bold">

            📊 AI Analytics Dashboard

          </h1>

          <p className="mt-4 text-lg opacity-90">

            Monitor your Prompt Engineering skills with AI-powered analytics.

          </p>

        </div>

        {/* KPI CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <MetricCard

            title="Total Prompts"

            value={analytics.cards.total_prompts}

          />

          <MetricCard

            title="Average Score"

            value={`${analytics.cards.average_score}/100`}

          />

          <MetricCard

            title="Best Score"

            value={`${analytics.cards.best_score}/100`}

          />

          <MetricCard

            title="Lowest Score"

            value={`${analytics.cards.lowest_score}/100`}

          />

        </div>

        {/* Placeholder for Charts */}

        <div className="mt-12 bg-white rounded-3xl shadow-lg p-10">

          <h2 className="text-3xl font-bold">

            📈 Analytics Charts

          </h2>

          <p className="mt-4 text-slate-500">

            Radar Chart, Line Chart, Bar Chart and Pie Chart will appear here in Part 3.

          </p>

        </div>

      </div>

    </main>

  );

}