"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import HistoryCard from "@/components/history/HistoryCard";

export default function HistoryPage() {

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    const email = localStorage.getItem("userEmail");

    const res = await API.get(`/history/${email}`);

    if (res.data.success) {

      setHistory(res.data.history);

    }

  };

  const deleteHistory = async (id: string) => {

    await API.delete(`/history/${id}`);

    fetchHistory();

  };

  return (

    <main className="min-h-screen bg-slate-50 p-10">

      <h1 className="text-5xl font-bold mb-10">

        📜 Prompt History

      </h1>

      <div className="space-y-8">

        {

          history.length === 0 ? (

            <div className="bg-white rounded-3xl p-20 text-center shadow-lg">

              <h2 className="text-3xl font-bold">

                No Prompt History

              </h2>

            </div>

          ) : (

            history.map((item) => (

              <HistoryCard

                key={item._id}

                item={item}

                onDelete={deleteHistory}

              />

            ))

          )

        }

      </div>

    </main>

  );

}