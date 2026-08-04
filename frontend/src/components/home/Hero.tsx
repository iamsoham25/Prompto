"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Lightbulb,
  Play,
  Sparkles,
} from "lucide-react";

const scoreBars = [
  {
    label: "Clarity",
    value: 92,
  },
  {
    label: "Context",
    value: 86,
  },
  {
    label: "Constraints",
    value: 78,
  },
];

const benefits = [
  "Structured Learning",
  "AI Evaluation",
  "Real Challenges",
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="
        relative
        min-h-[calc(100svh-5rem)]
        overflow-hidden
        bg-[#12052f]
        text-white
      "
    >
      {/* ========================================= */}
      {/* BACKGROUND GRADIENT */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#4338ca]
          via-[#8617e8]
          to-[#ec268f]
        "
      />

      {/* ========================================= */}
      {/* ANIMATED GLOW BLOBS */}
      {/* ========================================= */}

      <motion.div
        className="
          absolute
          -left-32
          top-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-400/30
          blur-[110px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 70, 0],
                y: [0, 40, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          right-[-120px]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-pink-400/30
          blur-[120px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[-220px]
          left-[35%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-300/20
          blur-[130px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 50, -30, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================= */}
      {/* GRID */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.13]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ========================================= */}
      {/* TOP LIGHT */}
      {/* ========================================= */}

      <div
        className="
          absolute
          left-1/2
          top-[-200px]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-white/10
          blur-[130px]
        "
      />

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1500px]
          grid-cols-1
          items-center
          gap-14
          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16
          lg:px-12
          lg:py-24

          xl:px-16
        "
      >
        {/* ========================================= */}
        {/* LEFT SIDE */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-3xl"
        >
          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.5,
            }}
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/25
              bg-white/10
              px-4
              py-2
              text-sm
              font-semibold
              backdrop-blur-xl

              sm:px-5
              sm:text-base
            "
          >
            <Sparkles size={18} />

            The Future of AI Learning
          </motion.div>

          {/* Heading */}

          <h1
            className="
              max-w-[900px]
              text-[clamp(3rem,7vw,6.7rem)]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.055em]
            "
          >
            Master AI
            <br />

            <span
              className="
                bg-gradient-to-r
                from-white
                via-white
                to-pink-100
                bg-clip-text
                text-transparent
              "
            >
              Prompting
            </span>

            <br />

            Like a
            <br />

            Professional.
          </h1>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.6,
            }}
            className="
              mt-8
              max-w-2xl
              text-base
              leading-8
              text-white/80

              sm:text-lg

              xl:text-xl
            "
          >
            Learn how to communicate with Artificial Intelligence through
            structured learning, hands-on practice, intelligent evaluation,
            real challenges and continuous feedback.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.6,
            }}
            className="
              mt-9
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:flex-wrap
            "
          >
            <Link
              href="/learn"
              className="
                group
                inline-flex
                min-h-14
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-orange-500
                px-7
                py-4
                font-bold
                text-white
                shadow-[0_15px_40px_rgba(249,115,22,0.35)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-orange-600
                hover:shadow-[0_20px_50px_rgba(249,115,22,0.45)]
              "
            >
              Start Learning

              <ArrowRight
                size={19}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/playground"
              className="
                group
                inline-flex
                min-h-14
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-white/30
                bg-white
                px-7
                py-4
                font-bold
                text-slate-950
                shadow-xl
                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-white/90
              "
            >
              <Play
                size={18}
                fill="currentColor"
              />

              Explore Playground
            </Link>
          </motion.div>

          {/* Benefits */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              gap-x-6
              gap-y-3
            "
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45 + index * 0.12,
                  duration: 0.45,
                }}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-white/85

                  sm:text-base
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/50
                  "
                >
                  <Check size={12} />
                </span>

                {benefit}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.25,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            mx-auto
            w-full
            max-w-[620px]
          "
        >
          {/* Decorative glow */}

          <div
            className="
              absolute
              -inset-8
              rounded-[50px]
              bg-white/10
              blur-3xl
            "
          />

          {/* Floating card */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -9, 0],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/50
              bg-white
              text-slate-950
              shadow-[0_35px_100px_rgba(15,23,42,0.35)]
            "
          >
            {/* Evaluator header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                px-5
                py-4

                sm:px-7
                sm:py-5
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-orange-100
                    text-xl
                  "
                >
                  🧠
                </div>

                <div>
                  <h3
                    className="
                      text-base
                      font-extrabold
                      text-slate-950

                      sm:text-lg
                    "
                  >
                    Prompt Evaluator
                  </h3>

                  <p className="text-xs text-slate-500 sm:text-sm">
                    AI-powered analysis
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Evaluator body */}

            <div className="p-5 sm:p-7">
              <p
                className="
                  mb-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-slate-400
                "
              >
                Your Prompt
              </p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                }}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  text-sm
                  leading-6
                  text-slate-700

                  sm:p-5
                  sm:text-base
                "
              >
                Act as an AI product strategist. Analyze the following product
                idea and provide its target audience, key features, risks and a
                structured launch plan.
              </motion.div>

              {/* Score */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 1.1,
                  duration: 0.5,
                }}
                className="
                  mt-5
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-50
                  to-pink-50
                  p-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p className="text-sm text-slate-500">
                    Overall Score
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="
                        text-4xl
                        font-black
                        text-slate-950
                      "
                    >
                      87
                    </motion.span>

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
                    text-xs
                    font-extrabold
                    text-emerald-700

                    sm:text-sm
                  "
                >
                  STRONG PROMPT
                </span>
              </motion.div>

              {/* Bars */}

              <div className="mt-6 space-y-5">
                {scoreBars.map((score, index) => (
                  <div key={score.label}>
                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        justify-between
                        text-sm
                        font-semibold
                      "
                    >
                      <span>{score.label}</span>

                      <span>{score.value}</span>
                    </div>

                    <div
                      className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      "
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${score.value}%`,
                        }}
                        transition={{
                          delay: 1.5 + index * 0.2,
                          duration: 0.9,
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
                ))}
              </div>

              {/* Tip */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 2.3,
                  duration: 0.5,
                }}
                className="
                  mt-6
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-orange-200
                  bg-orange-50
                  p-4
                  text-sm
                  font-medium
                  text-orange-800
                "
              >
                <Lightbulb
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                Add clearer output constraints to improve this prompt further.
              </motion.div>
            </div>
          </motion.div>

          {/* Floating XP */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 7, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -bottom-7
              -left-3
              hidden
              rounded-2xl
              border
              border-white/50
              bg-white
              px-5
              py-4
              text-slate-950
              shadow-2xl

              sm:block
              lg:-left-8
            "
          >
            <p className="text-xs text-slate-500">
              Challenge Reward
            </p>

            <p className="mt-1 font-black text-orange-500">
              +80 XP ⚡
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================= */}
      {/* SCROLL INDICATOR */}
      {/* ========================================= */}

      <motion.a
        href="#what-is-prompto"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 7, 0],
              }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="
          relative
          z-20
          mx-auto
          mb-8
          flex
          w-fit
          items-center
          gap-2
          text-xs
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white/65

          sm:text-sm
        "
      >
        Scroll to Explore

        <ChevronDown size={17} />
      </motion.a>
    </section>
  );
}