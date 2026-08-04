"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-gradient-to-br
            from-indigo-600
            via-purple-600
            to-pink-500
            px-5
            py-12
            shadow-2xl
            sm:rounded-[32px]
            sm:px-8
            sm:py-14
            md:px-10
            lg:min-h-[650px]
            lg:px-14
            lg:py-16
            xl:px-16
          "
        >
          {/* Background decoration */}

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, 25, 0],
                    y: [0, -20, 0],
                  }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -left-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-white/15
              blur-3xl
            "
          />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, -30, 0],
                    y: [0, 25, 0],
                  }
            }
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-20
              top-10
              h-80
              w-80
              rounded-full
              bg-pink-300/20
              blur-3xl
            "
          />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, 20, 0],
                    y: [0, 15, 0],
                  }
            }
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-[-140px]
              left-[40%]
              h-96
              w-96
              rounded-full
              bg-blue-300/20
              blur-3xl
            "
          />

          {/* Grid pattern */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              opacity-[0.08]
              [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
              [background-size:44px_44px]
            "
          />

          {/* Main content */}

          <div
            className="
              relative
              z-10
              grid
              items-center
              gap-12
              lg:grid-cols-[1.1fr_0.9fr]
              lg:gap-10
              xl:gap-16
            "
          >
            {/* LEFT */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div
                variants={itemVariants}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-white/15
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  backdrop-blur-md
                  sm:px-5
                  sm:text-base
                "
              >
                <Sparkles size={18} />

                Future of AI Learning
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="
                  mt-7
                  max-w-4xl
                  text-4xl
                  font-extrabold
                  leading-[1.08]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[64px]
                  xl:text-[72px]
                "
              >
                Master AI Prompting
                <span className="block text-white/95">
                  Like a Professional
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="
                  mt-6
                  max-w-2xl
                  text-base
                  leading-7
                  text-white/85
                  sm:text-lg
                  sm:leading-8
                  lg:text-xl
                "
              >
                Learn prompt engineering, AI agents, RAG, evaluation,
                optimization and production-ready prompting through
                structured lessons, hands-on practice and intelligent
                feedback.
              </motion.p>

              {/* Buttons */}

              <motion.div
                variants={itemVariants}
                className="
                  mt-8
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-4
                "
              >
                <Link
                  href="/learn"
                  className="
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-orange-500
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:bg-orange-600
                    hover:shadow-xl
                    sm:px-7
                  "
                >
                  Start Learning

                  <ArrowRight size={19} />
                </Link>

                <Link
                  href="/playground"
                  className="
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/30
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-slate-900
                    shadow-lg
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:bg-slate-50
                    hover:shadow-xl
                    sm:px-7
                  "
                >
                  <Play
                    size={18}
                    fill="currentColor"
                  />

                  Explore Playground
                </Link>
              </motion.div>

              {/* Mini features */}

              <motion.div
                variants={itemVariants}
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-3
                  text-sm
                  font-medium
                  text-white/85
                "
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  Structured Learning
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  AI Evaluation
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  Real Challenges
                </span>
              </motion.div>
            </motion.div>

            {/* RIGHT — PRODUCT PREVIEW */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative
                mx-auto
                w-full
                max-w-[520px]
                lg:mx-0
                lg:ml-auto
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? {}
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white/40
                  bg-white
                  shadow-2xl
                "
              >
                {/* Preview header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-100
                    px-5
                    py-4
                    sm:px-6
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-orange-100
                        text-orange-600
                      "
                    >
                      <BrainCircuit size={22} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Prompt Evaluator
                      </p>

                      <p className="text-xs text-slate-500">
                        AI-powered analysis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                </div>

                {/* Prompt */}

                <div className="p-5 sm:p-6">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
                    Your Prompt
                  </p>

                  <div
                    className="
                      mt-3
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      p-4
                    "
                  >
                    <p
                      className="
                        text-sm
                        leading-6
                        text-slate-700
                        sm:text-[15px]
                      "
                    >
                      Act as an AI product strategist. Analyze the
                      following product idea and provide its target
                      audience, key features, risks and a structured
                      launch plan.
                    </p>
                  </div>

                  {/* Score */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-col
                      gap-4
                      rounded-2xl
                      bg-gradient-to-r
                      from-indigo-50
                      via-purple-50
                      to-pink-50
                      p-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Overall Score
                      </p>

                      <div className="mt-1 flex items-end gap-2">
                        <span
                          className="
                            text-4xl
                            font-extrabold
                            text-slate-900
                          "
                        >
                          87
                        </span>

                        <span className="pb-1 text-slate-400">
                          / 100
                        </span>
                      </div>
                    </div>

                    <span
                      className="
                        w-fit
                        rounded-full
                        bg-emerald-100
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-emerald-700
                      "
                    >
                      Strong Prompt
                    </span>
                  </div>

                  {/* Skill scores */}

                  <div className="mt-5 space-y-4">
                    <ScoreBar
                      title="Clarity"
                      score={92}
                    />

                    <ScoreBar
                      title="Context"
                      score={86}
                    />

                    <ScoreBar
                      title="Constraints"
                      score={78}
                    />
                  </div>

                  <div
                    className="
                      mt-6
                      rounded-xl
                      border
                      border-orange-100
                      bg-orange-50
                      px-4
                      py-3
                    "
                  >
                    <p className="text-sm font-medium text-orange-800">
                      💡 Add clearer output constraints to improve this
                      prompt further.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating XP badge */}

              <motion.div
                animate={
                  reduceMotion
                    ? {}
                    : {
                        y: [0, 6, 0],
                        rotate: [-2, 1, -2],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -bottom-5
                  -left-2
                  hidden
                  rounded-2xl
                  border
                  border-white/50
                  bg-white
                  px-4
                  py-3
                  shadow-xl
                  sm:block
                  lg:-left-8
                "
              >
                <p className="text-xs font-semibold text-slate-500">
                  Challenge Reward
                </p>

                <p className="mt-1 font-extrabold text-orange-500">
                  +80 XP ⚡
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreBar({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">
          {title}
        </span>

        <span className="text-sm font-bold text-slate-900">
          {score}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            via-purple-500
            to-pink-500
          "
        />
      </div>
    </div>
  );
}