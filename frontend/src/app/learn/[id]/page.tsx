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

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [quizResult, setQuizResult] = useState<any>(null);

  const [showXpPopup, setShowXpPopup] = useState(false);

  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    fetchLesson();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params.id]);

  useEffect(() => {

  const updateReadingProgress = () => {

    const scrollTop = window.scrollY;

    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / documentHeight) * 100;

    setReadingProgress(progress);

  };

  window.addEventListener("scroll", updateReadingProgress);

  return () =>
    window.removeEventListener("scroll", updateReadingProgress);

}, []);

  const fetchLesson = async () => {
    try {
      const response = await API.get(
      `/lessons/${params.id}`
    );

    console.log("LESSON DATA:", response.data.lesson);
    
    setLesson(response.data.lesson);

    // Fetch all lessons
    const allLessons = await API.get("/lessons");
    const lessons = allLessons.data.lessons;

    // Find current lesson index
    const currentIndex = lessons.findIndex( (item: any) => item.id === params.id );

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
          selected === quiz.answer
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

        setTimeout(() => { setShowConfetti(false); }, 5000);
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

      <div className="max-w-5xl mx-auto">

        {/* Hero Card */}

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl p-10 mb-10">

            {/* Top Row */}

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold

                    ${
                      lesson.level === "Beginner"
                      ? "bg-green-100 text-green-700"

                      : lesson.level === "Intermediate"
                      ? "bg-blue-100 text-blue-700"

                      : "bg-orange-100 text-orange-700"
                      }
                  `}
                  >

                    🚀 {lesson.level}
   
                </span>

              </div>

              <div className="flex gap-3">

                <div className="bg-slate-100 px-4 py-2 rounded-xl">

                  ⏱ {readingTime} min
   
                </div>

                <div className="bg-slate-100 px-4 py-2 rounded-xl">

                  🧠 {quizzes.length} Quiz

                </div>
   
                <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-semibold">
   
                  ⭐ +25 XP
   
                </div>

              </div>

            </div>

            {/* Title */}

            <h1 className="text-5xl font-extrabold text-slate-900 mt-8 leading-tight">
   
              {lesson.title}

            </h1>

            {/* Description */}

            <p className="mt-6 text-xl leading-9 text-slate-600">

              {lesson.description}

            </p>

            {/* Lesson Stats */}
   
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

              <div className="bg-slate-50 rounded-2xl p-5">

                <p className="text-sm text-slate-500">
                  Difficulty
                </p>
   
                <h3 className="text-xl font-bold mt-1">
                  {lesson.level}
                </h3>

              </div>

              <div className="bg-slate-50 rounded-2xl p-5">
   
                <p className="text-sm text-slate-500">
                  Reading Time
                </p>

                <h3 className="text-xl font-bold mt-1">

                  {readingTime} min

                </h3>

              </div>

              <div className="bg-slate-50 rounded-2xl p-5">

                <p className="text-sm text-slate-500">
                  Questions
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {quizzes.length}
                </h3>

              </div>

              <div className="bg-slate-50 rounded-2xl p-5">

                <p className="text-sm text-slate-500">
                  Reward
                </p>

                <h3 className="text-xl font-bold text-yellow-600 mt-1">
                  +25 XP
                </h3>

              </div>

            </div>

          </div>


        <div className="bg-white border border-slate-200 rounded-[32px] p-12 shadow-xl">

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

            <ReactMarkdown
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                  }: any)
                  {

                    const match = /language-(\w+)/.exec(className || "");

                    if(!inline && match){

                      return(

                        <div className="relative">

                          <button
                            className="absolute right-4 top-4 bg-slate-700 text-white text-xs px-3 py-1 rounded-lg"
                            onClick={()=> navigator.clipboard.writeText( String(children) )
                            }
                          >
                          Copy
 
                          </button>

                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            >

                            {String(children).replace(/\n$/, "")}
 
                          </SyntaxHighlighter>
 
                        </div>

                      );

                    }
                  
                    return(

                      <code className={className} {...props}>

                        {children}
 
                      </code>

                    );

                  }

                }}
              >
              {lesson.content}
            </ReactMarkdown>

          </article>

          <div className="mt-12 bg-white rounded-3xl shadow-xl border border-slate-200 p-10">

            <h2 className="text-2xl font-bold mb-6">
            🧠 Quick Quiz
          </h2>

          {quizzes.map((quiz, index) => (

            <div
              key={index}
              className="mb-10 rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition p-6"
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
              className=" bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 transition hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold "
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

              <div className="mt-10 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-[32px] p-10 text-white shadow-2xl text-center animate-fade-in">

                <div className="text-6xl">
                  ⭐⭐⭐⭐⭐
                </div>

                <div className="text-7xl mt-4">
                  🎉
                </div>

                <h2 className="text-5xl font-extrabold mt-6">
                  Congratulations!
                </h2>

                <p className="text-xl mt-4 opacity-90">
                  You successfully completed
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {lesson.title}
                </h3>

                <div className="bg-white text-slate-800 rounded-3xl p-8 mt-10">

                  <div className="grid md:grid-cols-3 gap-6">
              
                    <div>

                      <p className="text-slate-500">
                        🏆 Score
                      </p>

                      <h2 className="text-4xl font-bold">
                        {quizScore}/{quizzes.length}
                      </h2>

                    </div>

                    <div>

                      <p className="text-slate-500">
                        📈 Accuracy
                      </p>

                      <h2 className="text-4xl font-bold">
                        {Math.round((quizScore / quizzes.length) * 100)}%
                      </h2>

                    </div>

                    <div>

                      <p className="text-slate-500">
                        ⭐ XP Earned
                      </p>

                      <h2 className="text-4xl font-bold text-yellow-500">
                        +25
                      </h2>

                    </div>
              
                  </div>

                </div>

                  <div className="mt-10 bg-white/20 rounded-2xl p-6">

                      <h3 className="text-2xl font-bold">

                          🚀 Great Progress!

                    </h3>

                  <p className="mt-3 text-lg">

                    You are one lesson closer to becoming an

                    <strong> Expert Prompt Engineer.</strong>

                  </p>

                </div>

                <div className="flex justify-center gap-6 mt-10">

                  <button

                    onClick={goToNextLesson}
              
                    className="bg-white text-green-600 font-bold px-8 py-4 rounded-2xl shadow hover:scale-105 transition"

                    >

                    Next Lesson →

                  </button>

                  <button

                    onClick={() => router.push("/learn")}
              
                    className="bg-green-700 hover:bg-green-800 px-8 py-4 rounded-2xl font-bold"

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
                  className=" bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed "
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