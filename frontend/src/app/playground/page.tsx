"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import { useRef } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

export default function PlaygroundPage() {

  const [prompt, setPrompt] = useState("");

  const [conversationId, setConversationId] = useState<string | null>(null);

  const [messages, setMessages] = useState<any[]>([]);

  const [history, setHistory] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const [showTemplates, setShowTemplates] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [lastPrompt, setLastPrompt] = useState("");

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);




  const filteredHistory =
  history.filter((chat) =>
    (chat.prompt || "")
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {

    if (messages.length > 0) {

      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    }

  }, [messages]);

  useEffect(() => {

    console.log(
      "Conversation ID:",
      conversationId
    );

  }, [conversationId]);

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

  const deleteChat = async (chatId: string) => {

    const confirmDelete = window.confirm(
      "Delete this chat?"
    );

    if (!confirmDelete) return;

    try {

      const res = await API.delete(
        `/delete-chat/${chatId}`
      );

      if (res.data.success) {

        if (selectedChatId === chatId) {

          setMessages([]);

          setSelectedChatId(null);

        }

        fetchHistory();

      }

    } catch (error) {

      console.log(error);

    }

  };

  // GENERATE AI RESPONSE

  const createNewConversation = async () => {

  try {

    const email = localStorage.getItem(
      "userEmail"
    );

    console.log("EMAIL:", email);

    const res = await API.post(
      "/new-conversation",
      {
        user_email: email,
      }
    );

    console.log(
      "API RESPONSE:",
      res.data
    );

    if (res.data.success) {

      console.log(
        "SETTING CONVERSATION ID:",
        res.data.conversation_id
      );

      setConversationId(
        res.data.conversation_id
      );

      setMessages([]);
      setPrompt("");
      setSelectedChatId(null);

      fetchHistory();

    }

  } catch (error) {

    console.log(
      "NEW CONVERSATION ERROR:",
      error
    );

  }

};

  const generateAIResponse = async () => {

    if (!prompt.trim()) {

      alert("Please enter prompt");

      return;

    }

    try {

      setLoading(true);

      // USER MESSAGE

      setLastPrompt(prompt);

      const userMessage = {
        role: "user",
        content: prompt,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      if (conversationId) {

        await API.post(
          "/add-message",
          {
            conversation_id:
              conversationId,
            role: "user",
            content: prompt,
          }
        );

      }

      // API CALL

      const res = await API.post("/generate", {
        prompt,
      });

      if (res.data.success) {

        const aiText =
          res.data.response
            .replace(/\n{3,}/g, "\n\n")
            .trim();
        console.log(JSON.stringify(aiText));
        

        // AI MESSAGE

        const aiMessage = {
          role: "assistant",
          content: aiText,
        };

        setMessages((prev) => [
          ...prev,
          aiMessage,
        ]);

        if (conversationId) {

          await API.post(
            "/add-message",
            {
              conversation_id:
                conversationId,
              role: "assistant",
              content: aiText,
            }
          );

        }

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

  const regenerateResponse = async () => {

    if (!lastPrompt) {

      alert("No previous prompt found");

      return;

    }

    try {

      setLoading(true);

      const res = await API.post(
        "/generate",
        {
          prompt: lastPrompt,
        }
      );

      if (res.data.success) {

        const aiMessage = {
          role: "assistant",
          content: res.data.response
            .replace(/\n{3,}/g, "\n\n")
            .trim(),
        };
  
        setMessages((prev) => [
          ...prev,
          aiMessage,
        ]);

      }
  
    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  

  const exportChat = () => {

    if (messages.length === 0) {

      alert("No chat to export");

      return;

    }

    let content = "";

    messages.forEach((msg) => {

      content +=
        `${msg.role.toUpperCase()}:\n`;

      content +=
        `${msg.content}\n\n`;

    });

    const blob = new Blob(
      [content],
      { type: "text/plain" }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "prompto-chat.txt";

    a.click();

    URL.revokeObjectURL(url);

  };

  return (

    <main className="h-[calc(100vh-80px)] bg-slate-50 text-white flex overflow-hidden">

      {/* SIDEBAR */}

        <div
        className="
        w-72
        bg-white
        border-r
        border-slate-200
        flex
        flex-col
        "
        >

          <div className="p-4 border-b">

            <button
              onClick={() => {
                setMessages([]);
                setPrompt("");
                setSelectedChatId(null);
              }}
              className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        bg-orange-500
        text-white
        font-semibold
        hover:bg-orange-600
          "
            >
              <span className="text-xl">+</span>
              New Chat
            </button>

          </div>

          <div className="p-4">

            <input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="
      w-full
      px-3
      py-2
      border
      border-slate-300
      rounded-lg
      text-sm
      text-slate-700
      outline-none
      focus:ring-2
      focus:ring-orange-500
    "
            />

          </div>

          <div className="flex-1 overflow-y-auto p-3">

            {filteredHistory.length === 0 ? ( 

              <div className="p-4 text-slate-400 text-sm">

                No chats yet

              </div>

            ) : (

              filteredHistory.map((chat, index) => (

                  <div
                    key={chat.id}
                    className={`
    
    group
    flex
    items-center
    justify-between                  
    px-3
    py-3
    rounded-xl
    cursor-pointer
    mb-1
    text-sm
    transition

                      ${
                        selectedChatId === chat.id
                          ? "bg-orange-100 border border-orange-300 text-slate-900"
                          : "hover:bg-slate-100 text-slate-700"
                      }
                    `}
                  >

                  <div
                    onClick={() => {

                      setSelectedChatId(chat.id);

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

                      setTimeout(() => {

                        const chatContainer =
                          document.getElementById("chat-container");

                        if (chatContainer) {
                          chatContainer.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }

                      }, 100);

                    }}
                    className="
          flex-1
          cursor-pointer
          text-slate-700
          text-sm
          truncate
        "
                  >

                    {
                      (chat.title || chat.prompt).length > 30
                        ? (chat.title || chat.prompt).slice(0, 30) + "..."
                        : (chat.title || chat.prompt)
                    }

                  </div>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      deleteChat(chat.id);

                    }}
                    className="
  opacity-0
  group-hover:opacity-100
  text-red-500
  hover:text-red-700
  transition
  ml-2
  text-sm
        "
                  >

                    🗑

                  </button>

                </div>

              ))

            )}

          </div>
  
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">

        {/* CHAT AREA */}

        <div
          id="chat-container"
          ref={chatAreaRef}
          className="
    flex-1
    overflow-y-auto
    px-6
    py-4
    space-y-4
  "
        >

          {messages.length === 0 ? (

            <div className="flex h-full items-center justify-center">

              <div className="text-center -mt-20">

                <h2 className="text-6xl font-bold text-slate-800">
                  AI Playground 🚀
                </h2>

                <p className="text-slate-500 mt-4 text-xl">
                  Ask anything and start learning.
                </p>

              </div>

            </div>

          ) : (

            messages.map((message, index) => (

              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                    group
                    relative
                    max-w-3xl
                    px-5
                    py-3
                    rounded-2xl
                    whitespace-pre-wrap
                    leading-6
                    shadow-sm
                    ${
                      message.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-slate-800 border border-slate-200"
                    }
                  `}
                >

                  <div>

                

                    <ReactMarkdown
                      components={{
                        br: () => <br />,
                        p: ({ children }) => (
                          <p className="leading-6">
                            {children}
                          </p>
                        ),

                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold mb-2">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold mb-2">
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold mb-1">
                            {children}
                          </h3>
                        ),

                        ol: ({ children }) => (
                        <ol className="pl-5 my-1">
                          {children}
                        </ol>
                        ),

                        ul: ({ children }) => (
                          <ul className="pl-5 my-1">
                            {children}
                          </ul>
                        ),

                        li: ({ children }) => (
                          <li className="my-0">
                            {children}
                          </li>
                        ),
                        

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

                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(
                                /\n$/,
                                ""
                              )}
                            </SyntaxHighlighter>
                          ) : (
                            <code
                              className="bg-slate-100 px-1 rounded"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                     >
                      {message.content}
                     </ReactMarkdown>

                    {message.role === "assistant" && (

                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(
                            message.content
                          )
                        }
                        className="
  absolute
  top-2
  right-2
  opacity-0
  group-hover:opacity-100
  transition
  text-xs
  bg-slate-100
  px-2
  py-1
  rounded
  text-slate-600
  hover:text-orange-500
"
                      >
                        Copy
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))

          )}

          {loading && (

            <div className="flex justify-start">

              <div
                className="
      bg-slate-100
      px-5
      py-4
      rounded-2xl
      flex
      gap-1
    "
              >

                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>

                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>

                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>

              </div>

            </div>

          )}

          <div ref={bottomRef}></div>

        </div>

      {/* INPUT AREA */}

        <div
          className="
    shrink-0
    border-t
    border-slate-200
    bg-slate-50
    px-6
    py-3
  "
        >

          <div
            className="
     relative
    bg-white
    border
    border-slate-300
    rounded-3xl
    px-4
    py-2
    shadow-sm
    "
          >

            <textarea
              value={prompt}
              onChange={(e) => {

                setPrompt(e.target.value);

                e.target.style.height = "20px";

                e.target.style.height =
                  e.target.scrollHeight + "px";

              }}

              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {

                  e.preventDefault();

                  generateAIResponse();

                }

             }}
              placeholder="Ask anything..."
              rows={1}
              className="
    w-full
    resize-none
    outline-none
    text-slate-900
    text-base
    min-h-[20px]
    max-h-[160px]
    overflow-y-auto
    leading-6
  "
            />

            {showTemplates && (

              <div
                className="
  absolute
  bottom-16
  left-0
  bg-white
  border
  border-slate-200
  rounded-2xl
  shadow-xl
  w-72
  z-50
  overflow-hidden
"
              >

              <button
                onClick={() => {
                  setPrompt("Summarize the following:");
                  setShowTemplates(false);
                }}
                className="
    w-full
    text-left
    px-4
    py-3
    hover:bg-slate-100
    text-slate-800
    font-medium
              "
              >
                📝 Summarize
              </button>

              <button
                onClick={() => {
                  setPrompt("Write a professional email:");
                  setShowTemplates(false);
                }}
                className="
    w-full
    text-left
    px-4
    py-3
    hover:bg-slate-100
    text-slate-800
    font-medium
  "
              >
                📧 Email
              </button>

              <button
                onClick={() => {
                  setPrompt("Explain this code:");
                  setShowTemplates(false);
                }}
                className="
    w-full
    text-left
    px-4
    py-3
    hover:bg-slate-100
    text-slate-800
    font-medium
  "
              >
                💻 Explain Code
              </button>
  
            </div>

          )}

          <div className="flex items-center justify-between mt-1">

            <button
              onClick={() =>
                setShowTemplates(!showTemplates)
              }
              className="
          w-10
          h-10
          rounded-full
          bg-slate-100
          hover:bg-slate-200
          text-slate-700
          text-xl
          transition
        "
            >
              +
            </button>

            <button
              onClick={generateAIResponse}
              disabled={loading}
              className="
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-4
          py-1.5
          rounded-xl
          font-medium
        "
            >

              {loading ? "..." : "Send"}
            </button>

            <button
              onClick={exportChat}
              className="
    px-3
    py-1.5
    bg-slate-200
    text-slate-700
    rounded-xl
    hover:bg-slate-300
  "
            >
              Export
            </button>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}
