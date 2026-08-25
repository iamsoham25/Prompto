"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import HistoryCard from "@/components/history/HistoryCard";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const email = localStorage.getItem("userEmail");

      if (!email) {
        setHistory([]);
        return;
      }

      const res = await API.get(`/history/${email}`);

      console.log("FULL HISTORY RESPONSE:", res.data);
      console.log("HISTORY ITEMS:", res.data.history);
      console.log(
        "FIRST HISTORY ITEM:",
        JSON.stringify(res.data.history?.[0], null, 2)
      );

      if (res.data.success) {
        setHistory(res.data.history || []);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id: string) => {
    try {
      await API.delete(`/history/${id}`);
      fetchHistory();
    } catch (error) {
      console.error("Failed to delete history:", error);
    }
  };

  const averageScore =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) => sum + Number(item.overall_score || 0),
            0
          ) / history.length
        ).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

        <div className="mx-auto w-full max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Prompt Intelligence
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Review.
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Learn. Improve.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Review your previously analyzed prompts, track your scores,
                and identify opportunities to improve your prompt engineering.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:min-w-[430px]">
              <StatCard
                value={history.length}
                label="Analyzed"
              />

              <StatCard
                value={averageScore}
                label="Avg. Score"
              />

              <StatCard
                value={history.length > 0 ? "Active" : "—"}
                label="History"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History Content */}
      <section className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          {/* Section Header */}
          <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-xl">
                    📝
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                      Prompt History
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your previously analyzed prompts and evaluation results.
                    </p>
                  </div>
                </div>
              </div>

              {history.length > 0 && (
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                  {history.length}{" "}
                  {history.length === 1 ? "prompt" : "prompts"}
                </div>
              )}
            </div>
          </div>

          {/* History List */}
          <div className="p-4 sm:p-6 lg:p-8">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
                  <p className="text-sm font-medium text-slate-500">
                    Loading your prompt history...
                  </p>
                </div>
              </div>
            ) : history.length === 0 ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                    📜
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950">
                    No Prompt History
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Your analyzed prompts will appear here once you start
                    evaluating them.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {history.map((item) => (
                  <HistoryCard
                    key={item._id}
                    item={item}
                    onDelete={deleteHistory}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5">
      <div className="text-xl font-black text-slate-950 sm:text-2xl">
        {value}
      </div>

      <div className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
        {label}
      </div>
    </div>
  );
}