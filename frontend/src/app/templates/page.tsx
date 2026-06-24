"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";

export default function TemplatesPage() {

  const [templates, setTemplates] = useState([]);

  const [category, setCategory] =
    useState("All");

  const fetchTemplates =
    async () => {

    try {

      const res = await API.get(
        "/prompt-templates"
      );

      if (res.data.success) {

        setTemplates(
          res.data.templates
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTemplates();

  }, []);

  const filteredTemplates =
    category === "All"
      ? templates
      : templates.filter(
          (item: any) =>
            item.category === category
        );

  const copyPrompt = (
    prompt: string
  ) => {

    navigator.clipboard.writeText(
      prompt
    );

    alert("Prompt copied!");

  };

  return (

    <main className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-7xl mx-auto">

        <h1
          className=" bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-10 text-white mb-10 "
        >
          AI Prompt Templates
        </h1>

        <p
          className=" text-slate-600 mb-8 "
        >
        Discover professional prompts used by developers,marketers, researchers and creators.
        </p>

        <input
            placeholder="Search templates..."
        />

        {/* CATEGORY FILTER */}

        <div
          className=" flex flex-wrap gap-3 mb-8 "
        >

          {[
            "All",
            "Coding",
            "Content Writing",
            "Research",
            "Business",
            "Marketing",
            "Education",
            "Career"
          ].map((cat) => (

            <button
              key={cat}
              onClick={() =>
                setCategory(cat)
              }
              className={`
              px-4
              py-2
              rounded-xl
              border
              ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }
            `}
            >
              {cat}
            </button>

          ))}

        </div>

        {/* TEMPLATE CARDS */}

        <div
          className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6 "
        >

          {filteredTemplates.map(
            (
              template: any
            ) => (

              <div
                key={template._id}
                className=" bg-white rounded-3xl p-6 shadow-md border border-slate-200 "
              >

                <div
                  className=" flex justify-between mb-4
                "
                >

                  <span
                    className=" text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full "
                  >
                    {
                      template.category
                    }
                  </span>

                  <span
                    className=" text-xs bg-green-100 text-green-700 py-1 rounded-full "
                  >
                    {
                      template.difficulty
                    }
                  </span>

                </div>

                <h2
                  className=" text-xl font-bold mb-2 "
                >
                  {template.title}
                </h2>

                <p
                  className=" text-slate-600 mb-4 "
                >
                  {
                    template.description
                  }
                </p>

                <div
                  className=" bg-slate-100 p-4 rounded-xl text-sm line-clamp-6 whitespace-pre-wrap "
                >
                  {template.prompt}
                </div>

                <button
                  onClick={() =>
                    copyPrompt(
                      template.prompt
                    )
                  }
                  className=" mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold "
                >
                  Copy Prompt
                </button>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  );
}