"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Confetti from "react-confetti";

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

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);


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

      console.log(lesson);
      console.log(lesson.quiz_options);
      console.log(typeof lesson.quiz_options);
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

        toast.success(
          "🎉 Lesson Completed! +25 XP"
        );
      
        setShowConfetti(true);

        setTimeout(() => {

          setShowConfetti(false);

        }, 5000);

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

  const checkAnswer = () => {

    console.log(
      "Selected:",
      JSON.stringify(selectedAnswer)
    );

    console.log(
      "Answer:",
      JSON.stringify(lesson.quiz_answer)
    );

    if (
      selectedAnswer.trim() ===
      lesson.quiz_answer.trim()
    ) {

      setQuizResult("correct");

      setTimeout(() => {

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });

      }, 300);

    } else {

      setQuizResult("wrong");

    }

  };

  return (

    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

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

          <div className="mt-12">

            <h2 className="text-2xl font-bold mb-6">
              🧠 Quick Quiz
            </h2>

            <p className="mb-6 font-medium">
              {lesson.quiz_question}
            </p>

            <div className="space-y-4">

              {Array.isArray(lesson.quiz_options)
                ? lesson.quiz_options.map(
                    (option: string) => (

                      <label
                        key={option}
                        className="block p-4 border rounded-xl"
                      >
                        <input
                          type="radio"
                          value={option}
                          name="quiz"
                          checked={selectedAnswer === option}
                          onChange={(e) =>
                            setSelectedAnswer(e.target.value)
                          }
                        />

                        <span className="ml-2">
                          {option}
                        </span>

                      </label>

                    )
                  )
                : null}

            </div>

            <button
              onClick={checkAnswer}
              className=" mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold "
            >
              Submit Answer
            </button>

            {quizResult === "correct" && (

              <div
                className="
                  mt-4
                  bg-green-100
                  text-green-700
                  p-4
                  rounded-xl
                "
              >
                ✅ Correct Answer!
              </div>

            )}

            {quizResult === "wrong" && (

              <div
                className=" mt-4 bg-red-100 text-red-700 p-4 rounded-xl"
              >
                ❌ Wrong Answer 

                <br />

                Correct Answer:
                {" "}
                {lesson.quiz_answer}
              </div>

            )}

          </div>

          {quizResult !== "correct" && (

            <div
              className=" mt-6 text-center bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl "
            >
              Complete the quiz correctly to unlock
              lesson completion.
            </div>

          )}

          <div className="mt-10 flex justify-center">

            {!completed ? (

              <button
                onClick={completeLesson}
                disabled={
                  submitting ||
                  quizResult !== "correct"}
                className={`
                  px-8 py-4 rounded-2xl font-semibold shadow-lg transition

                  ${
                    quizResult === "correct"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                {submitting
                  ? "Completing..."
                  : "Complete Lesson (+25 XP)"}
              </button>

            ) : (
          
              <div
                className=" bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-3xl p-8 shadow-xl text-center w-full "
              >
                <div className="text-5xl mb-3">
                  🎉
                </div>

                <h2 className="text-2xl font-bold">
                  Lesson Completed!
                </h2>

                <p className="mt-2">
                  You earned +25 XP
                </p>
              </div>
          
            )}

          </div>

        </div>

      </div>

    </main>
  );
}