"use client";

import { useState } from "react";

import API from "@/services/api";

import ChatBubble from "@/components/ui/ChatBubble";

import { Message } from "@/types/chat";

import { SendHorizonal } from "lucide-react";

export default function PlaygroundPage() {

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const createNewChat = () => {
  setMessages([]);
  setPrompt("");
};

  const generateResponse = async () => {

    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setPrompt("");

    try {

      setLoading(true);

      const response = await API.post("/generate", {
        prompt,
      });

      const aiMessage: Message = {
        role: "assistant",
        content: response.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error(error);

      const errorMessage: Message = {
        role: "assistant",
        content:
          "Something went wrong while generating AI response.",
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex">

      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800 p-5 hidden md:block">

        <button
  onClick={createNewChat}
  className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 font-semibold text-lg"
>
  + New Chat
</button>

        <div className="mt-10 text-slate-400">
          Chat history coming soon...
        </div>

      </aside>

      {/* Main Chat */}
      <section className="flex-1 flex flex-col h-[calc(100vh-80px)]">

        {/* Header */}
        <div className="border-b border-slate-800 px-8 py-5">
          <h1 className="text-3xl font-bold">
            Prompto AI Playground
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 pb-32">

          {messages.length === 0 && (

            <div className="h-full flex items-center justify-center">

              <div className="text-center">

                <h2 className="text-5xl font-bold mb-4">
                  Start Prompting 🚀
                </h2>

                <p className="text-slate-400 text-lg">
                  Ask anything about Prompt Engineering or AI.
                </p>

              </div>

            </div>

          )}

          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-slate-800 px-5 py-4 rounded-3xl">
                Thinking...
              </div>

            </div>

          )}

        </div>

        {/* Input */}
      <div className="border-t border-slate-800 p-5 bg-[#020617] sticky bottom-0">

        <div className="max-w-5xl mx-auto flex gap-4 items-end">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Prompto AI anything..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl p-4 resize-none outline-none min-h-[60px] max-h-[200px]"
          />

          <button
            onClick={generateResponse}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 h-[60px] rounded-2xl flex items-center justify-center"
        >
          <SendHorizonal />
        </button>

      </div>

    </div>

    </section>

    </main>
  );
}