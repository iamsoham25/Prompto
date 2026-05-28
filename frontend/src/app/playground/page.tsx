"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

export default function PlaygroundPage() {

  const [prompt, setPrompt] = useState("");

  const [response, setResponse] = useState("");

  const [history, setHistory] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const email = localStorage.getItem("userEmail");

      const res = await API.get(
        `/chat-history/${email}`
      );

      if (res.data.success) {

        setHistory(res.data.history);

      }

    } catch (error) {

      console.log(error);

    }
  };

  const generateAIResponse = async () => {

    if (!prompt) {

      alert("Please enter prompt");

      return;

    }

    try {

      setLoading(true);

      const res = await API.post("/generate", {
        prompt,
      });

      if (res.data.success) {

        const aiText = res.data.response;

        setResponse(aiText);

        const email = localStorage.getItem("userEmail");

        await API.post("/save-chat", {
          user_email: email,
          prompt: prompt,
          response: aiText,
        });

        fetchHistory();

      } else {

        alert("AI Generation Failed");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="h-[calc(100vh-80px)] bg-slate-950 text-white flex overflow-hidden">

      {/* SIDEBAR */}

      <div className="w-[280px] bg-slate-900 border-r border-white/10 p-5 flex flex-col">

        <h2 className="text-2xl font-bold mb-4">
          Chat History
        </h2>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">

          {history.length > 0 ? (

            history.map((chat, index) => (

              <div
                key={index}
                onClick={() => {

                  setPrompt(chat.prompt);

                  setResponse(chat.response);

                }}
                className="
                  bg-slate-800
                  hover:bg-slate-700
                  transition-all
                  cursor-pointer
                  p-4
                  rounded-2xl
                "
              >

                <p className="text-sm text-slate-300 line-clamp-3 leading-6">
                  {chat.prompt}
                </p>

              </div>

            ))

          ) : (

            <p className="text-slate-500">
              No chats yet...
            </p>

          )}

        </div>

      </div>

      {/* MAIN SECTION */}

      <div className="flex-1 p-6 overflow-hidden">

        <div className="h-full flex flex-col">

          {/* HEADER */}

          <div className="mb-6">

            <h1 className="text-5xl font-bold mb-2">
              AI Playground 🚀
            </h1>

            <p className="text-slate-400 text-lg">
              Test prompts using OpenRouter AI models.
            </p>

          </div>

          {/* BOXES */}

          <div className="grid lg:grid-cols-2 gap-6 flex-1 overflow-hidden">

            {/* PROMPT BOX */}

            <div className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
              flex
              flex-col
              overflow-hidden
            ">

              <h2 className="text-3xl font-bold mb-5">
                Enter Prompt
              </h2>

              <textarea
                placeholder="Write your AI prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="
                  flex-1
                  bg-slate-950
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  outline-none
                  resize-none
                  overflow-y-auto
                  text-lg
                  leading-8
                "
              />

              <button
                onClick={generateAIResponse}
                disabled={loading}
                className="
                  mt-5
                  bg-blue-600
                  hover:bg-blue-700
                  transition-all
                  p-4
                  rounded-2xl
                  font-semibold
                  text-lg
                "
              >
                {loading ? "Generating..." : "Generate Response"}
              </button>

            </div>

            {/* RESPONSE BOX */}

            <div className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
              flex
              flex-col
              overflow-hidden
            ">

              <h2 className="text-3xl font-bold mb-5">
                AI Response
              </h2>

              <div
                className="
                  flex-1
                  bg-slate-950
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  overflow-y-auto
                  whitespace-pre-wrap
                  text-slate-300
                  leading-8
                  text-lg
                "
              >

                {response || "AI response will appear here..."}

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}