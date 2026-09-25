"use client";

import { motion, useReducedMotion } from "framer-motion";

import { BookOpen, BrainCircuit, ChartNoAxesCombined, FlaskConical, Sparkles, TrendingUp,} 

from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Learn",
    description: "Build strong foundations with structured Prompt Engineering lessons.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Practice",
    description: "Experiment with real prompts using an interactive AI playground.",
    icon: FlaskConical,
  },
  {
    number: "03",
    title: "Analyze",
    description: "Understand clarity, context, role, constraints and output quality.",
    icon: ChartNoAxesCombined,
  },
  {
    number: "04",
    title: "Improve",
    description: "Turn weak instructions into clearer and more effective prompts.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Track",
    description: "Follow your scores, learning progress, XP and Prompt Engineering growth.",
    icon: Sparkles,
  },
  {
    number: "06",
    title: "Master",
    description: "Progress from beginner concepts toward advanced AI communication skills.",
    icon: BrainCircuit,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease,
    },
  },
};

export default function WhatIsPrompto() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="what-is-prompto"
      className="
        relative overflow-hidden
        bg-white py-20

        sm:py-24
        lg:py-32
      "
    >
      {/* Lightweight decorative gradients */}

      <div className=" pointer-events-none absolute left-0 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-50 " />

        <div className=" pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/2 rounded-full bg-orange-50 " />

          <div className=" relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16 " >

            <motion.div
              initial={
                reduceMotion
                ? false
                  : {
                    opacity: 0,
                    y: 25,
                  }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.55,
                ease,
              }}
              className="mx-auto max-w-4xl text-center"
            >
          <span
            className="
              text-sm font-black uppercase
              tracking-[0.25em]
              text-orange-500
            "
          >
            What is Prompto?
          </span>

          <h2
            className="
              mt-5
              text-4xl font-black
              leading-tight
              tracking-[-0.04em]
              text-slate-950

              sm:text-5xl
              lg:text-6xl
            "
          >
            Prompt Engineering is more than

            <span
              className="
                bg-gradient-to-r
                from-indigo-600
                via-purple-600
                to-pink-500
                bg-clip-text
                text-transparent
              "
            >
              {" "}asking AI questions.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-6 max-w-3xl
              text-base leading-8
              text-slate-600

              sm:text-lg
            "
          >
            Prompto helps you learn how to communicate effectively with
            Artificial Intelligence by combining learning, experimentation,
            evaluation, improvement and measurable progress.
          </p>
        </motion.div>

        <motion.div
          variants={
            reduceMotion
              ? undefined
              : containerVariants
          }
          initial={
            reduceMotion
              ? undefined
              : "hidden"
          }
          whileInView={
            reduceMotion
              ? undefined
              : "visible"
          }
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            mt-16 grid
            grid-cols-1

            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                variants={
                  reduceMotion
                    ? undefined
                    : itemVariants
                }
                className="
                  group relative
                  min-h-[280px]
                  border-b border-slate-200
                  px-6 py-9

                  sm:px-8

                  md:border-r
                  md:[&:nth-child(even)]:border-r-0

                  lg:[&:nth-child(even)]:border-r
                  lg:[&:nth-child(3n)]:border-r-0
                "
              >
                <div className="flex items-start justify-between">
                  <span
                    className="
                      text-sm font-black
                      tracking-[0.2em]
                      text-orange-500
                    "
                  >
                    {step.number}
                  </span>

                  <div
                    className=" flex h-12 w-12 items-center justify-center
               rounded-2xl
                      bg-slate-100
                      text-slate-800
                      transition duration-200 group-hover:-translate-y-1 group-hover:bg-orange-500 group-hover:text-white "
                  >
                    <Icon size={22} />
                  </div>
                </div>

                <h3
                  className=" mt-12 text-3xl font-black tracking-[-0.03em] text-slate-950 "
                >
                  {step.title}
                </h3>

                <p
                  className=" mt-4 max-w-sm text-base leading-7 text-slate-600
                  "
                >
                  {step.description}
                </p>

                <div
                  className="
                    absolute bottom-0 left-0
                    h-[3px] w-0
                    bg-gradient-to-r
                    from-orange-500
                    via-purple-500
                    to-pink-500

                    transition-[width]
                    duration-300

                    group-hover:w-full
                  "
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}