"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

export default function PlaygroundPage() {

  const [prompt, setPrompt] = useState("");

  const [messages, setMessages] = useState<any[]>([]);

  const [history, setHistory] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchHistory();

  }, []);

  // FETCH CHAT HISTORY

  const fetchHistory = async () => {

    try {

      const email = localStorage.getItem("userEmail");

      if (!email) return;

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

  // GENERATE AI RESPONSE

  const generateAIResponse = async () => {

    if (!prompt) {

      alert("Please enter prompt");

      return;

    }

    try {

      setLoading(true);

      // USER MESSAGE

      const userMessage = {
        role: "user",
        content: prompt,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      // API CALL

      const res = await API.post("/generate", {
        prompt,
      });

      if (res.data.success) {

        const aiText = res.data.response;

        // AI MESSAGE

        const aiMessage = {
          role: "assistant",
          content: aiText,
        };

        setMessages((prev) => [
          ...prev,
          aiMessage,
        ]);

        // SAVE CHAT

        const email = localStorage.getItem("userEmail");

        await API.post("/save-chat", {
          user_email: email,
          prompt: prompt,
          response: aiText,
        });

        // REFRESH HISTORY

        fetchHistory();

        // CLEAR INPUT

        setPrompt("");

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

    <main className="h-[calc(100vh-80px)] bg-slate-50 text-white flex overflow-hidden">

      {/* SIDEBAR */}

      <div className="w-[280px] bg-white border-r border-slate-200 p-5 flex flex-col">

        <h2 className="text-2xl font-bold text-slate-900 mb-5">
          Chat History
        </h2>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">

          {history.length > 0 ? (

            history.map((chat, index) => (

              <div
                key={index}
                onClick={() => {

                  setMessages([
                    {
                      role: "user",
                      content: chat.prompt,
                    },
                    {
                      role: "assistant",
                      content: chat.response,
                    },
                  ]);

                }}
                className="
                  bg-slate-100
                  hover:bg-orange-50
                  transition-all
                  cursor-pointer
                  p-4
                  rounded-2xl
                "
              >

                <p className="text-sm text-slate-700 line-clamp-3 leading-6">

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

      <div className="flex-1 p-6 flex flex-col overflow-hidden">

        {/* HEADER */}

        <div className="mb-5">

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            AI Playground 🚀
          </h1>

          <p className="text-slate-600 text-base">
            Test prompts using OpenRouter AI models.
          </p>

        </div>

        {/* CHAT AREA */}

        <div
          className="
            flex-1
            bg-white
            border
            border-slate-200
            shadow-md
            rounded-3xl
            p-6
            overflow-y-auto
            space-y-5
          "
        >

          {messages.length === 0 ? (

            <div className="text-slate-500 text-lg">
              Start chatting with AI...
            </div>

          ) : (

            messages.map((message, index) => (

              <div
                key={index}
                className={`
                  max-w-[80%]
                  p-5
                  rounded-3xl
                  whitespace-pre-wrap
                  leading-8
                  text-base
                  shadow-sm
                  ${
                    message.role === "user"
                      ? "ml-auto bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-800 border border-slate-200"
                  }
                `}
              >

                {message.content}

              </div>

            ))

          )}

        </div>

        {/* INPUT AREA */}

        <div className="mt-5 flex gap-4">

          <textarea
            placeholder="Write your AI prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="
              flex-1
              h-[90px]
              bg-white
              border
              border-slate-300
              rounded-2xl
              p-5
              outline-none
              resize-none
              text-base
              text-slate-900
              focus:ring-2
              focus:ring-orange-400
              focus:border-orange-400
            "
          />

          <button
            onClick={generateAIResponse}
            disabled={loading}
            className="
              w-[220px]
              bg-orange-500
              hover:bg-orange-600
              transition-all
              rounded-2xl
              font-semibold
              text-lg
              text-white
              shadow-lg
            "
          >

            {loading ? "Generating..." : "Send"}

          </button>

        </div>

      </div>

    </main>

  );

}
