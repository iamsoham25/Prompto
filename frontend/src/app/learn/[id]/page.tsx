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

  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [lesson, setLesson] = useState<any>(null);

  const [completed, setCompleted] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const [questionResults, setQuestionResults] = useState<{ [key: number]: boolean }>({});

  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [quizScore, setQuizScore] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);

  const [showXpPopup, setShowXpPopup] = useState(false);

  useEffect(() => {
    fetchLesson();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params.id]);

  const fetchLesson = async () => {

    try {

      const response = await API.get(
      `/lessons/${params.id}`
    );

    console.log("LESSON DATA:", response.data.lesson);
    
    setLesson(response.data.lesson);

    // Fetch all lessons
    const allLessons =
      await API.get("/lessons");

    const lessons =
      allLessons.data.lessons;

    // Find current lesson index
    const currentIndex =
      lessons.findIndex(
        (item: any) =>
          item.id === params.id
      );

    // Set next lesson
    if (
      currentIndex !== -1 &&
      currentIndex < lessons.length - 1
    ) {
      setNextLessonId(
        lessons[currentIndex + 1].id
      );
    }

    } catch (error) {
      console.error("Failed to fetch lesson:", error);
    }
  };

  if (!lesson) {

    return (

      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 text-white flex items-center justify-center text-3xl">
        Loading...
      </div>

    );
  }

  const wordCount = lesson?.content?.split(" ").length || 0;

  const readingTime = Math.max( 1, Math.ceil(wordCount / 200) );

  const quizzes: any[] = [];

  // Beginner Lessons
  if (lesson.quiz_question) {
    quizzes.push({
      question: lesson.quiz_question,
      options: lesson.quiz_options,
      answer: lesson.quiz_answer,
    });
  }

  // Intermediate / Advanced Lessons
  for (let i = 1; i <= 10; i++) {
    if (lesson[`quiz_question_${i}`]) {
      quizzes.push({
        question: lesson[`quiz_question_${i}`],
        options: lesson[`quiz_options_${i}`],
        answer: lesson[`quiz_answer_${i}`],
      });
    }
  }

  const allQuestionsCorrect =
    quizzes.length > 0 &&
    quizzes.every(
      (_, index) =>
        questionResults[index] === true
    );  

  const passedQuiz =
    quizSubmitted &&
    quizScore >=
    Math.ceil(
      quizzes.length * 0.7
    );


  const submitQuiz = () => {

    let score = 0;

    quizzes.forEach(
      (quiz, index) => {

        const selected =
          selectedAnswers[index];

        if (
          selected ===
          quiz.answer
        ) {
          score++;
        }

      }
    );

    setQuizScore(score);

    setQuizSubmitted(true);

  };

  const completeLesson = async () => {

    const email = localStorage.getItem("userEmail");

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

        setShowXpPopup(true);

        setTimeout(() => {

          setShowXpPopup(false);

        }, 2500);

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

  const goToNextLesson = async () => {

  try {

    const res = await API.get(
      `/next-lesson/${id}`
    );

    if (res.data.success) {

      router.push(
        `/learn/${res.data.next_lesson_id}`
      );

    }

  } catch (error) {

    console.log(error);

  }

};

  return (

    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">
      {
        showXpPopup && (

        <div
          className=" fixed top-24 right-10 z-50 bg-yellow-400 text-white font-bold text-2xl px-6 py-3 rounded-2xl shadow-xl animate-bounce "
        >
          +25 XP 🚀
        </div>

        )}
      
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

        <div className="mt-3">

          <span
            className=" bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium "
          >
            ⏱ {readingTime} min read
          </span>

        </div>

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

          {quizzes.map((quiz, index) => (

            <div
              key={index}
              className="mb-10 border rounded-xl p-6"
            >

              <p className="font-semibold mb-4">
                Q{index + 1}. {quiz.question}
              </p>

              <div className="space-y-3">

                {quiz.options?.map(
                  (option: string) => (
 
                    <label
                      key={option}
                      className="block"
                    >

                      <input
                        type="radio"
                        name={`quiz-${index}`}
                        value={option}
                        checked={
                          selectedAnswers[index] === option
                        }
                        onChange={(e) =>
                          setSelectedAnswers(prev => ({
                            ...prev,
                            [index]: e.target.value,
                          }))
                        }
                      />

                      <span className="ml-2">
                        {option}
                      </span>
          
                    </label>

                  )

                
                )}

              </div>

            </div>

          ))}

          <div className="text-center mt-8">

            <button
              onClick={submitQuiz}
              className=" bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold "
            >
              Submit Quiz
            </button>

          </div>

        {quizSubmitted && (

          <div
            className=" mt-6 text-center bg-slate-100 p-4 rounded-xl "
          >

            <p
              className={
                passedQuiz
                  ? "text-green-600"
                  : "text-red-600"
              }
            >

              {passedQuiz
                ? "✅ Passed"
                : "❌ Failed"}

            </p>

          </div>

        )}

          </div>

            {allQuestionsCorrect && (

              <div
                className=" mt-6 bg-green-100 text-green-700 p-4 rounded-xl text-center font-semibold "
              >
                ✅ All Questions Completed Successfully!
              </div>

            )}

            {showSuccess && (

              <div
                className=" bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-xl text-center w-full "
              >

                <div className="text-5xl mb-4">
                  🎉
                </div>

                <h2 className="text-4xl font-bold">
                  Lesson Completed
                </h2>

                <div
                  className=" mt-6 bg-white text-slate-800 rounded-2xl p-6 "
                >

                  <div className="grid grid-cols-3 gap-4">

                    <div>
                      <p className="text-sm text-slate-500">
                        Score
                      </p>

                      <p className="text-2xl font-bold">
                        {quizScore}/{quizzes.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Accuracy
                      </p>

                      <p className="text-2xl font-bold">
                        {Math.round(
                          (quizScore / quizzes.length) * 100
                        )}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        XP Earned
                      </p>

                      <p className="text-2xl font-bold text-yellow-500">
                        +25
                      </p>
                    </div>

                  </div>

                </div>

                <p className="mt-6 text-lg">
                  🚀 Complete all lessons in this level
                  to unlock the next stage.
                </p>
            
                <div
                  className=" flex justify-center gap-4 mt-8 "
                >

                  <button
                    onClick={goToNextLesson}
                    className="
          bg-white
          text-green-600
          px-6
          py-3
          rounded-xl
          font-semibold
        "
                  >
                    Next Lesson →
                  </button>

                  <button
                    onClick={() => router.push("/learn")}
                    className="
          bg-green-700
          px-6
          py-3
          rounded-xl
          font-semibold
        "
                  >
                    Back to Learn
                  </button>

                </div>

              </div>

            )}

            {!showSuccess && (

              <div className="flex justify-center mt-6">

                <button
                  onClick={completeLesson}
                  disabled={submitting || !passedQuiz}
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
        disabled:bg-gray-300
        disabled:text-gray-500
        disabled:cursor-not-allowed
      "
                >

                  {submitting
                    ? "Completing..."
                    : "Complete Lesson (+25 XP)"}

                </button>

              </div>

            )}

        </div>

      </div>

    </main>

  );

}