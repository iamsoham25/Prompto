"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import API from "@/services/api";

export default function LearnPage() {

  const [lessons, setLessons] = useState([]);

  const beginnerLessons = lessons.filter(
  (lesson: any) => lesson.level === "Beginner");

  const intermediateLessons = lessons.filter(
  (lesson: any) => lesson.level === "Intermediate");

  const advancedLessons = lessons.filter(
  (lesson: any) => lesson.level === "Advanced");

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const [progress, setProgress] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);

  const [intermediateUnlocked, setIntermediateUnlocked] = useState(false);

  const [advancedUnlocked, setAdvancedUnlocked] = useState(false);

  const [totalLessons, setTotalLessons] = useState(0);

  const [showUnlock, setShowUnlock] = useState(false);

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

      setLessons(
        response.data.lessons.sort(
        (a: any, b: any) =>
        a.order - b.order
        )
      );

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

    console.log(response.data);

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

      setIntermediateUnlocked(
        response.data.intermediate_unlocked
      );

      setAdvancedUnlocked(
        response.data.advanced_unlocked
      );

      if (
        response.data.intermediate_unlocked ||
        response.data.advanced_unlocked
      ) {

        setShowUnlock(true);

        setTimeout(() => {

          setShowUnlock(false);

        }, 4000);

      }

    }

  } catch (error) {

    console.log(error);

  }

};

  const getLessonStatus = (
    lesson: any,
    index: number
  ) => {

    if (
      completedLessons.includes(
        lesson.id
      )
    ) {
      return "completed";
    }

    if (
      index === completedLessons.length
    ) {
      return "current";
    }

    return "locked";
  };

  const renderLessonCard = (lesson: any) => (

    <Link
      href={`/learn/${lesson.id}`}
      key={lesson.id}
      className={` bg-white rounded-3xl p-8 min-h-[320px] shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between

        ${
          completedLessons.includes(lesson.id)
            ? "border-green-400 bg-green-50"
            : "border-slate-200"
        }
      `}
    >

      <div className="flex-1">

        <h2 className="text-2xl font-bold mb-4 text-slate-900 line-clamp-2">

          {completedLessons.includes(lesson.id) && "✅ "}

          {lesson.title}

        </h2>

        <p className="text-slate-600 line-clamp-3">

          {lesson.description.length > 80
            ? lesson.description.slice(0, 80) + "..."
            : lesson.description}

        </p>

      </div>

      <div>

        <span
          className=" inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold "
        >
          {lesson.level}
        </span>

        <p className="mt-4 text-orange-500 font-semibold">
          Read Lesson →
        </p>

      </div>

    </Link>

  );

  return (

    <main className="min-h-screen bg-[#F8FAFC] px-8 py-12">

      {
        showUnlock && (

        <div
          className=" fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-10 py-5 rounded-2xl shadow-xl z-50 animate-pulse "
        >
          🎉 New Level Unlocked!
        </div>

        )}
      
      <h1 className="text-5xl font-bold text-slate-900 mb-12">
        Learn AI Engineering 🚀
      </h1>

      <div
        className=" bg-white rounded-3xl p-8 shadow-md border border-slate-200 mb-10 "
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
          className=" w-full h-4 bg-slate-200 rounded-full overflow-hidden "
        >

          <div
            className=" h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all "
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

      {/* Beginner */}

      <h2 className="text-4xl font-bold mt-12 mb-8">
        📘 Beginner Level
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {beginnerLessons.map(renderLessonCard)}

      </div>

      {/* Intermediate */}

      <h2 className="text-4xl font-bold mt-16 mb-8">
        📗 Intermediate Level
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          intermediateUnlocked ? (
        
            intermediateLessons.map(
              renderLessonCard
            )

          ) : (

            <div
              className="col-span-3 bg-white rounded-3xl p-16 text-center shadow-md border border-slate-200"
            >

              <h3 className="text-4xl font-bold mb-4 text-slate-900">       
                🔒 Intermediate Locked
              </h3>

              <p className="text-slate-600">        
                Complete all Beginner lessons
                to unlock Intermediate.
              </p>

            </div>

          )
        }

      </div>

      {/* Advanced */}

      <h2 className="text-4xl font-bold mt-16 mb-8">
        📕 Advanced Level
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          advancedUnlocked ? (

            advancedLessons.map(
              renderLessonCard
            )

          ) : (

            <div
              className="col-span-3 bg-white rounded-3xl p-16 text-center shadow-md border border-slate-200"
            >

              <h3 className="text-4xl font-bold mb-4 text-slate-900">
                🔒 Advanced Locked
              </h3>

              <p className="text-slate-600">
                Complete Intermediate Level
                to unlock Advanced.
              </p>

            </div>

          )
        }

      </div>

    </main>
  );
}