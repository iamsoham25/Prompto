"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Bot,
  Braces,
  Building2,
  Check,
  Crown,
  Database,
  GitBranch,
  Layers3,
  MessageSquareText,
  Network,
  Rocket,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

const roadmap = [
  {
    number: "01",
    level: "Beginner",
    subtitle: "Build the Foundation",
    description:
      "Learn how prompts work and understand the building blocks of effective AI instructions.",
    icon: BookOpen,
    topics: [
      {
        name: "Prompt Engineering Basics",
        icon: MessageSquareText,
      },
      {
        name: "Role Definition",
        icon: BrainCircuit,
      },
      {
        name: "Context",
        icon: Layers3,
      },
      {
        name: "Constraints",
        icon: Target,
      },
      {
        name: "Output Format",
        icon: Braces,
      },
    ],
    color: "orange",
  },

  {
    number: "02",
    level: "Intermediate",
    subtitle: "Control AI Better",
    description:
      "Move beyond basic prompting and learn techniques for structured, reliable AI responses.",
    icon: GitBranch,
    topics: [
      {
        name: "Few-Shot Prompting",
        icon: Layers3,
      },
      {
        name: "JSON Prompting",
        icon: Braces,
      },
      {
        name: "Prompt Chaining",
        icon: GitBranch,
      },
      {
        name: "Structured Outputs",
        icon: Workflow,
      },
    ],
    color: "purple",
  },

  {
    number: "03",
    level: "Advanced",
    subtitle: "Build AI Systems",
    description:
      "Learn how prompting becomes part of larger AI applications, retrieval systems and workflows.",
    icon: Database,
    topics: [
      {
        name: "RAG Prompting",
        icon: Database,
      },
      {
        name: "AI Agents",
        icon: Bot,
      },
      {
        name: "Prompt Evaluation",
        icon: Target,
      },
      {
        name: "Prompt Optimization",
        icon: Sparkles,
      },
    ],
    color: "pink",
  },

  {
    number: "04",
    level: "Expert",
    subtitle: "Engineer AI Workflows",
    description:
      "Design sophisticated agent workflows and understand production-level Prompt Engineering.",
    icon: Network,
    topics: [
      {
        name: "Multi-Agent Systems",
        icon: Network,
      },
      {
        name: "Agent Workflows",
        icon: Workflow,
      },
      {
        name: "Enterprise Prompting",
        icon: Building2,
      },
      {
        name: "Production AI",
        icon: Rocket,
      },
    ],
    color: "indigo",
  },

  {
    number: "05",
    level: "Master",
    subtitle: "Think Like an AI Engineer",
    description:
      "Combine everything you have learned to solve complex real-world Prompt Engineering problems.",
    icon: Crown,
    topics: [
      {
        name: "Advanced Evaluation",
        icon: Target,
      },
      {
        name: "AI Architecture",
        icon: BrainCircuit,
      },
      {
        name: "Complex Workflows",
        icon: Workflow,
      },
      {
        name: "Real-World Projects",
        icon: Rocket,
      },
    ],
    color: "emerald",
  },
];

const styles = {
  orange: {
    icon: "bg-orange-500",
    text: "text-orange-500",
    soft: "bg-orange-50",
    border: "border-orange-200",
  },

  purple: {
    icon: "bg-purple-600",
    text: "text-purple-600",
    soft: "bg-purple-50",
    border: "border-purple-200",
  },

  pink: {
    icon: "bg-pink-500",
    text: "text-pink-500",
    soft: "bg-pink-50",
    border: "border-pink-200",
  },

  indigo: {
    icon: "bg-indigo-600",
    text: "text-indigo-600",
    soft: "bg-indigo-50",
    border: "border-indigo-200",
  },

  emerald: {
    icon: "bg-emerald-500",
    text: "text-emerald-600",
    soft: "bg-emerald-50",
    border: "border-emerald-200",
  },
};

export default function LearningRoadmap() {
  return (
    <section
      id="learning-roadmap"
      className="
        relative
        overflow-hidden
        bg-[#f8fafc]
        py-24

        sm:py-28
        lg:py-36
      "
    >
      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[450px]
          w-[450px]
          rounded-full
          bg-orange-100/70
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-[35%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-100/70
          blur-[160px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-200px]
          left-[35%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-pink-100/60
          blur-[160px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1450px]
          px-5

          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-orange-50
              px-4
              py-2
            "
          >
            <BookOpen
              size={15}
              className="text-orange-500"
            />

            <span
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.22em]
                text-orange-600
              "
            >
              Learning Roadmap
            </span>
          </div>

          <h2
            className="
              mt-6
              text-4xl
              font-black
              leading-[1.05]
              tracking-[-0.045em]
              text-slate-950

              sm:text-5xl
              lg:text-7xl
            "
          >
            Start as a beginner.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-orange-500
                via-purple-600
                to-pink-500
                bg-clip-text
                text-transparent
              "
            >
              Grow into an AI expert.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-slate-600

              sm:text-lg
            "
          >
            Follow a structured path from Prompt Engineering fundamentals
            to RAG, AI agents, enterprise prompting and production AI
            workflows.
          </p>
        </motion.div>

        {/* Progress labels */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            mt-14
            hidden
            max-w-5xl
            items-center
            justify-between

            lg:flex
          "
        >
          {roadmap.map((stage, index) => (
            <div
              key={stage.level}
              className="flex items-center"
            >
              <span
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-slate-400
                "
              >
                {stage.level}
              </span>

              {index !== roadmap.length - 1 && (
                <ArrowRight
                  size={15}
                  className="ml-5 text-slate-300"
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Roadmap */}

        <div
          className="
            relative
            mx-auto
            mt-16
            max-w-6xl
          "
        >
          {/* Main vertical path */}

          <div
            className="
              absolute
              bottom-16
              left-[35px]
              top-16
              w-[2px]
              bg-slate-200

              md:left-1/2
              md:-translate-x-1/2
            "
          >
            <motion.div
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                h-full
                origin-top
                bg-gradient-to-b
                from-orange-500
                via-purple-500
                to-emerald-500
              "
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {roadmap.map((stage, index) => {
              const Icon = stage.icon;

              const theme =
                styles[
                  stage.color as keyof typeof styles
                ];

              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={stage.level}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.55,
                  }}
                  className="
                    relative
                    grid
                    grid-cols-[72px_1fr]
                    gap-5

                    md:grid-cols-[1fr_90px_1fr]
                    md:gap-7
                  "
                >
                  {/* Desktop left */}

                  <div
                    className={`
                      hidden
                      md:block

                      ${
                        isLeft
                          ? ""
                          : "md:col-start-3"
                      }
                    `}
                  >
                    {isLeft && (
                      <RoadmapContent
                        stage={stage}
                        theme={theme}
                      />
                    )}
                  </div>

                  {/* Center node */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      justify-center

                      md:col-start-2
                      md:row-start-1
                    "
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 3,
                      }}
                      className={`
                        flex
                        h-[72px]
                        w-[72px]
                        items-center
                        justify-center
                        rounded-[22px]
                        border-[6px]
                        border-[#f8fafc]
                        text-white
                        shadow-xl

                        ${theme.icon}
                      `}
                    >
                      <Icon size={25} />
                    </motion.div>
                  </div>

                  {/* Mobile */}

                  <div className="md:hidden">
                    <RoadmapContent
                      stage={stage}
                      theme={theme}
                    />
                  </div>

                  {/* Desktop right */}

                  {!isLeft && (
                    <div
                      className="
                        hidden

                        md:col-start-3
                        md:row-start-1
                        md:block
                      "
                    >
                      <RoadmapContent
                        stage={stage}
                        theme={theme}
                      />
                    </div>
                  )}

                  {/* Empty right side */}

                  {isLeft && (
                    <div
                      className="
                        hidden

                        md:col-start-3
                        md:block
                      "
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Completion / CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mx-auto
            mt-24
            max-w-5xl
            overflow-hidden
            rounded-[32px]
            bg-slate-950
            px-6
            py-10
            text-white
            shadow-2xl

            sm:px-10
            lg:px-14
            lg:py-12
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="max-w-2xl">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-emerald-400
                "
              >
                <Check size={18} />

                Structured progression
              </div>

              <h3
                className="
                  mt-4
                  text-3xl
                  font-black
                  tracking-[-0.03em]

                  sm:text-4xl
                "
              >
                Your next skill always has a path.
              </h3>

              <p
                className="
                  mt-4
                  max-w-xl
                  leading-7
                  text-slate-400
                "
              >
                Learn concepts in order, practice them with real tools and
                build the skills required for modern AI applications.
              </p>
            </div>

            <Link
              href="/learn"
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-orange-500
                px-7
                py-4
                font-black
                text-white
                shadow-lg
                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-orange-600
                hover:shadow-orange-500/20
              "
            >
              Explore Learning

              <ArrowRight
                size={19}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RoadmapContent({
  stage,
  theme,
}: {
  stage: (typeof roadmap)[number];
  theme: (typeof styles)[keyof typeof styles];
}) {
  return (
    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl

        sm:p-7
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <span
          className={`
            text-xs
            font-black
            uppercase
            tracking-[0.18em]

            ${theme.text}
          `}
        >
          Level {stage.number}
        </span>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs font-bold

            ${theme.soft}
            ${theme.text}
          `}
        >
          {stage.subtitle}
        </span>
      </div>

      <h3
        className=" mt-5 text-3xl font-black tracking-[-0.03em] text-slate-950 "
      >
        {stage.level}
      </h3>

      <p
        className=" mt-4 leading-7 text-slate-600 "
      >
        {stage.description}
      </p>

      <div
        className=" mt-6 flex flex-wrap gap-2 "
      >
        {stage.topics.map((topic) => {
          const TopicIcon = topic.icon;

          return (
            <div
              key={topic.name}
              className={` inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold

                ${theme.soft}
                ${theme.text}
                ${theme.border}
              `}
            >
              <TopicIcon size={13} />

              {topic.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}