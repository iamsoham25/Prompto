"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  FlaskConical,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Learn",
    description:
      "Build strong foundations with structured Prompt Engineering lessons.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Practice",
    description:
      "Experiment with real prompts using an interactive AI playground.",
    icon: FlaskConical,
  },
  {
    number: "03",
    title: "Analyze",
    description:
      "Understand clarity, context, role, constraints and output quality.",
    icon: ChartNoAxesCombined,
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Turn weak instructions into clearer and more effective prompts.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Track",
    description:
      "Follow your scores, learning progress, XP and Prompt Engineering growth.",
    icon: Sparkles,
  },
  {
    number: "06",
    title: "Master",
    description:
      "Progress from beginner concepts toward advanced AI communication skills.",
    icon: BrainCircuit,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [
        number,
        number,
        number,
        number,
      ],
    },
  },
};

export default function WhatIsPrompto() {
  return (
    <section
      id="what-is-prompto"
      className="
        relative
        overflow-hidden
        bg-white
        py-20

        sm:py-24
        lg:py-32
      "
    >
      {/* Decorative background */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-purple-100
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          right-[-150px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-orange-100
          blur-[130px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1400px]
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
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          <span
            className="
              text-sm
              font-black
              uppercase
              tracking-[0.25em]
              text-orange-500
            "
          >
            What is Prompto?
          </span>

          <h2
            className="
              mt-5
              text-4xl
              font-black
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
              {" "}
              asking AI questions.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-8
              text-slate-600

              sm:text-lg
            "
          >
            Prompto helps you learn how to communicate effectively with
            Artificial Intelligence by combining learning, experimentation,
            evaluation, improvement and measurable progress.
          </p>
        </motion.div>

        {/* Steps */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-16
            grid
            grid-cols-1

            md:grid-cols-2

            lg:grid-cols-3
          "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`
                  group
                  relative
                  min-h-[280px]
                  border-slate-200
                  px-6
                  py-9
                  transition-colors
                  duration-300

                  hover:bg-slate-50

                  sm:px-8

                  ${
                    index < 3
                      ? "lg:border-b"
                      : ""
                  }

                  ${
                    index % 3 !== 2
                      ? "lg:border-r"
                      : ""
                  }

                  border-b
                  last:border-b-0

                  md:[&:nth-child(odd)]:border-r

                  lg:[&:nth-child(odd)]:border-r-0
                `}
              >
                {/* Number */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span
                    className="
                      text-sm
                      font-black
                      tracking-[0.2em]
                      text-orange-500
                    "
                  >
                    {step.number}
                  </span>

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                      text-slate-800
                      transition-all
                      duration-300

                      group-hover:-translate-y-1
                      group-hover:bg-orange-500
                      group-hover:text-white
                      group-hover:shadow-lg
                    "
                  >
                    <Icon size={22} />
                  </div>
                </div>

                <h3
                  className="
                    mt-12
                    text-3xl
                    font-black
                    tracking-[-0.03em]
                    text-slate-950
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-sm
                    text-base
                    leading-7
                    text-slate-600
                  "
                >
                  {step.description}
                </p>

                {/* hover line */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[3px]
                    w-0
                    bg-gradient-to-r
                    from-orange-500
                    via-purple-500
                    to-pink-500
                    transition-all
                    duration-500

                    group-hover:w-full
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}