"use client";

import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useParams } from "next/navigation";

import API from "@/services/api";

export default function LessonPage() {

  const params = useParams();

  const [lesson, setLesson] = useState<any>(null);

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

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl">
        Loading...
      </div>

    );
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white px-8 py-12">

      <div className="max-w-3xl mx-auto">

        <span className="bg-blue-600 px-4 py-2 rounded-xl text-sm">
          {lesson.level}
        </span>

        <h1 className="text-4xl font-bold mt-6 mb-6">
          {lesson.title}
        </h1>

        <p className="text-slate-400 text-xl mb-12">
          {lesson.description}
        </p>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-10">

          <article
            className="
              prose
              prose-invert
              prose-lg
              max-w-none

              prose-h1:text-5xl
              prose-h1:font-bold

              prose-h2:text-3xl
              prose-h2:font-bold

              prose-p:text-slate-300
              prose-p:leading-8

              prose-li:text-slate-300

              prose-strong:text-white

              prose-code:text-blue-400
            "
          >

            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }: any) {

                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (

                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>

                  ) : (

                    <code className={className} {...props}>
                      {children}
                    </code>

                  );
                },
              }}
            >
              {lesson.content}
            </ReactMarkdown>

          </article>

        </div>

      </div>

    </main>
  );
}