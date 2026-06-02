"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import API from "@/services/api";

export default function LearnPage() {

  const [lessons, setLessons] = useState([]);

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const [progress, setProgress] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);

  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {

  const email =
    localStorage.getItem("userEmail");

  fetchLessons();

  if (email) {

    fetchCompletedLessons(email);

    fetchProgress(email);

  }

}, []);

  const fetchLessons = async () => {

    try {

      const response = await API.get("/lessons");

      setLessons(response.data.lessons);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchCompletedLessons = async (
  email: string
) => {

  try {

    const response =
      await API.get(
        `/completed-lessons/${email}`
      );

    if (response.data.success) {

      setCompletedLessons(
        response.data.completed_lessons
      );

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchProgress = async (
  email: string
) => {

  try {

    const response =
      await API.get(
        `/lesson-progress/${email}`
      );

    if (response.data.success) {

      setProgress(
        response.data.progress
      );

      setCompletedCount(
        response.data.completed_lessons
      );

      setTotalLessons(
        response.data.total_lessons
      );

    }

  } catch (error) {

    console.log(error);

  }

};

  return (

    <main className="min-h-screen bg-[#F8FAFC] px-8 py-12">

      <h1 className="text-5xl font-bold text-slate-900 mb-12">
        Learn AI Engineering 🚀
      </h1>

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          shadow-md
          border
          border-slate-200
          mb-10
        "
      >

        <div className="flex justify-between mb-4">

          <h2 className="text-2xl font-bold text-slate-900">
            📚 Learning Progress
          </h2>

          <span className="font-semibold text-orange-500">
            {progress}%
          </span>

        </div>

        <div
          className="
            w-full
            h-4
            bg-slate-200
            rounded-full
            overflow-hidden
          "
        >

          <div
            className="
              h-full
              bg-gradient-to-r
              from-orange-400
              to-pink-500
              transition-all
            "
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="text-slate-600 mt-4">

          {completedCount} of {totalLessons}
          lessons completed

        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {lessons.map((lesson: any) => (

          <Link
            href={`/learn/${lesson.id}`}
            key={lesson.id}
            className={` bg-white rounded-3xl p-8 shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-2
            ${
              completedLessons.includes(
                lesson.id
              )
                ? "border-green-400 bg-green-50"
                : "border-slate-200"
            }
          `}
           >

            <h2
              className="
                text-2xl
                font-bold
                mb-4
                text-slate-900
                flex
                items-center
                gap-2
              "
            >

              {completedLessons.includes(
                lesson.id
              ) && "✅"}

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