"use client";

import { useState } from "react";
import API from "@/services/api";

export default function MentorPage() {

  const [question, setQuestion] = useState("");

  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const askMentor = async () => {

    if (!question.trim()) {

      alert("Enter a question");

      return;

    }

    try {

      setLoading(true);

      const res = await API.post(
        "/ai-mentor",
        {
          question
        }
      );

      if (res.data.success) {

        setResponse(
          res.data.response.answer
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Failed to get mentor response"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Hero */}

        <section
          className=" bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-10 text-white shadow-xl mb-8 "
        >

          <h1 className="text-5xl font-bold mb-4">

            🧠 AI Prompt Mentor

          </h1>

          <p className="text-lg opacity-90">

            Learn Prompt Engineering from
            your personal AI mentor.

          </p>

        </section>

        {/* Ask Question */}

        <div
          className=" bg-white rounded-3xl p-8 shadow-lg border border-slate-200 "
        >

          <h2 className="text-2xl font-bold mb-4">

            Ask Anything

          </h2>

          <textarea
            rows={5}
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            placeholder="
              What is role prompting?

              How do I improve context?

              Why is my prompt weak?
              "
            className=" w-full border border-slate-300 rounded-2xl p-4 outline-none resize-none mb-4 "
          />

          <button
            onClick={askMentor}
            disabled={loading}
            className=" bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold "
          >

            {loading
              ? "Thinking..."
              : "Ask Mentor"}

          </button>

        </div>

        {/* Response */}

        {response && (

          <div
            className="
            mt-8
            bg-white
            rounded-3xl
            p-8
            shadow-lg
            border
            border-slate-200
          "
          >

            <h2 className="text-2xl font-bold mb-4">

              Mentor Response

            </h2>

            <div
              className="
              whitespace-pre-wrap
              text-slate-700
              leading-relaxed
            "
            >
              {response}
            </div>

          </div>

        )}

      </div>

    </main>

  );

}