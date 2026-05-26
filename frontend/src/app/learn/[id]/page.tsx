"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import API from "@/services/api";

export default function LessonPage() {

  const params = useParams();

  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {

    fetchLesson();

  }, []);

  const fetchLesson = async () => {

    try {

      const response = await API.get(
        `/lessons/${params.id}`
      );

      setLesson(response.data.lesson);

    } catch (error) {

      console.log(error);

    }
  };

  if (!lesson) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">
        Loading Lesson...
      </div>

    );
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-5xl mx-auto">

        <span className="bg-blue-600 px-4 py-2 rounded-xl text-sm">
          {lesson.level}
        </span>

        <h1 className="text-6xl font-bold mt-6 mb-6">
          {lesson.title}
        </h1>

        <p className="text-slate-400 text-xl mb-10">
          {lesson.description}
        </p>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 leading-relaxed text-lg whitespace-pre-wrap">
          {lesson.content}
        </div>

      </div>

    </main>
  );
}