"use client";

import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useParams, useRouter } from "next/navigation";

import API from "@/services/api";

export default function LessonPage() {

  const params = useParams();

  const router = useRouter();

  const [lesson, setLesson] = useState<any>(null);

  const [completed, setCompleted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

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

      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 text-white flex items-center justify-center text-3xl">
        Loading...
      </div>

    );
  }

  const completeLesson = async () => {

    const email =
      localStorage.getItem("userEmail");

    if (!email) {

      alert("Please login first");

      return;
    }

    try {
 
      setSubmitting(true);

      const response = await API.post(
        "/complete-lesson",
        {
          user_email: email,
          lesson_id: lesson.id,
          xp_earned: 25
        }
      );

      if (response.data.success) {

        setCompleted(true);

        setShowSuccess(true);

      } else {

        alert(response.data.message);

        setCompleted(true);

      }

    } catch (error) {

      console.log(error);

      alert("Failed to complete lesson");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">

      <div className="max-w-3xl mx-auto">

        <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm">
          {lesson.level}
        </span>

        <h1 className="text-4xl font-bold mt-6 mb-6">
          {lesson.title}
        </h1>

        <p className="text-slate-600 text-xl mb-12">
          {lesson.description}
        </p>

        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-lg">

          <article
            className="
              prose
              prose-lg
              max-w-none

              prose-h1:text-slate-900
              prose-h1:font-bold

              prose-h2:text-slate-900
              prose-h2:font-bold

              prose-p:text-slate-700
              prose-p:leading-8

              prose-li:text-slate-700

              prose-strong:text-slate-900

              prose-code:text-orange-600
            "
          >

            <div className="whitespace-pre-wrap">
              {lesson.content}
            </div>

          </article>

          <div className="mt-10 flex justify-center">

  {!completed ? (

    <button
      onClick={completeLesson}
      disabled={submitting}
      className="
        bg-orange-500
        hover:bg-orange-600
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        shadow-lg
        transition
      "
    >
      {submitting
        ? "Completing..."
        : "Complete Lesson (+25 XP)"}
    </button>

  ) : (

    <div
      className="
        flex
        items-center
        gap-4
        bg-green-50
        border
        border-green-200
        px-6
        py-4
        rounded-2xl
      "
    >
      <span className="text-3xl">
        🏆
      </span>

      <div>
        <p className="font-semibold text-green-700">
          Lesson Completed
        </p>

        <p className="text-sm text-green-600">
          +25 XP earned
        </p>
      </div>
    </div>

  )}

</div>

        </div>

      </div>

    </main>
  );
}