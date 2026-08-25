"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params.id;

  const [lesson, setLesson] = useState<any>(null);
  const [allLessons, setAllLessons] = useState<any[]>([]);

  const [completed, setCompleted] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const [questionResults, setQuestionResults] = useState<{
    [key: number]: boolean;
  }>({});

  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [nextLessonId, setNextLessonId] = useState<string | null>(null);

  const [readingProgress, setReadingProgress] = useState(0);

  /* =========================================================
     FETCH LESSON
  ========================================================= */

  useEffect(() => {
    fetchLesson();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  /* =========================================================
     READING PROGRESS
  ========================================================= */

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setReadingProgress(0);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, (scrollTop / documentHeight) * 100)
      );

      setReadingProgress(progress);
    };

    updateReadingProgress();

    window.addEventListener("scroll", updateReadingProgress);

    return () =>
      window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  /* =========================================================
     FETCH DATA
  ========================================================= */

  const fetchLesson = async () => {
    try {
      const response = await API.get(`/lessons/${id}`);

      const currentLesson = response.data.lesson;

      console.log("LESSON DATA:", currentLesson);

      setLesson(currentLesson);

      const allLessonsResponse = await API.get("/lessons");

      const lessons = allLessonsResponse.data.lessons || [];

      setAllLessons(lessons);

      const currentIndex = lessons.findIndex(
        (item: any) => item.id === id
      );

      if (
        currentIndex !== -1 &&
        currentIndex < lessons.length - 1
      ) {
        setNextLessonId(lessons[currentIndex + 1].id);
      }
    } catch (error) {
      console.error("Failed to fetch lesson:", error);
    }
  };

  /* =========================================================
     QUIZ DATA
  ========================================================= */

  const quizzes = useMemo(() => {
    if (!lesson) return [];

    const quizList: any[] = [];

    if (lesson.quiz_question) {
      quizList.push({
        question: lesson.quiz_question,
        options: lesson.quiz_options || [],
        answer: lesson.quiz_answer,
      });
    }

    for (let i = 1; i <= 10; i++) {
      if (lesson[`quiz_question_${i}`]) {
        quizList.push({
          question: lesson[`quiz_question_${i}`],
          options: lesson[`quiz_options_${i}`] || [],
          answer: lesson[`quiz_answer_${i}`],
        });
      }
    }

    return quizList;
  }, [lesson]);

  /* =========================================================
     READING TIME
  ========================================================= */

  const wordCount =
    lesson?.content?.split(/\s+/).filter(Boolean).length || 0;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  /* =========================================================
     QUIZ STATUS
  ========================================================= */

  const passedQuiz =
    quizSubmitted &&
    quizzes.length > 0 &&
    quizScore >= Math.ceil(quizzes.length * 0.7);

  const allQuestionsCorrect =
    quizzes.length > 0 &&
    quizzes.every(
      (_: any, index: number) =>
        questionResults[index] === true
    );

  /* =========================================================
     LEVEL PROGRESS
  ========================================================= */

  const currentLevelLessons = useMemo(() => {
    if (!lesson || !allLessons.length) return [];

    return allLessons.filter(
      (item: any) => item.level === lesson.level
    );
  }, [lesson, allLessons]);

  const currentLevelIndex = useMemo(() => {
    if (!currentLevelLessons.length) return -1;

    return currentLevelLessons.findIndex(
      (item: any) => item.id === id
    );
  }, [currentLevelLessons, id]);

  const currentLessonNumber =
    currentLevelIndex >= 0
      ? currentLevelIndex + 1
      : 1;

  const levelProgress =
    currentLevelLessons.length > 0
      ? Math.round(
          (currentLessonNumber /
            currentLevelLessons.length) *
            100
        )
      : 0;

  /* =========================================================
     LEVEL STYLES
  ========================================================= */

  const levelStyles = {
    Beginner: {
      badge: "bg-emerald-50 text-emerald-600",
      icon: "📘",
      accent: "bg-emerald-500",
      text: "text-emerald-600",
      soft: "bg-emerald-50",
      border: "border-emerald-100",
    },

    Intermediate: {
      badge: "bg-orange-50 text-orange-600",
      icon: "📗",
      accent: "bg-orange-500",
      text: "text-orange-600",
      soft: "bg-orange-50",
      border: "border-orange-100",
    },

    Advanced: {
      badge: "bg-purple-50 text-purple-600",
      icon: "📕",
      accent: "bg-purple-500",
      text: "text-purple-600",
      soft: "bg-purple-50",
      border: "border-purple-100",
    },
  };

  const currentLevel =
    levelStyles[
      lesson?.level as keyof typeof levelStyles
    ] || levelStyles.Advanced;

  /* =========================================================
     QUIZ SUBMIT
  ========================================================= */

  const submitQuiz = () => {
    let score = 0;

    const results: {
      [key: number]: boolean;
    } = {};

    quizzes.forEach(
      (quiz: any, index: number) => {
        const selected =
          selectedAnswers[index];

        const correct =
          selected === quiz.answer;

        results[index] = correct;

        if (correct) {
          score++;
        }
      }
    );

    setQuestionResults(results);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (
      quizzes.length > 0 &&
      score >= Math.ceil(quizzes.length * 0.7)
    ) {
      toast.success(
        `Quiz passed! ${score}/${quizzes.length} correct`
      );
    } else {
      toast.error(
        `Quiz score: ${score}/${quizzes.length}. Try again.`
      );
    }
  };

  /* =========================================================
     COMPLETE LESSON
  ========================================================= */

  const completeLesson = async () => {
    const email =
      localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login first");
      return;
    }

    if (!passedQuiz) {
      toast.error(
        "Please pass the quiz before completing the lesson."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await API.post(
        "/complete-lesson",
        {
          user_email: email,
          lesson_id: lesson.id,
          xp_earned: 25,
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
      console.error(error);
      alert("Failed to complete lesson");
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     NEXT LESSON
  ========================================================= */

  const goToNextLesson = async () => {
    try {
      const res = await API.get(
        `/next-lesson/${id}`
      );

      if (res.data.success) {
        router.push(
          `/learn/${res.data.next_lesson_id}`
        );
        return;
      }

      if (nextLessonId) {
        router.push(
          `/learn/${nextLessonId}`
        );
        return;
      }

      router.push("/learn");
    } catch (error) {
      console.error(error);

      if (nextLessonId) {
        router.push(
          `/learn/${nextLessonId}`
        );
      } else {
        router.push("/learn");
      }
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (!lesson) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin mx-auto" />

          <p className="mt-5 text-slate-500 font-medium">
            Loading lesson...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          READING PROGRESS BAR
      ===================================================== */}

      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 transition-all duration-150"
          style={{
            width: `${readingProgress}%`,
          }}
        />
      </div>

      {/* =====================================================
          XP POPUP
      ===================================================== */}

      {showConfetti && (
        <Confetti
          width={
            typeof window !== "undefined"
              ? window.innerWidth
              : 0
          }
          height={
            typeof window !== "undefined"
              ? window.innerHeight
              : 0
          }
          recycle={false}
        />
      )}

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="w-full max-w-[1400px] mx-auto px-5 lg:px-8 xl:px-10 py-10">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <button
            onClick={() => router.push("/learn")}
            className="hover:text-orange-500 transition"
          >
            Learn
          </button>

          <span>/</span>

          <span>{lesson.level}</span>

          <span>/</span>

          <span className="text-slate-600 font-medium">
            Lesson {String(currentLessonNumber).padStart(2, "0")}
          </span>
        </div>

        {/* ===================================================
            TWO COLUMN LAYOUT
        =================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="min-w-0">

            {/* ===============================================
                LESSON HEADER
            =============================================== */}

            <section className="bg-white border border-slate-200 rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-7 md:p-10">

              {/* Top Meta */}

              <div className="flex flex-wrap items-center justify-between gap-4">

                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${currentLevel.badge}`}
                >
                  🚀 {lesson.level}
                </span>

                <div className="flex flex-wrap gap-2">

                  <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-sm font-medium text-slate-600">
                    ⏱ {readingTime} min
                  </span>

                  <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-sm font-medium text-slate-600">
                    🧠 {quizzes.length} Quiz
                  </span>

                  <span className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-xl text-sm font-bold text-yellow-600">
                    ⭐ +25 XP
                  </span>

                </div>

              </div>

              {/* Title */}

              <h1 className="mt-8 text-4xl md:text-5xl font-extrabold tracking-[-0.035em] leading-[1.08] text-slate-950">
                {lesson.title}
              </h1>

              {/* Description */}

              <p className="mt-6 text-lg md:text-xl leading-8 text-slate-600">
                {lesson.description}
              </p>

              {/* Stats */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-9">

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500">
                    Difficulty
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {lesson.level}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500">
                    Reading Time
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {readingTime} min
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500">
                    Questions
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {quizzes.length}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-500">
                    Reward
                  </p>

                  <p className="mt-1 text-lg font-bold text-yellow-600">
                    +25 XP
                  </p>
                </div>

              </div>
            </section>

            {/* ===============================================
                LESSON CONTENT
            =============================================== */}

            <section className="mt-7 bg-white border border-slate-200 rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.05)] p-7 md:p-10">

              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">

                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg">
                  📖
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    Lesson Content
                  </h2>

                  <p className="text-sm text-slate-500 mt-0.5">
                    Learn the concept step by step
                  </p>
                </div>

              </div>

              <article
                className="
                  prose
                  prose-lg
                  max-w-none
                  mt-8

                  prose-headings:text-slate-950
                  prose-headings:font-extrabold
                  prose-headings:tracking-tight

                  prose-h1:text-3xl
                  prose-h2:text-2xl
                  prose-h3:text-xl

                  prose-p:text-slate-600
                  prose-p:leading-8

                  prose-li:text-slate-600
                  prose-li:leading-8

                  prose-strong:text-slate-900

                  prose-a:text-orange-600

                  prose-blockquote:border-orange-400
                  prose-blockquote:text-slate-600

                  prose-table:border
                  prose-table:border-slate-200

                  prose-th:bg-slate-50
                  prose-th:text-slate-900

                  prose-td:text-slate-600
                "
              >

                <ReactMarkdown
                  components={{
                    code({
                      inline,
                      className,
                      children,
                      ...props
                    }: any) {
                      const match =
                        /language-(\w+)/.exec(
                          className || ""
                        );

                      if (!inline && match) {
                        return (
                          <div className="relative my-7 overflow-hidden rounded-2xl">

                            <button
                              type="button"
                              className="absolute right-3 top-3 z-10 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  String(children)
                                )
                              }
                            >
                              Copy
                            </button>

                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                padding: "24px",
                                borderRadius: "16px",
                                fontSize: "14px",
                                lineHeight: "1.7",
                              }}
                            >
                              {String(children).replace(
                                /\n$/,
                                ""
                              )}
                            </SyntaxHighlighter>

                          </div>
                        );
                      }

                      return (
                        <code
                          className={`${className || ""} bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },

                    hr() {
                      return (
                        <hr className="my-8 border-slate-200" />
                      );
                    },

                    table({
                      children,
                    }: any) {
                      return (
                        <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200">
                          <table className="min-w-full divide-y divide-slate-200">
                            {children}
                          </table>
                        </div>
                      );
                    },
                  }}
                >
                  {lesson.content}
                </ReactMarkdown>

              </article>

            </section>

            {/* ===============================================
                QUICK QUIZ
            =============================================== */}

            <section className="mt-7 bg-white border border-slate-200 rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.05)] p-7 md:p-10">

              <div className="flex items-center gap-3 mb-7">

                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                  🧠
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    Quick Quiz
                  </h2>

                  <p className="text-sm text-slate-500 mt-0.5">
                    Check your understanding
                  </p>
                </div>

              </div>

              {/* Knowledge Check Header */}

              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-8 text-white">

                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full" />

                <div className="relative">

                  <h2 className="text-3xl md:text-4xl font-extrabold">
                    🧠 Knowledge Check
                  </h2>

                  <p className="mt-3 text-white/85">
                    Test your understanding before unlocking the next lesson.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">

                    <div className="bg-white/15 border border-white/10 rounded-2xl p-4">
                      <p className="text-xs text-white/70">
                        Questions
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {quizzes.length}
                      </p>
                    </div>

                    <div className="bg-white/15 border border-white/10 rounded-2xl p-4">
                      <p className="text-xs text-white/70">
                        Passing Score
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        70%
                      </p>
                    </div>

                    <div className="bg-white/15 border border-white/10 rounded-2xl p-4">
                      <p className="text-xs text-white/70">
                        Estimated Time
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        2 min
                      </p>
                    </div>

                    <div className="bg-white/15 border border-white/10 rounded-2xl p-4">
                      <p className="text-xs text-white/70">
                        Reward
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        ⭐ +25
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* Questions */}

              <div className="mt-8 space-y-5">

                {quizzes.map(
                  (quiz: any, index: number) => {

                    const isCorrect =
                      quizSubmitted &&
                      questionResults[index];

                    const isWrong =
                      quizSubmitted &&
                      questionResults[index] === false;

                    return (
                      <div
                        key={index}
                        className={`
                          rounded-2xl
                          border
                          p-6
                          transition
                          ${
                            isCorrect
                              ? "border-emerald-200 bg-emerald-50/40"
                              : isWrong
                              ? "border-red-200 bg-red-50/30"
                              : "border-slate-200 bg-white"
                          }
                        `}
                      >

                        <p className="font-bold text-slate-900 leading-7">
                          Q{index + 1}. {quiz.question}
                        </p>

                        <div className="mt-5 space-y-3">

                          {quiz.options?.map(
                            (option: string) => {

                              const selected =
                                selectedAnswers[index] ===
                                option;

                              return (
                                <label
                                  key={option}
                                  className={`
                                    flex
                                    items-start
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                    cursor-pointer
                                    transition
                                    ${
                                      selected
                                        ? "border-orange-400 bg-orange-50"
                                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                    }
                                  `}
                                >

                                  <input
                                    type="radio"
                                    name={`quiz-${index}`}
                                    value={option}
                                    checked={selected}
                                    disabled={quizSubmitted}
                                    onChange={(e) =>
                                      setSelectedAnswers(
                                        (prev) => ({
                                          ...prev,
                                          [index]:
                                            e.target.value,
                                        })
                                      )
                                    }
                                    className="mt-1 accent-orange-500"
                                  />

                                  <span className="text-slate-700 leading-6">
                                    {option}
                                  </span>

                                </label>
                              );
                            }
                          )}

                        </div>

                        {quizSubmitted && (
                          <div className="mt-4 text-sm font-semibold">
                            {isCorrect ? (
                              <span className="text-emerald-600">
                                ✓ Correct answer
                              </span>
                            ) : (
                              <span className="text-red-500">
                                ✕ Incorrect answer
                              </span>
                            )}
                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

              {/* Submit */}

              <div className="flex justify-center mt-8">

                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={quizzes.length === 0}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-9 py-3.5 rounded-xl shadow-lg shadow-orange-200 transition hover:-translate-y-0.5"
                >
                  {quizSubmitted
                    ? "Retake Quiz"
                    : "Submit Quiz"}
                </button>

              </div>

              {/* Result */}

              {quizSubmitted && (
                <div
                  className={`
                    mt-6
                    rounded-2xl
                    px-5
                    py-4
                    text-center
                    font-semibold
                    ${
                      passedQuiz
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-100"
                    }
                  `}
                >
                  {passedQuiz
                    ? `✅ Passed — ${quizScore}/${quizzes.length} correct`
                    : `❌ Failed — ${quizScore}/${quizzes.length} correct. You need at least 70%.`}
                </div>
              )}

            </section>

            {/* ===============================================
                COMPLETE LESSON
            =============================================== */}

            {!showSuccess && (
              <div className="flex justify-center mt-8 mb-10">

                <button
                  onClick={completeLesson}
                  disabled={
                    submitting ||
                    !passedQuiz ||
                    completed
                  }
                  className="
                    min-w-[250px]
                    bg-gradient-to-r
                    from-orange-500
                    to-pink-500
                    hover:from-orange-600
                    hover:to-pink-600
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    font-bold
                    shadow-lg
                    shadow-orange-200
                    transition
                    hover:-translate-y-0.5
                    disabled:bg-slate-200
                    disabled:from-slate-200
                    disabled:to-slate-200
                    disabled:text-slate-400
                    disabled:shadow-none
                    disabled:cursor-not-allowed
                  "
                >
                  {submitting
                    ? "Completing..."
                    : "Complete Lesson (+25 XP)"}
                </button>

              </div>
            )}

            {/* ===============================================
                SUCCESS
            =============================================== */}

            {showSuccess && (
              <section className="mt-8 mb-10 overflow-hidden rounded-[30px] bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 border border-emerald-200 shadow-[0_15px_50px_rgba(16,185,129,0.12)]">

                <div className="p-7 md:p-10">

                  <div className="text-center">

                    <div className="text-5xl">
                      🎉
                    </div>

                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-emerald-800">
                      Congratulations!
                    </h2>

                    <p className="mt-3 text-emerald-700">
                      You successfully completed
                    </p>

                    <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-emerald-900">
                      {lesson.title}
                    </h3>

                  </div>

                  {/* Results */}

                  <div className="mt-8 bg-white rounded-2xl border border-emerald-100 p-6">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

                      <div>
                        <p className="text-sm text-slate-500">
                          🏆 Score
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-slate-900">
                          {quizScore}/{quizzes.length}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          📈 Accuracy
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-slate-900">
                          {quizzes.length
                            ? Math.round(
                                (quizScore /
                                  quizzes.length) *
                                  100
                              )
                            : 0}
                          %
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          ⭐ XP Earned
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-yellow-500">
                          +25
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Progress message */}

                  <div className="mt-6 rounded-2xl bg-emerald-100/70 p-6 text-center">

                    <h3 className="text-xl font-extrabold text-emerald-800">
                      🚀 Great Progress!
                    </h3>

                    <p className="mt-2 text-emerald-700">
                      You are one lesson closer to becoming an{" "}
                      <strong>
                        Expert Prompt Engineer.
                      </strong>
                    </p>

                  </div>

                  {/* Buttons */}

                  <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">

                    <button
                      onClick={goToNextLesson}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl transition hover:-translate-y-0.5"
                    >
                      Next Lesson →
                    </button>

                    <button
                      onClick={() =>
                        router.push("/learn")
                      }
                      className="bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-700 font-bold px-8 py-3.5 rounded-xl transition"
                    >
                      Back to Learn
                    </button>

                  </div>

                </div>
              </section>
            )}

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 space-y-5">

            {/* ===============================================
                LEARNING JOURNEY
            =============================================== */}

            <section className="bg-white border border-slate-200 rounded-[24px] shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-5">

              <div className="flex items-center gap-2 mb-5">

                <span className="text-lg">
                  🚀
                </span>

                <h2 className="font-extrabold text-slate-900">
                  Your Learning Journey
                </h2>

              </div>

              {/* Beginner */}

              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    📘
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-2">

                      <p className="font-bold text-slate-900">
                        Beginner
                      </p>

                      <span className="text-xs font-bold text-emerald-600">
                        100%
                      </span>

                    </div>

                    <p className="text-xs text-emerald-600 mt-0.5">
                      Completed
                    </p>

                    <div className="h-1.5 bg-emerald-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-full bg-emerald-500 rounded-full" />
                    </div>

                  </div>

                  <span className="text-emerald-500">
                    ✓
                  </span>

                </div>

              </div>

              {/* Connector */}

              <div className="flex justify-center py-1">
                <div className="h-5 border-l-2 border-dotted border-slate-200" />
              </div>

              {/* Intermediate */}

              <div className="rounded-2xl bg-orange-50 border border-orange-100 p-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    📗
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-2">

                      <p className="font-bold text-slate-900">
                        Intermediate
                      </p>

                      <span className="text-xs font-bold text-orange-600">
                        100%
                      </span>

                    </div>

                    <p className="text-xs text-orange-600 mt-0.5">
                      Completed
                    </p>

                    <div className="h-1.5 bg-orange-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full" />
                    </div>

                  </div>

                  <span className="text-orange-500">
                    ✓
                  </span>

                </div>

              </div>

              {/* Connector */}

              <div className="flex justify-center py-1">
                <div className="h-5 border-l-2 border-dotted border-slate-200" />
              </div>

              {/* Advanced */}

              <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    📕
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-2">

                      <p className="font-bold text-slate-900">
                        Advanced
                      </p>

                      <span className="text-xs font-bold text-purple-600">
                        {lesson.level === "Advanced"
                          ? `${levelProgress}%`
                          : "0%"}
                      </span>

                    </div>

                    <p className="text-xs text-purple-600 mt-0.5">
                      {lesson.level === "Advanced"
                        ? "In Progress"
                        : "Locked"}
                    </p>

                    <div className="h-1.5 bg-purple-100 rounded-full mt-2 overflow-hidden">

                      <div
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{
                          width:
                            lesson.level ===
                            "Advanced"
                              ? `${levelProgress}%`
                              : "0%",
                        }}
                      />

                    </div>

                  </div>

                  <span className="text-purple-400">
                    {lesson.level === "Advanced"
                      ? "○"
                      : "○"}
                  </span>

                </div>

              </div>

            </section>

            {/* ===============================================
                LESSON PROGRESS
            =============================================== */}

            <section className="bg-white border border-slate-200 rounded-[24px] shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-5">

              <div className="flex items-center justify-between">

                <h3 className="font-bold text-slate-900">
                  Lesson Progress
                </h3>

                <span className="text-xs font-semibold text-slate-500">
                  {currentLessonNumber} /{" "}
                  {currentLevelLessons.length || 1} lessons
                </span>

              </div>

              <div className="mt-4">

                <div className="flex items-center justify-between mb-2">

                  <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all"
                      style={{
                        width: `${levelProgress}%`,
                      }}
                    />

                  </div>

                  <span className="ml-3 text-xs font-bold text-pink-500">
                    {levelProgress}%
                  </span>

                </div>

              </div>

              <button
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition"
              >
                Continue Learning →
              </button>

            </section>

            {/* ===============================================
                LESSON CONTENT NAVIGATION
            =============================================== */}

            <section className="bg-white border border-slate-200 rounded-[24px] shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-5">

              <h3 className="font-bold text-slate-900 mb-4">
                Lesson Contents
              </h3>

              <div className="space-y-1">

                <button
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl bg-orange-50 text-orange-600 font-semibold text-sm"
                >
                  <span>▣</span>
                  Lesson Overview
                </button>

                <button
                  onClick={() => {
                    document
                      .querySelector("article")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition"
                >
                  <span>○</span>
                  Core Concepts
                </button>

                <button
                  onClick={() => {
                    document
                      .querySelector("article")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition"
                >
                  <span>○</span>
                  How It Works
                </button>

                <button
                  onClick={() => {
                    document
                      .querySelector("article")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition"
                >
                  <span>○</span>
                  Implementation
                </button>

                <button
                  onClick={() => {
                    document
                      .querySelector("article")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition"
                >
                  <span>○</span>
                  Examples
                </button>

                <button
                  onClick={() => {
                    document
                      .querySelector("article")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition"
                >
                  <span>○</span>
                  Key Takeaways
                </button>

              </div>

            </section>

          </aside>

        </div>

      </div>
    </main>
  );
}