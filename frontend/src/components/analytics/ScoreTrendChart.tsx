"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function ScoreTrendChart() {

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {

    loadTrend();

  }, []);

  const loadTrend = async () => {

    try {

      const email = localStorage.getItem("userEmail");

      const res = await API.get(
        `/dashboard/prompt-trend/${email}`
      );

      if (res.data.success) {

        setChartData(res.data.trend);

      }

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        📈 Score Trend

      </h2>

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="prompt" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#8B5CF6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}