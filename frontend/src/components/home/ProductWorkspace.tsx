"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  GitCompareArrows,
  History,
  Lightbulb,
  Play,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
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

export default function ProductWorkspace() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24 sm:py-28 lg:py-36">
      {/* Background decorations */}

      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-purple-200/40 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-40 h-[420px] w-[420px] rounded-full bg-orange-200/50 blur-[140px]" />

      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
            <Sparkles size={16} />
            Everything You Need
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">
            Your complete
            <br />

            <span className="bg-gradient-to-r from-orange-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Prompt Engineering workspace.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Learn the concepts, experiment with AI, compare prompts,
            improve instructions, evaluate quality and track your
            progress — all inside one platform.
          </p>
        </motion.div>

        {/* Workspace */}

        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* PLAYGROUND */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="group relative overflow-hidden rounded-[32px] bg-slate-950 p-7 text-white shadow-xl lg:col-span-7 lg:p-10"
          >
            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-purple-600/30 blur-[90px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.22em] text-purple-400">
                    Experiment
                  </span>

                  <h3 className="mt-3 text-3xl font-black">
                    AI Playground
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Play size={21} />
                </div>
              </div>

              <p className="mt-4 max-w-xl leading-7 text-slate-400">
                Test prompts, experiment with instructions and understand
                how small changes affect AI responses.
              </p>

              {/* Fake Playground UI */}

              <div className="mt-9 rounded-[26px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Your Prompt
                  </span>

                  <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400">
                    Ready
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-300">
                  Act as a senior AI engineer and explain how Retrieval
                  Augmented Generation works using a practical example.
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 text-sm font-bold">
                    Run Prompt
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              <Link
                href="/playground"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:gap-3"
              >
                Open Playground
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          {/* EVALUATOR */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="group rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-5 lg:p-9"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                  Measure
                </span>

                <h3 className="mt-3 text-3xl font-black text-slate-950">
                  Prompt Evaluator
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <Target size={22} />
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              Measure prompt quality and understand where your
              instructions can improve.
            </p>

            <div className="mt-8 rounded-[24px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Overall Score
                  </p>

                  <p className="mt-1 text-5xl font-black text-slate-950">
                    87
                    <span className="ml-2 text-lg font-medium text-slate-400">
                      / 100
                    </span>
                  </p>
                </div>

                <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700">
                  STRONG
                </div>
              </div>

              <ScoreBar label="Clarity" score={92} />
              <ScoreBar label="Context" score={86} />
              <ScoreBar label="Constraints" score={78} />
            </div>

            <Link
              href="/evaluator"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:gap-3"
            >
              Evaluate a Prompt
              <ArrowRight size={17} />
            </Link>
          </motion.div>

          {/* COMPARATOR */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-5 lg:p-9"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.22em] text-purple-600">
                  Compare
                </span>

                <h3 className="mt-3 text-3xl font-black text-slate-950">
                  Prompt Comparator
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <GitCompareArrows size={22} />
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              Compare two prompts side-by-side and discover which
              instruction performs better.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <PromptScore
                name="Prompt A"
                score={76}
              />

              <PromptScore
                name="Prompt B"
                score={91}
                winner
              />
            </div>

            <Link
              href="/comparator"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:gap-3"
            >
              Compare Prompts
              <ArrowRight size={17} />
            </Link>
          </motion.div>

          {/* IMPROVER */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-7 text-white shadow-xl lg:col-span-7 lg:p-9"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-[70px]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                    Optimize
                  </span>

                  <h3 className="mt-3 text-3xl font-black">
                    Prompt Improver
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <WandSparkles size={22} />
                </div>
              </div>

              <p className="mt-4 max-w-xl leading-7 text-white/80">
                Transform vague instructions into structured,
                context-rich prompts designed for better AI responses.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-2xl bg-black/15 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Before
                  </p>

                  <p className="mt-3 text-sm">
                    Explain machine learning.
                  </p>
                </div>

                <ArrowRight className="mx-auto rotate-90 md:rotate-0" />

                <div className="rounded-2xl bg-white p-5 text-slate-900">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Improved
                  </p>

                  <p className="mt-3 text-sm leading-6">
                    Explain machine learning to a beginner using a
                    real-world example and simple terminology.
                  </p>
                </div>
              </div>

              <Link
                href="/improver"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold transition hover:gap-3"
              >
                Improve Your Prompt
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          {/* CHALLENGES */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="rounded-[32px] bg-[#fff7ed] p-7 lg:col-span-7 lg:p-9"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                  Practice
                </span>

                <h3 className="mt-3 text-3xl font-black text-slate-950">
                  Real Prompt Challenges
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <Lightbulb size={22} />
              </div>
            </div>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Solve practical Prompt Engineering problems, earn XP
              and build skills through hands-on challenges.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <ChallengeStat
                value="10"
                label="Challenge Tracks"
              />

              <ChallengeStat
                value="XP"
                label="Reward System"
              />

              <ChallengeStat
                value="AI"
                label="Evaluation"
              />
            </div>

            <Link
              href="/challenges"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:gap-3"
            >
              Explore Challenges
              <ArrowRight size={17} />
            </Link>
          </motion.div>

          {/* ANALYTICS */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="rounded-[32px] bg-slate-950 p-7 text-white lg:col-span-5 lg:p-9"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.22em] text-pink-400">
                  Progress
                </span>

                <h3 className="mt-3 text-3xl font-black">
                  Analytics
                </h3>
              </div>

              <BarChart3 className="text-pink-400" />
            </div>

            <p className="mt-4 leading-7 text-slate-400">
              See how your Prompt Engineering skills improve over time.
            </p>

            {/* Lightweight graph */}

            <div className="mt-10 flex h-36 items-end gap-3">
              {[35, 48, 42, 62, 58, 75, 70, 88].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-purple-600 to-pink-400 transition-all duration-300 hover:opacity-70"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                )
              )}
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <Check size={17} />
              Your skills are improving
            </div>

            <Link
              href="/analytics"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold transition hover:gap-3"
            >
              View Analytics
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>

        {/* Secondary features */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="mt-6 grid gap-4 md:grid-cols-3"
        >
          <MiniFeature
            title="Prompt Templates"
            description="Start faster with reusable prompt structures."
            href="/templates"
            icon={<Sparkles size={20} />}
          />

          <MiniFeature
            title="Prompt History"
            description="Review and revisit your previous prompts."
            href="/history"
            icon={<History size={20} />}
          />

          <MiniFeature
            title="Structured Learning"
            description="Build Prompt Engineering skills step by step."
            href="/learn"
            icon={<Lightbulb size={20} />}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* Small reusable components                        */
/* ------------------------------------------------ */

function ScoreBar({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="mt-5">
      <div className="flex justify-between text-sm font-bold text-slate-700">
        <span>{label}</span>
        <span>{score}</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}

function PromptScore({
  name,
  score,
  winner = false,
}: {
  name: string;
  score: number;
  winner?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        winner
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-600">
          {name}
        </span>

        {winner && (
          <Check
            size={17}
            className="text-emerald-600"
          />
        )}
      </div>

      <p className="mt-4 text-4xl font-black text-slate-950">
        {score}
      </p>

      <p
        className={`mt-2 text-xs font-bold ${
          winner
            ? "text-emerald-600"
            : "text-slate-400"
        }`}
      >
        {winner ? "WINNER" : "SCORE"}
      </p>
    </div>
  );
}

function ChallengeStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-3xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

function MiniFeature({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-5 rounded-[24px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 transition group-hover:bg-orange-500 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-black text-slate-950">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <ArrowRight
        size={18}
        className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-500"
      />
    </Link>
  );
}