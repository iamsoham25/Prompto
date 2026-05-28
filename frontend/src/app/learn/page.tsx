"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import API from "@/services/api";

export default function LearnPage() {

  const [lessons, setLessons] = useState([]);

  useEffect(() => {

    fetchLessons();

  }, []);

  const fetchLessons = async () => {

    try {

      const response = await API.get("/lessons");

      setLessons(response.data.lessons);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-12">
        Learn AI Engineering 🚀
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {lessons.map((lesson: any) => (

          <Link
            href={`/learn/${lesson.id}`}
            key={lesson.id}
            className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-blue-500 transition cursor-pointer"
           >

            <h2 className="text-2xl font-bold mb-4">
              {lesson.title}
            </h2>

            <p className="text-slate-400 mb-4">
              {lesson.description}
            </p>

            <span className="inline-block bg-blue-600 px-4 py-2 rounded-xl text-sm">
              {lesson.level}
            </span>

          </Link>

        ))}

      </div>

    </main>
  );
}