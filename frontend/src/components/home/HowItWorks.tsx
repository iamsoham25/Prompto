"use client";

import { motion } from "framer-motion";

import { BookOpen, PenLine, FlaskConical, BarChart3, WandSparkles, Trophy, ArrowRight, Check, Sparkles,}
 from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Learn",
        description: "Understand prompt engineering concepts, frameworks and best practices.",
        icon: BookOpen,
    },
    {
        number: "02",
        title: "Write",
        description: "Create prompts using roles, context, instructions and constraints.",
        icon: PenLine,
    },
    {
        number: "03",
        title: "Test",
        description: "Experiment with your prompts using the interactive AI Playground.",
        icon: FlaskConical,
    },
    {
        number: "04",
        title: "Evaluate",
        description: "Measure prompt quality across clarity, context and effectiveness.",
        icon: BarChart3,
    },
    {
        number: "05",
        title: "Improve",
        description: "Use intelligent feedback to transform weak prompts into stronger ones.",
        icon: WandSparkles,
    },
    {
        number: "06",
        title: "Master",
        description: "Complete real challenges, earn XP and build professional prompting skills.",
        icon: Trophy,
    },
];

export default function HowItWorks() {

    return (

        <section
            id="how-it-works"
            className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36"
            >
      
            {/* Background Grid */}

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                    `,
                    backgroundSize: "55px 55px",
                    }}
                />

                {/* Background Glows */}

                <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[150px]" />

                    <div className="pointer-events-none absolute -right-40 bottom-40 h-[500px] w-[500px] rounded-full bg-pink-600/20 blur-[160px]" />

                        <div className="relative z-10 mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12 xl:px-16">
                            
                            {/* HEADER */}

                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.55 }}
                                className="mx-auto max-w-4xl text-center"
                                >

                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                                    <Sparkles size={15} className="text-orange-400" />

                                    <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
                                        How Prompto Works
                                    </span>

                                </div>

                                <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                                    Learn it.
                                <br />

                                <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Practice it. Master it.
                                </span>
                                </h2>

                                <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
                                    Prompto turns Prompt Engineering into a practical learning cycle.
                                    Learn the concepts, build prompts, test them with AI, evaluate the
                                    results and continuously improve.
                                </p>
                            </motion.div>

                            {/* WORKFLOW */}

                            <div className="relative mt-20 lg:mt-24">
                                {/* Desktop connecting line */}

                                <div className="absolute left-[8%] right-[8%] top-[42px] hidden h-[2px] bg-white/10 lg:block">
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 1.1 }}
                                        className="h-full origin-left bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500"
                                        />
                                </div>

                                {/* Mobile connecting line */}

                                <div className="absolute bottom-10 left-[35px] top-10 w-[2px] bg-white/10 lg:hidden">
                                    <motion.div
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 1 }}
                                        className="h-full origin-top bg-gradient-to-b from-orange-500 via-purple-500 to-pink-500"
                                    />
                                </div>

                                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-4">
                                    {steps.map((step, index) => {
                                        const Icon = step.icon;

                                        return (
                                            <motion.div
                                                key={step.number}
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={{
                                                    duration: 0.45,
                                                    delay: index * 0.06,
                                                }}
                                                className="group relative z-10 flex gap-5 lg:block lg:text-center"
                                                >
                                                {/* STEP ICON */}

                                                <div className=" relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-purple-400/50 group-hover:bg-purple-600 " >
                                                    <Icon
                                                        size={25}
                                                        className="text-white"
                                                    />

                                                    <div className="absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white">
                                                        {step.number}
                                                    </div>

                                                </div>

                                                {/* STEP TEXT */}

                                                <div className="pt-1 lg:mt-8 lg:pt-0">
                                                    <h3 className="text-xl font-black text-white lg:text-2xl">
                                                        {step.title}
                                                    </h3>

                                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                                        {step.description}
                                                    </p>

                                                </div>

                                            </motion.div>

                                        );

                                    })}

                                </div>

                            </div>

                {/* TRANSFORMATION SECTION */}

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6 }}
                    className="mt-28"
                    >
                    {/* Transformation Header */}

                    <div className="text-center">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-400">
                            From idea to engineered prompt
                        </p>

                        <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                            See what the process changes.
                        </h3>
                    </div>

                    {/* Transformation Cards */}

                    <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
                        {/* BEFORE */}

                            <TransformationCard
                                label="Before Prompto"
                                badge="Basic"
                                badgeStyle="bg-red-400/10 text-red-400"
                            >
                            <p className="text-xl font-bold leading-8 text-white">
                                &quot;Explain machine learning.&quot;
                            </p>

                            <div className="mt-8 space-y-3">
                                <WeakItem text="No role" />
                                <WeakItem text="No target audience" />
                                <WeakItem text="No output structure" />
                                <WeakItem text="No clear constraints" />
                            </div>
                        </TransformationCard>

                        {/* ARROW */}

                        <ProcessArrow />

                        {/* PROCESS */}

                        <div className="rounded-[28px] border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-pink-500/5 p-7">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-400">
                                    Prompto Process
                                </p>

                                <Sparkles size={18} className="text-purple-400" />
                            </div>

                            <div className="mt-8 space-y-4">
                                <ProcessItem number="01" text="Define the AI role" />

                                <ProcessItem number="02" text="Add relevant context" />

                                <ProcessItem number="03" text="Specify the audience" />

                                <ProcessItem number="04" text="Set clear constraints" />

                                <ProcessItem number="05" text="Define output format" />
                            </div>
                        </div>

                        {/* ARROW */}

                        <ProcessArrow />

                        {/* AFTER */}

                        <TransformationCard
                            label="Professional Prompt"
                            badge="Strong"
                            badgeStyle="bg-emerald-400/10 text-emerald-400"
                        >
                            <p className="text-base font-semibold leading-7 text-white sm:text-lg">
                                &quot;Act as an AI instructor. Explain machine learning to a
                                beginner using simple terminology, one real-world example and
                                a structured step-by-step explanation.&quot;
                            </p>

                            <div className="mt-8 flex flex-wrap gap-2">
                                <PromptTag text="Role" />
                                <PromptTag text="Context" />
                                <PromptTag text="Audience" />
                                <PromptTag text="Constraints" />
                                <PromptTag text="Format" />
                            </div>

                            <div className="mt-7 flex items-center gap-2 text-sm font-bold text-emerald-400">
                                <Check size={17} />
                                Clear, structured and actionable
                            </div>

                        </TransformationCard>

                    </div>

                </motion.div>

            </div>

        </section>

    );

}


/* ------------------------------------------------ */
/* Supporting Components                            */
/* ------------------------------------------------ */

function TransformationCard({
    label,
    badge,
    badgeStyle,
    children,
}: {
    label: string;
    badge: string;
    badgeStyle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7">
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    {label}
                </p>

                <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${badgeStyle}`} >
                    {badge}
                </span>
            </div>

            <div className="mt-8">{children}</div>

        </div>
    );
}

function ProcessArrow() {
    return (
        <div className="flex items-center justify-center py-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                <ArrowRight className="rotate-90 text-orange-400 lg:rotate-0" size={20} />
            </div>
        </div>
    );
}

function WeakItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            {text}
        </div>
    );
}

function ProcessItem({
    number,
    text,
}: {
    number: string;
    text: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-xs font-black text-purple-300">
                {number}
            </div>

            <p className="text-sm font-semibold text-slate-300">
                {text}
            </p>

        </div>
    );
}

function PromptTag({ text }: { text: string }) {
    return (
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            {text}
        </span>
    );
}