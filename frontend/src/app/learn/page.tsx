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

    <main className="min-h-screen bg-[#F8FAFC] px-8 py-12">

      <h1 className="text-5xl font-bold text-slate-900 mb-12">
        Learn AI Engineering 🚀
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {lessons.map((lesson: any) => (

          <Link
            href={`/learn/${lesson.id}`}
            key={lesson.id}
            className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
           >

            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              {lesson.title}
            </h2>

            <p className="text-slate-600 mb-5">
              {lesson.description}
            </p>

            <span className=" inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold ">
              {lesson.level}
            </span>

          </Link>

        ))}

      </div>

    </main>
  );
}