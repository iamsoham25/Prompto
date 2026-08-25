"use client";

import { useCallback, useEffect, useState } from "react";

import API from "@/services/api";
import HistoryCard from "@/components/history/HistoryCard";

type HistoryItem = {
  _id: string;
  [key: string]: any;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const email = localStorage.getItem("userEmail");

      if (!email) {
        setHistory([]);
        setError("User session not found. Please login again.");
        return;
      }

      const res = await API.get(
        `/history/${encodeURIComponent(email)}`
      );

      console.log("History API response:", res.data);

      if (res.data?.success) {
        setHistory(
          Array.isArray(res.data.history)
            ? res.data.history
            : []
        );
      } else {
        setHistory([]);
        setError(
          res.data?.message ||
            "Unable to load prompt history."
        );
      }
    } catch (err: any) {
      console.error("History fetch error:", err);

      setHistory([]);

      setError(
        err?.response?.data?.message ||
          "Unable to load prompt history."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const deleteHistory = async (id: string) => {
    try {
      await API.delete(`/history/${id}`);

      setHistory((current) =>
        current.filter((item) => item._id !== id)
      );
    } catch (err: any) {
      console.error("Delete history error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to delete history."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:px-10
        "
      >

        {/* ============================================== */}
        {/* PAGE HEADER */}
        {/* ============================================== */}

        <header className="mb-8 sm:mb-10">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-orange-50
                text-3xl
              "
            >
              📜
            </div>

            <div>

              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-950
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Prompt History
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  sm:text-base
                "
              >
                View and manage your previously analyzed prompts.
              </p>

            </div>

          </div>

        </header>


        {/* ============================================== */}
        {/* ERROR */}
        {/* ============================================== */}

        {error && (
          <div
            className="
              mb-6
              flex
              flex-col
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-red-700
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="text-sm font-medium">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchHistory}
              className="
                rounded-xl
                bg-red-500
                px-5
                py-2
                text-sm
                font-semibold
                text-white
                hover:bg-red-600
              "
            >
              Retry
            </button>
          </div>
        )}


        {/* ============================================== */}
        {/* LOADING */}
        {/* ============================================== */}

        {loading ? (

          <div className="space-y-6">

            {[1, 2].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  sm:p-8
                "
              >

                <div className="flex justify-between">
                  <div className="h-8 w-32 rounded-lg bg-slate-200" />
                  <div className="h-12 w-24 rounded-xl bg-slate-200" />
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-5 w-full rounded bg-slate-200" />
                  <div className="h-5 w-11/12 rounded bg-slate-200" />
                  <div className="h-5 w-9/12 rounded bg-slate-200" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                    <div
                      key={score}
                      className="h-20 rounded-2xl bg-slate-100"
                    />
                  ))}
                </div>

              </div>
            ))}

          </div>

        ) : history.length === 0 ? (

          /* ============================================ */
          /* EMPTY STATE */
          /* ============================================ */

          <div
            className="
              rounded-[28px]
              border
              border-slate-200
              bg-white
              px-5
              py-20
              text-center
              shadow-sm
              sm:px-10
            "
          >

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
              📜
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-950">
              No Prompt History
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Your analyzed prompts will appear here once you
              start using the prompt evaluator.
            </p>

          </div>

        ) : (

          /* ============================================ */
          /* HISTORY */
          /* ============================================ */

          <div className="space-y-6">

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

    </main>
  );
}