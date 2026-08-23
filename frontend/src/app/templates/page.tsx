"use client";

import { useEffect, useMemo, useState } from "react";
import API from "@/services/api";

interface Template {
  id: string;
  _id?: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  prompt: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
}

/* ============================================================
   BUILT-IN PROMPT LIBRARY
   ============================================================ */

const builtInTemplates: Template[] = [
  /* ==========================================================
     CODING
     ========================================================== */

  {
    id: "python-code-reviewer",
    title: "Python Code Reviewer",
    category: "Coding",
    difficulty: "Intermediate",
    description:
      "Review Python code like a senior software engineer and identify issues and improvements.",
    prompt:
      "Act as a senior Python engineer. Review the following Python code for correctness, readability, performance, security, maintainability, and PEP 8 compliance. Identify bugs and potential edge cases. Explain each issue clearly and provide an improved version of the code where appropriate.",
    tags: ["Python", "Code Review", "Debugging"],
    featured: true,
    popular: true,
  },

  {
    id: "debug-code",
    title: "Debug My Code",
    category: "Coding",
    difficulty: "Beginner",
    description:
      "Find the root cause of programming errors and explain how to fix them.",
    prompt:
      "Act as an expert software debugger. Analyze the following code and identify the root cause of the problem. Explain why the error occurs, show the corrected code, and provide practical advice to prevent the same issue in the future.",
    tags: ["Debugging", "Programming", "Errors"],
    popular: true,
  },

  {
    id: "code-optimizer",
    title: "Code Performance Optimizer",
    category: "Coding",
    difficulty: "Advanced",
    description:
      "Improve code performance without changing its expected behavior.",
    prompt:
      "Act as a senior performance engineer. Analyze the following code and identify computational bottlenecks, unnecessary operations, memory issues, and scalability concerns. Suggest optimized alternatives and explain the expected performance improvements.",
    tags: ["Optimization", "Performance", "Engineering"],
  },

  {
    id: "api-documentation",
    title: "API Documentation Writer",
    category: "Coding",
    difficulty: "Intermediate",
    description:
      "Generate clear and professional API documentation.",
    prompt:
      "Act as a technical writer specializing in API documentation. Convert the following API implementation into professional documentation containing an overview, authentication, endpoints, parameters, request examples, response examples, errors, and usage notes.",
    tags: ["API", "Documentation", "Developer"],
  },

  /* ==========================================================
     AI / MACHINE LEARNING
     ========================================================== */

  {
    id: "ml-project-planner",
    title: "Machine Learning Project Planner",
    category: "AI & ML",
    difficulty: "Advanced",
    description:
      "Create a complete roadmap for developing a machine learning project.",
    prompt:
      "Act as a senior machine learning engineer. Design a complete implementation plan for the following ML project. Cover problem definition, data collection, preprocessing, exploratory analysis, feature engineering, model selection, training, evaluation, deployment, monitoring, and future improvements. Present the plan in clear phases.",
    tags: ["Machine Learning", "Roadmap", "AI"],
    featured: true,
  },

  {
    id: "ai-explainer",
    title: "Explain AI to a Beginner",
    category: "AI & ML",
    difficulty: "Beginner",
    description:
      "Explain complex AI concepts using simple language and practical examples.",
    prompt:
      "Explain the following artificial intelligence concept to someone with no technical background. Use simple language, relatable analogies, practical examples, and a step-by-step explanation. Avoid unnecessary technical terminology.",
    tags: ["AI", "Learning", "Beginner"],
    popular: true,
  },

  {
    id: "model-evaluation",
    title: "ML Model Evaluation Expert",
    category: "AI & ML",
    difficulty: "Intermediate",
    description:
      "Analyze a machine learning model using appropriate evaluation metrics.",
    prompt:
      "Act as a machine learning evaluation expert. Analyze the following model results and explain its performance using appropriate metrics. Discuss strengths, weaknesses, possible causes of poor performance, and specific steps for improvement.",
    tags: ["ML", "Evaluation", "Metrics"],
  },

  {
    id: "rag-architect",
    title: "RAG System Architect",
    category: "AI & ML",
    difficulty: "Advanced",
    description:
      "Design a production-ready Retrieval-Augmented Generation system.",
    prompt:
      "Act as a senior AI architect. Design a production-ready RAG system for the following use case. Cover document ingestion, chunking, embeddings, vector storage, retrieval, reranking, prompt construction, LLM generation, evaluation, security, monitoring, and scalability.",
    tags: ["RAG", "LLM", "Architecture"],
    featured: true,
  },

  /* ==========================================================
     CONTENT WRITING
     ========================================================== */

  {
    id: "blog-writer",
    title: "Professional Blog Writer",
    category: "Content Writing",
    difficulty: "Beginner",
    description:
      "Create engaging and structured professional blog articles.",
    prompt:
      "Act as an experienced content writer. Write a professional blog article about the following topic. Include an engaging introduction, logical headings, useful examples, actionable insights, and a concise conclusion. Keep the writing natural and easy to read.",
    tags: ["Blog", "Writing", "Content"],
    featured: true,
    popular: true,
  },

  {
    id: "technical-writer",
    title: "Technical Documentation Writer",
    category: "Content Writing",
    difficulty: "Intermediate",
    description:
      "Turn technical information into clear documentation.",
    prompt:
      "Act as a professional technical writer. Transform the following technical information into clear documentation for the intended audience. Use headings, numbered steps, examples, warnings, and concise explanations where appropriate.",
    tags: ["Technical Writing", "Documentation"],
  },

  {
    id: "rewrite-professional",
    title: "Professional Rewriter",
    category: "Content Writing",
    difficulty: "Beginner",
    description:
      "Rewrite rough text into polished professional language.",
    prompt:
      "Rewrite the following text in a professional, natural, and concise style. Preserve the original meaning while improving grammar, clarity, sentence structure, vocabulary, and overall readability.",
    tags: ["Rewrite", "Grammar", "Professional"],
  },

  /* ==========================================================
     RESEARCH
     ========================================================== */

  {
    id: "research-assistant",
    title: "Research Assistant",
    category: "Research",
    difficulty: "Intermediate",
    description:
      "Perform structured research and organize findings.",
    prompt:
      "Act as an academic research assistant. Analyze the following research topic and provide a structured overview covering background, key concepts, important findings, competing perspectives, practical implications, limitations, and areas for future research.",
    tags: ["Research", "Analysis", "Academic"],
    featured: true,
    popular: true,
  },

  {
    id: "literature-review",
    title: "Literature Review Assistant",
    category: "Research",
    difficulty: "Advanced",
    description:
      "Organize research literature into a structured review.",
    prompt:
      "Act as an academic researcher. Help organize the following literature into a structured literature review. Identify major themes, common findings, conflicting results, research gaps, methodologies, and opportunities for future research.",
    tags: ["Literature", "Academic", "Research"],
  },

  {
    id: "research-summary",
    title: "Research Paper Summarizer",
    category: "Research",
    difficulty: "Beginner",
    description:
      "Convert lengthy research material into useful summaries.",
    prompt:
      "Summarize the following research paper while preserving the important information. Structure the response into objective, methodology, key findings, results, limitations, conclusion, and practical implications.",
    tags: ["Summary", "Research Paper"],
  },

  /* ==========================================================
     BUSINESS
     ========================================================== */

  {
    id: "business-strategy",
    title: "Business Strategy Advisor",
    category: "Business",
    difficulty: "Advanced",
    description:
      "Develop structured strategies for business problems.",
    prompt:
      "Act as a senior business strategy consultant. Analyze the following business situation and provide a structured strategy covering the current situation, key challenges, opportunities, competitive considerations, recommended actions, risks, and implementation roadmap.",
    tags: ["Strategy", "Business", "Planning"],
    featured: true,
  },

  {
    id: "swot-analysis",
    title: "SWOT Analysis Generator",
    category: "Business",
    difficulty: "Beginner",
    description:
      "Generate a structured SWOT analysis for a company or project.",
    prompt:
      "Perform a detailed SWOT analysis for the following company, product, project, or business idea. Clearly identify strengths, weaknesses, opportunities, and threats, and provide practical strategic recommendations based on the analysis.",
    tags: ["SWOT", "Strategy", "Business"],
  },

  {
    id: "business-plan",
    title: "Business Plan Builder",
    category: "Business",
    difficulty: "Advanced",
    description:
      "Create a structured business plan for a new idea.",
    prompt:
      "Act as an experienced business consultant. Develop a structured business plan for the following idea. Cover the problem, solution, target market, value proposition, business model, competition, marketing strategy, operations, financial considerations, risks, and growth strategy.",
    tags: ["Business Plan", "Startup", "Strategy"],
  },

  /* ==========================================================
     MARKETING
     ========================================================== */

  {
    id: "marketing-strategy",
    title: "Marketing Strategy Planner",
    category: "Marketing",
    difficulty: "Advanced",
    description:
      "Create a complete marketing strategy for a product or service.",
    prompt:
      "Act as a senior marketing strategist. Develop a marketing strategy for the following product or service. Define the target audience, positioning, messaging, channels, content strategy, campaign ideas, KPIs, budget considerations, and measurement approach.",
    tags: ["Marketing", "Strategy", "Campaign"],
    featured: true,
  },

  {
    id: "social-post",
    title: "Social Media Post Generator",
    category: "Marketing",
    difficulty: "Beginner",
    description:
      "Generate engaging social media content.",
    prompt:
      "Act as a social media strategist. Create engaging social media posts for the following topic. Provide multiple variations with strong hooks, concise messaging, relevant calls to action, and platform-appropriate language.",
    tags: ["Social Media", "Content", "Marketing"],
    popular: true,
  },

  {
    id: "ad-copy",
    title: "Advertisement Copywriter",
    category: "Marketing",
    difficulty: "Intermediate",
    description:
      "Write persuasive advertising copy for campaigns.",
    prompt:
      "Act as an expert advertising copywriter. Create persuasive advertisement copy for the following product. Provide multiple headline options, short descriptions, benefits, emotional hooks, calls to action, and variations for different audiences.",
    tags: ["Advertising", "Copywriting"],
  },

  /* ==========================================================
     EDUCATION
     ========================================================== */

  {
    id: "study-tutor",
    title: "Personal AI Tutor",
    category: "Education",
    difficulty: "Beginner",
    description:
      "Learn difficult subjects through personalized explanations.",
    prompt:
      "Act as my personal tutor. Teach me the following topic from beginner to advanced level. Start with the fundamentals, use simple examples and analogies, ask short questions to test my understanding, and gradually increase the difficulty.",
    tags: ["Tutor", "Learning", "Education"],
    featured: true,
    popular: true,
  },

  {
    id: "exam-preparation",
    title: "Exam Preparation Coach",
    category: "Education",
    difficulty: "Intermediate",
    description:
      "Build a structured study plan for exams.",
    prompt:
      "Act as an academic exam preparation coach. Create a realistic study plan for the following subject and exam. Divide the syllabus into manageable sections, prioritize important topics, include revision sessions, practice questions, and progress checkpoints.",
    tags: ["Exam", "Study Plan", "Student"],
  },

  {
    id: "quiz-generator",
    title: "Quiz Generator",
    category: "Education",
    difficulty: "Beginner",
    description:
      "Generate quizzes for learning and revision.",
    prompt:
      "Create a quiz about the following topic. Include a balanced mix of easy, medium, and difficult questions. Provide multiple-choice questions, correct answers, and brief explanations for each answer.",
    tags: ["Quiz", "Learning", "Practice"],
  },

  /* ==========================================================
     CAREER
     ========================================================== */

  {
    id: "resume-builder",
    title: "Resume Improvement Expert",
    category: "Career",
    difficulty: "Intermediate",
    description:
      "Improve resume content for specific job opportunities.",
    prompt:
      "Act as an expert technical recruiter and resume writer. Review my resume for the following job role. Identify weak sections, improve bullet points using measurable impact, optimize keywords, and suggest specific changes to improve ATS compatibility.",
    tags: ["Resume", "ATS", "Career"],
    featured: true,
    popular: true,
  },

  {
    id: "interview-coach",
    title: "Interview Preparation Coach",
    category: "Career",
    difficulty: "Intermediate",
    description:
      "Prepare for technical and behavioral interviews.",
    prompt:
      "Act as an experienced interviewer. Prepare me for an interview for the following role. Ask realistic technical and behavioral questions one at a time, evaluate my answers, explain what was strong or weak, and provide improved example answers.",
    tags: ["Interview", "Career", "Preparation"],
  },

  {
    id: "linkedin-profile",
    title: "LinkedIn Profile Optimizer",
    category: "Career",
    difficulty: "Beginner",
    description:
      "Improve LinkedIn profile content for professional visibility.",
    prompt:
      "Act as a professional LinkedIn profile strategist. Review the following profile information and improve the headline, About section, experience descriptions, skills, and overall positioning for the target career path.",
    tags: ["LinkedIn", "Career", "Personal Brand"],
  },

  /* ==========================================================
     HR
     ========================================================== */

  {
    id: "job-description",
    title: "Job Description Generator",
    category: "HR",
    difficulty: "Intermediate",
    description:
      "Create clear and professional job descriptions.",
    prompt:
      "Act as an HR recruitment specialist. Create a professional job description for the following position. Include responsibilities, required skills, preferred qualifications, experience, role expectations, and a concise company-oriented introduction.",
    tags: ["HR", "Recruitment", "Hiring"],
  },

  {
    id: "employee-feedback",
    title: "Employee Feedback Writer",
    category: "HR",
    difficulty: "Beginner",
    description:
      "Write constructive and professional employee feedback.",
    prompt:
      "Act as an experienced manager. Convert the following observations into constructive employee feedback. Maintain a professional and supportive tone, clearly identify strengths, improvement areas, examples, and actionable next steps.",
    tags: ["HR", "Feedback", "Management"],
  },

  /* ==========================================================
     FINANCE
     ========================================================== */

  {
    id: "financial-analysis",
    title: "Financial Analysis Assistant",
    category: "Finance",
    difficulty: "Advanced",
    description:
      "Analyze financial information and identify useful insights.",
    prompt:
      "Act as a financial analyst. Analyze the following financial information and provide a structured assessment of revenue, expenses, profitability, trends, risks, opportunities, and important financial indicators. Clearly distinguish observations from assumptions.",
    tags: ["Finance", "Analysis", "Business"],
  },

  {
    id: "budget-planner",
    title: "Personal Budget Planner",
    category: "Finance",
    difficulty: "Beginner",
    description:
      "Create a structured personal budgeting plan.",
    prompt:
      "Act as a personal budgeting assistant. Based on the following income, expenses, savings goals, and financial priorities, create a practical monthly budget. Categorize spending, identify opportunities to reduce unnecessary expenses, and suggest realistic savings targets.",
    tags: ["Budget", "Finance", "Planning"],
  },

  /* ==========================================================
     PRODUCTIVITY
     ========================================================== */

  {
    id: "daily-planner",
    title: "Daily Productivity Planner",
    category: "Productivity",
    difficulty: "Beginner",
    description:
      "Turn tasks into a realistic daily schedule.",
    prompt:
      "Act as a productivity coach. Organize the following tasks into a realistic daily schedule. Prioritize tasks by importance and urgency, estimate reasonable time blocks, include short breaks, and avoid creating an unrealistic workload.",
    tags: ["Productivity", "Planning", "Tasks"],
    popular: true,
  },

  {
    id: "meeting-summary",
    title: "Meeting Notes Summarizer",
    category: "Productivity",
    difficulty: "Beginner",
    description:
      "Turn meeting notes into actionable summaries.",
    prompt:
      "Convert the following meeting notes into a concise professional summary. Organize the output into key discussion points, decisions, action items, owners, deadlines, unresolved questions, and next steps.",
    tags: ["Meetings", "Summary", "Productivity"],
  },

  /* ==========================================================
     EMAIL
     ========================================================== */

  {
    id: "professional-email",
    title: "Professional Email Writer",
    category: "Email",
    difficulty: "Beginner",
    description:
      "Write professional emails for workplace communication.",
    prompt:
      "Act as a professional business communication expert. Write a clear and polite email based on the following situation. Keep it concise, professional, natural, and appropriate for workplace communication. Include a suitable subject line.",
    tags: ["Email", "Communication", "Work"],
    featured: true,
    popular: true,
  },

  {
    id: "follow-up-email",
    title: "Professional Follow-Up Email",
    category: "Email",
    difficulty: "Beginner",
    description:
      "Write polite and effective follow-up emails.",
    prompt:
      "Write a concise professional follow-up email regarding the following situation. Be polite without sounding pushy. Clearly reference the previous communication, explain the purpose of the follow-up, and end with a clear next step.",
    tags: ["Email", "Follow-up", "Business"],
  },

  /* ==========================================================
     DATA & ANALYTICS
     ========================================================== */

  {
    id: "data-analyst",
    title: "Data Analysis Assistant",
    category: "Data & Analytics",
    difficulty: "Advanced",
    description:
      "Analyze datasets and identify meaningful patterns.",
    prompt:
      "Act as a senior data analyst. Analyze the following dataset or analytical problem. Identify important trends, anomalies, relationships, potential causes, and actionable insights. Explain your reasoning clearly and recommend appropriate visualizations or additional analyses.",
    tags: ["Data", "Analytics", "Insights"],
    featured: true,
  },

  {
    id: "sql-generator",
    title: "SQL Query Expert",
    category: "Data & Analytics",
    difficulty: "Intermediate",
    description:
      "Generate optimized SQL queries from natural language requirements.",
    prompt:
      "Act as an expert SQL developer. Convert the following business requirement into a correct and efficient SQL query. Explain the query, assumptions, joins, filtering logic, and optimization considerations.",
    tags: ["SQL", "Database", "Analytics"],
  },

  /* ==========================================================
     DESIGN
     ========================================================== */

  {
    id: "ui-ux-reviewer",
    title: "UI/UX Design Reviewer",
    category: "Design",
    difficulty: "Intermediate",
    description:
      "Review an interface and suggest practical UX improvements.",
    prompt:
      "Act as a senior UI/UX designer. Review the following interface description or design and identify usability, accessibility, hierarchy, spacing, typography, interaction, and visual consistency issues. Provide prioritized recommendations with specific improvements.",
    tags: ["UI", "UX", "Design"],
  },

  /* ==========================================================
     BRAINSTORMING
     ========================================================== */

  {
    id: "idea-generator",
    title: "Creative Idea Generator",
    category: "Brainstorming",
    difficulty: "Beginner",
    description:
      "Generate diverse and practical ideas around a problem.",
    prompt:
      "Act as a creative strategist. Generate 15 diverse ideas for the following problem or opportunity. Include safe and practical ideas as well as unconventional approaches. Briefly explain the potential value of each idea.",
    tags: ["Ideas", "Creativity", "Brainstorming"],
    popular: true,
  },

  /* ==========================================================
     SUMMARIZATION
     ========================================================== */

  {
    id: "smart-summarizer",
    title: "Smart Text Summarizer",
    category: "Summarization",
    difficulty: "Beginner",
    description:
      "Create concise summaries while preserving important information.",
    prompt:
      "Summarize the following content while preserving all important information. Provide a concise overview followed by key points, important facts, decisions, and actionable information. Remove repetition and unnecessary details.",
    tags: ["Summary", "Text", "Notes"],
  },

  /* ==========================================================
     COMMUNICATION
     ========================================================== */

  {
    id: "communication-coach",
    title: "Communication Coach",
    category: "Communication",
    difficulty: "Intermediate",
    description:
      "Improve difficult or important professional communication.",
    prompt:
      "Act as a professional communication coach. Help me communicate the following message clearly and respectfully. Preserve my intended meaning while improving tone, structure, empathy, confidence, and clarity. Provide two alternative versions with different tones.",
    tags: ["Communication", "Tone", "Professional"],
  },

  /* ==========================================================
     PROJECT MANAGEMENT
     ========================================================== */

  {
    id: "project-manager",
    title: "AI Project Manager",
    category: "Project Management",
    difficulty: "Advanced",
    description:
      "Break projects into phases, milestones, tasks, and risks.",
    prompt:
      "Act as a senior project manager. Convert the following project idea into a structured execution plan. Define objectives, phases, milestones, tasks, dependencies, owners, risks, deliverables, timelines, and success criteria.",
    tags: ["Project", "Management", "Planning"],
    featured: true,
  },

  /* ==========================================================
     PRESENTATIONS
     ========================================================== */

  {
    id: "presentation-builder",
    title: "Presentation Structure Builder",
    category: "Presentations",
    difficulty: "Intermediate",
    description:
      "Create a professional presentation structure.",
    prompt:
      "Act as an expert presentation designer. Create a professional presentation structure for the following topic. Provide slide titles, key points, suggested visuals, speaker notes, and a logical narrative that keeps the audience engaged.",
    tags: ["Presentation", "Slides", "Public Speaking"],
  },

  /* ==========================================================
     TRANSLATION
     ========================================================== */

  {
    id: "professional-translator",
    title: "Professional Translator",
    category: "Translation",
    difficulty: "Intermediate",
    description:
      "Translate content while preserving meaning and tone.",
    prompt:
      "Translate the following content from the source language to the target language. Preserve the original meaning, context, tone, formatting, and intent. Avoid literal translations when a natural equivalent is more appropriate.",
    tags: ["Translation", "Language", "Localization"],
  },
];

/* ============================================================
   CATEGORIES
   ============================================================ */

const categories = [
  "All",
  "Coding",
  "AI & ML",
  "Content Writing",
  "Research",
  "Business",
  "Marketing",
  "Education",
  "Career",
  "HR",
  "Finance",
  "Productivity",
  "Email",
  "Data & Analytics",
  "Design",
  "Brainstorming",
  "Summarization",
  "Communication",
  "Project Management",
  "Presentations",
  "Translation",
];

const difficulties = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

/* ============================================================
   CATEGORY ICONS
   ============================================================ */

const categoryIcons: Record<string, string> = {
  Coding: "💻",
  "AI & ML": "🤖",
  "Content Writing": "✍️",
  Research: "🔬",
  Business: "💼",
  Marketing: "📣",
  Education: "🎓",
  Career: "🚀",
  HR: "👥",
  Finance: "💰",
  Productivity: "⚡",
  Email: "✉️",
  "Data & Analytics": "📊",
  Design: "🎨",
  Brainstorming: "💡",
  Summarization: "📝",
  Communication: "💬",
  "Project Management": "📋",
  Presentations: "🎤",
  Translation: "🌐",
};

/* ============================================================
   PAGE
   ============================================================ */

export default function TemplatesPage() {
  const [templates, setTemplates] =
    useState<Template[]>(builtInTemplates);

  const [category, setCategory] =
    useState("All");

  const [difficulty, setDifficulty] =
    useState("All Levels");

  const [search, setSearch] =
    useState("");

  const [copiedId, setCopiedId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  /* ==========================================================
     FETCH BACKEND TEMPLATES
     ========================================================== */

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await API.get(
          "/prompt-templates"
        );

        if (
          res.data?.success &&
          Array.isArray(res.data.templates)
        ) {
          const backendTemplates: Template[] =
            res.data.templates.map(
              (item: any, index: number) => ({
                id:
                  item._id ||
                  `backend-${index}`,
                _id: item._id,
                title:
                  item.title ||
                  "Untitled Prompt",
                category:
                  item.category ||
                  "Other",
                difficulty:
                  item.difficulty ||
                  "Beginner",
                description:
                  item.description ||
                  "Professional ready-to-use prompt.",
                prompt:
                  item.prompt ||
                  "",
                tags:
                  Array.isArray(item.tags)
                    ? item.tags
                    : [],
                featured:
                  Boolean(item.featured),
                popular:
                  Boolean(item.popular),
              })
            );

          /*
           * Backend templates override built-in templates
           * when they have the same title.
           */

          const merged = [
            ...backendTemplates,
            ...builtInTemplates.filter(
              (builtIn) =>
                !backendTemplates.some(
                  (backend) =>
                    backend.title.toLowerCase() ===
                    builtIn.title.toLowerCase()
                )
            ),
          ];

          setTemplates(merged);
        }
      } catch (error) {
        console.log(
          "Using built-in prompt library:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  /* ==========================================================
     FILTERING
     ========================================================== */

  const filteredTemplates = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesCategory =
        category === "All" ||
        template.category === category;

      const matchesDifficulty =
        difficulty === "All Levels" ||
        template.difficulty === difficulty;

      const searchableText = [
        template.title,
        template.description,
        template.prompt,
        template.category,
        ...template.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      return (
        matchesCategory &&
        matchesDifficulty &&
        matchesSearch
      );
    });
  }, [
    templates,
    category,
    difficulty,
    search,
  ]);

  /* ==========================================================
     FEATURED
     ========================================================== */

  const featuredTemplates =
    useMemo(() => {
      return templates
        .filter(
          (template) => template.featured
        )
        .slice(0, 4);
    }, [templates]);

  /* ==========================================================
     POPULAR
     ========================================================== */

  const popularTemplates =
    useMemo(() => {
      return templates
        .filter(
          (template) => template.popular
        )
        .slice(0, 6);
    }, [templates]);

  /* ==========================================================
     COPY
     ========================================================== */

  const copyPrompt = async (
    template: Template
  ) => {
    try {
      await navigator.clipboard.writeText(
        template.prompt
      );

      setCopiedId(template.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  };

  /* ==========================================================
     RESET
     ========================================================== */

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setDifficulty("All Levels");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">

      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">

        {/* Decorative background */}

        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">

            {/* LEFT */}

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-violet-600">

                <span className="h-2 w-2 rounded-full bg-violet-500" />

                Prompto Prompt Library

              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">

                Ready-made prompts.

                <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                  Ready to use.
                </span>

              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Explore a growing library of professional
                AI prompts for coding, research, business,
                education, marketing, career, productivity,
                and everyday work.
              </p>

              {/* Stats */}

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                  <p className="text-2xl font-black text-slate-950">
                    {templates.length}+
                  </p>

                  <p className="text-xs font-semibold text-slate-500">
                    Ready prompts
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                  <p className="text-2xl font-black text-slate-950">
                    {categories.length - 1}
                  </p>

                  <p className="text-xs font-semibold text-slate-500">
                    Categories
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                  <p className="text-2xl font-black text-slate-950">
                    3
                  </p>

                  <p className="text-xs font-semibold text-slate-500">
                    Skill levels
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT VISUAL */}

            <div className="relative hidden lg:block">

              <div className="relative mx-auto max-w-md">

                {/* Main library card */}

                <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)]">

                  <div className="mb-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-xl text-white">
                        ✦
                      </div>

                      <div>

                        <p className="font-black text-slate-900">
                          Prompt Library
                        </p>

                        <p className="text-xs text-slate-400">
                          Curated for better AI results
                        </p>

                      </div>

                    </div>

                    <span className="h-3 w-3 rounded-full bg-emerald-400" />

                  </div>

                  <div className="space-y-3">

                    {[
                      ["💻", "Python Code Reviewer", "Coding"],
                      ["🔬", "Research Assistant", "Research"],
                      ["🚀", "Interview Coach", "Career"],
                      ["📣", "Marketing Strategy", "Marketing"],
                    ].map(
                      ([icon, title, cat]) => (
                        <div
                          key={title}
                          className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                        >

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                            {icon}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-bold text-slate-800">
                              {title}
                            </p>

                            <p className="text-xs text-slate-400">
                              {cat}
                            </p>

                          </div>

                          <span className="ml-auto text-slate-300">
                            →
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* Floating badge */}

                <div className="absolute -bottom-5 -left-6 rounded-2xl border border-emerald-100 bg-white px-5 py-3 shadow-xl">

                  <p className="text-xs font-semibold text-slate-400">
                    Ready to copy
                  </p>

                  <p className="font-black text-emerald-600">
                    One click →
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ====================================================
          LIBRARY
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">

        {/* ==================================================
            SEARCH PANEL
        ================================================== */}

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

            {/* Search */}

            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                🔍
              </span>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search prompts, categories, skills, or use cases..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

            </div>

            {/* Difficulty */}

            <div className="flex flex-wrap gap-2">

              {difficulties.map(
                (level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setDifficulty(level)
                    }
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                      difficulty === level
                        ? "bg-slate-950 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {level}
                  </button>
                )
              )}

            </div>

          </div>

        </div>


        {/* ==================================================
            CATEGORY NAVIGATION
        ================================================== */}

        <div className="mt-7">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-500">
                Explore
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-950">
                Browse by category
              </h2>

            </div>

            {(category !== "All" ||
              difficulty !== "All Levels" ||
              search) && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-violet-600 hover:text-violet-800"
              >
                Clear filters
              </button>
            )}

          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">

            {categories.map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setCategory(cat)
                  }
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                    category === cat
                      ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >

                  {cat !== "All" && (
                    <span>
                      {categoryIcons[cat]}
                    </span>
                  )}

                  {cat}

                </button>
              )
            )}

          </div>

        </div>


        {/* ==================================================
            FEATURED
        ================================================== */}

        {!search &&
          category === "All" &&
          difficulty === "All Levels" &&
          featuredTemplates.length > 0 && (
            <div className="mt-12">

              <div className="mb-6 flex items-end justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="text-xl">
                      ✨
                    </span>

                    <h2 className="text-2xl font-black text-slate-950">
                      Featured prompts
                    </h2>

                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    High-value prompts to get started quickly.
                  </p>

                </div>

              </div>

              <div className="grid gap-5 lg:grid-cols-2">

                {featuredTemplates
                  .slice(0, 4)
                  .map((template) =>
                    renderTemplateCard(
                      template,
                      true,
                      copiedId,
                      copyPrompt
                    )
                  )}

              </div>

            </div>
          )}


        {/* ==================================================
            POPULAR
        ================================================== */}

        {!search &&
          category === "All" &&
          difficulty === "All Levels" &&
          popularTemplates.length > 0 && (
            <div className="mt-12">

              <div className="mb-6">

                <div className="flex items-center gap-2">

                  <span className="text-xl">
                    🔥
                  </span>

                  <h2 className="text-2xl font-black text-slate-950">
                    Popular right now
                  </h2>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Frequently useful prompts across different workflows.
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {popularTemplates.map(
                  (template) =>
                    renderTemplateCard(
                      template,
                      false,
                      copiedId,
                      copyPrompt
                    )
                )}

              </div>

            </div>
          )}


        {/* ==================================================
            ALL PROMPTS
        ================================================== */}

        <div className="mt-14">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-500">
                Prompt collection
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {search ||
                category !== "All" ||
                difficulty !== "All Levels"
                  ? "Matching prompts"
                  : "All prompts"}
              </h2>

            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
              {filteredTemplates.length}{" "}
              prompt
              {filteredTemplates.length === 1
                ? ""
                : "s"}
            </div>

          </div>


          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="h-[350px] animate-pulse rounded-[24px] border border-slate-200 bg-white"
                  />
                )
              )}

            </div>
          ) : filteredTemplates.length === 0 ? (

            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                🔎
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900">
                No prompts found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try another keyword or clear your filters
                to explore the complete prompt library.
              </p>

              <button
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
              >
                Show all prompts
              </button>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredTemplates.map(
                (template) =>
                  renderTemplateCard(
                    template,
                    false,
                    copiedId,
                    copyPrompt
                  )
              )}

            </div>

          )}

        </div>

      </section>


      {/* ====================================================
          BOTTOM CTA
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">

        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 px-7 py-10 text-white sm:px-10">

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/30 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-300">
                Build your own
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Have a prompt idea?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Start with one of these templates, customize it,
                evaluate it, and turn it into your own reusable
                prompt workflow.
              </p>

            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

              <p className="text-xs font-semibold text-slate-400">
                Prompt engineering
              </p>

              <p className="mt-1 font-black text-white">
                Learn → Practice → Improve
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   TEMPLATE CARD RENDERER
   ============================================================ */

function renderTemplateCard(
  template: Template,
  featured: boolean,
  copiedId: string | null,
  copyPrompt: (template: Template) => void
) {
  const icon =
    categoryIcons[template.category] || "✨";

  const difficultyColor =
    template.difficulty === "Beginner"
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : template.difficulty === "Intermediate"
      ? "bg-amber-50 text-amber-600 border-amber-100"
      : "bg-violet-50 text-violet-600 border-violet-100";

  return (
    <article
      key={template.id}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)] ${
        featured
          ? "border-violet-200"
          : "border-slate-200"
      }`}
    >

      {/* Top accent */}

      <div
        className={`h-1 ${
          featured
            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
            : "bg-slate-100"
        }`}
      />

      <div className="flex flex-1 flex-col p-5">

        {/* META */}

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-base">
              {icon}
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
              {template.category}
            </span>

          </div>

          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${difficultyColor}`}
          >
            {template.difficulty}
          </span>

        </div>


        {/* TITLE */}

        <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950 transition-colors group-hover:text-violet-600">
          {template.title}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
          {template.description}
        </p>


        {/* PROMPT PREVIEW */}

        <div className="relative mt-5 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
              Prompt preview
            </span>

            {template.popular && (
              <span className="text-[10px] font-bold text-orange-500">
                🔥 Popular
              </span>
            )}

          </div>

          <p className="line-clamp-5 whitespace-pre-wrap text-xs leading-5 text-slate-600">
            {template.prompt}
          </p>

        </div>


        {/* TAGS */}

        {template.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">

            {template.tags
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500"
                >
                  #{tag}
                </span>
              ))}

          </div>
        )}


        {/* COPY */}

        <button
          onClick={() =>
            copyPrompt(template)
          }
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold transition-all ${
            copiedId === template.id
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
              : featured
              ? "bg-violet-600 text-white shadow-lg shadow-violet-100 hover:bg-violet-700"
              : "bg-slate-950 text-white hover:bg-violet-600"
          }`}
        >

          {copiedId === template.id ? (
            <>
              <span>✓</span>
              Copied to clipboard
            </>
          ) : (
            <>
              <span>⧉</span>
              Copy Prompt
            </>
          )}

        </button>

      </div>

    </article>
  );
}