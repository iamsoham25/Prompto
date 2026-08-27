"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, ChartNoAxesCombined, CircleCheck, Lightbulb, Sparkles, Target, TrendingUp, TriangleAlert,} from "lucide-react";
import { Area, AreaChart, CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";

/* =========================================================
   DEMO ANALYTICS DATA

   Homepage uses demo data intentionally.
   Real user analytics remain on /dashboard.
========================================================= */

const trendData = [
  { prompt: "P1", score: 48 },
  { prompt: "P2", score: 55 },
  { prompt: "P3", score: 52 },
  { prompt: "P4", score: 64 },
  { prompt: "P5", score: 61 },
  { prompt: "P6", score: 70 },
  { prompt: "P7", score: 74 },
  { prompt: "P8", score: 72 },
  { prompt: "P9", score: 81 },
  { prompt: "P10", score: 86 },
];

const skillData = [
  { skill: "Clarity", score: 88 },
  { skill: "Specificity", score: 82 },
  { skill: "Context", score: 76 },
  { skill: "Constraints", score: 64 },
  { skill: "Role", score: 91 },
  { skill: "Output", score: 84 },
  { skill: "Examples", score: 69 },
];

const skills = [
  {
    name: "Clarity",
    score: 88,
  },
  {
    name: "Specificity",
    score: 82,
  },
  {
    name: "Context",
    score: 76,
  },
  {
    name: "Constraints",
    score: 64,
  },
  {
    name: "Role",
    score: 91,
  },
  {
    name: "Output Format",
    score: 84,
  },
  {
    name: "Examples",
    score: 69,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AnalyticsShowcase() {
  return (
    <section
      id="analytics-showcase"
      className=" relative overflow-hidden bg-[#f8fafc] py-24 sm:py-28 lg:py-36 "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className=" pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-100/70 blur-[150px] "
      />

      <div
        className=" pointer-events-none absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-orange-100/70 blur-[160px] "
      />

      <div
        className=" pointer-events-none absolute bottom-[-220px] left-[30%] h-[450px] w-[450px] rounded-full bg-pink-100/60 blur-[160px] "
      />

      <div
        className=" relative z-10 mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12 xl:px-16 "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

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
          className=" mx-auto max-w-4xl text-center "
        >
          <div
            className=" inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 "
          >
            <ChartNoAxesCombined
              size={15}
              className="text-purple-600"
            />

            <span
              className=" text-xs font-black uppercase tracking-[0.22em] text-purple-600 "
            >
              Analytics & Growth
            </span>
          </div>

          <h2
            className=" mt-6 text-4xl font-black leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-7xl "
          >
            Don&apos;t guess if
            <br />

            <span
              className=" bg-gradient-to-r from-orange-500 via-purple-600 to-pink-500 bg-clip-text
                text-transparent
              "
            >
              you&apos;re improving.
            </span>
          </h2>

          <p
            className=" mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg "
          >
            Prompto turns every evaluated prompt into measurable skill
            insights, helping you understand what you do well, where you
            struggle and how your Prompt Engineering ability changes over
            time.
          </p>
        </motion.div>

        {/* =====================================================
            PRODUCT PREVIEW LABEL
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
            mt-14
            flex
            justify-center
          "
        >
          <div
            className=" inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm "
          >
            <Sparkles
              size={14}
              className="text-orange-500"
            />

            Product analytics preview
          </div>
        </motion.div>

        {/* =====================================================
            ANALYTICS DASHBOARD
        ===================================================== */}

        <motion.div
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
            amount: 0.1,
          }}
          transition={{
            duration: 0.65,
          }}
          className=" mt-8 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] "
        >
          {/* Dashboard topbar */}

          <div
            className=" flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-9 "
          >
            <div className="flex items-center gap-4">
              <div
                className=" flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white "
              >
                <BrainCircuit size={21} />
              </div>

              <div>
                <p
                  className=" text-xs font-black uppercase tracking-[0.16em] text-purple-600 "
                >
                  Prompt Intelligence
                </p>

                <h3
                  className=" mt-1 text-lg font-black text-slate-950 sm:text-xl "
                >
                  Skill Growth Dashboard
                </h3>
              </div>
            </div>

            <div
              className=" flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 "
            >
              <span
                className=" h-2 w-2 rounded-full bg-emerald-500 "
              />

              Improving
            </div>
          </div>

          {/* Dashboard body */}

          <div className="p-5 sm:p-7 lg:p-9">
            {/* KPI CARDS */}

            <div
              className=" grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5 "
            >
              <MetricCard
                label="Overall Score"
                value="82"
                suffix="/100"
                icon={Target}
                detail="+14 points"
              />

              <MetricCard
                label="Prompts Analyzed"
                value="48"
                icon={BarChart3}
                detail="12 this week"
              />

              <MetricCard
                label="Best Score"
                value="94"
                suffix="/100"
                icon={Sparkles}
                detail="Personal best"
              />

              <MetricCard
                label="Improvement"
                value="+28"
                suffix="%"
                icon={TrendingUp}
                detail="Last 30 days"
              />
            </div>

            {/* =================================================
                CHART GRID
            ================================================= */}

            <div
              className=" mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.85fr] "
            >
              {/* TREND CHART */}

              <div
                className=" min-w-0 rounded-[26px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6 "
              >
                <div
                  className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between "
                >
                  <div>
                    <p
                      className=" text-xs font-black uppercase tracking-[0.16em] text-slate-400 "
                    >
                      Prompt Performance
                    </p>

                    <h4
                      className=" mt-1 text-xl font-black text-slate-950 "
                    >
                      Improvement Trend
                    </h4>
                  </div>

                  <div
                    className=" flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 "
                  >
                    <TrendingUp size={14} />

                    +38 points
                  </div>
                </div>

                <div
                  className=" mt-7 h-[260px] w-full sm:h-[300px] "
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={trendData}
                      margin={{
                        top: 10,
                        right: 5,
                        left: -25,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#7c3aed"
                            stopOpacity={0.28}
                          />

                          <stop
                            offset="95%"
                            stopColor="#7c3aed"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#e2e8f0"
                      />

                      <XAxis
                        dataKey="prompt"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#94a3b8",
                          fontSize: 11,
                        }}
                      />

                      <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#94a3b8",
                          fontSize: 11,
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: "14px",
                          border: "1px solid #e2e8f0",
                          boxShadow:
                            "0 12px 30px rgba(15,23,42,0.08)",
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#7c3aed"
                        strokeWidth={3}
                        fill="url(#scoreGradient)"
                        activeDot={{
                          r: 5,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RADAR */}

              <div
                className=" min-w-0 rounded-[26px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6 "
              >
                <p
                  className=" text-xs font-black uppercase tracking-[0.16em] text-slate-400 "
                >
                  Skill Intelligence
                </p>

                <h4
                  className=" mt-1
                    text-xl
                    font-black
                    text-slate-950
                  "
                >
                  Prompt Skill Radar
                </h4>

                <div
                  className="
                    mt-4
                    h-[300px]
                    w-full
                  "
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <RadarChart
                      data={skillData}
                      outerRadius="68%"
                    >
                      <PolarGrid stroke="#cbd5e1" />

                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{
                          fill: "#64748b",
                          fontSize: 10,
                        }}
                      />

                      <Radar
                        dataKey="score"
                        stroke="#7c3aed"
                        fill="#8b5cf6"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />

                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-500
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-purple-500
                    "
                  />

                  Seven core Prompt Engineering skills
                </div>
              </div>
            </div>

            {/* =================================================
                SKILLS + INSIGHTS
            ================================================= */}

            <div
              className="
                mt-5
                grid
                gap-5

                lg:grid-cols-[1.25fr_0.75fr]
              "
            >
              {/* Skill breakdown */}

              <div
                className="
                  rounded-[26px]
                  border
                  border-slate-200
                  p-5

                  sm:p-6
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-slate-400
                    "
                  >
                    Detailed Evaluation
                  </p>

                  <h4
                    className="
                      mt-1
                      text-xl
                      font-black
                      text-slate-950
                    "
                  >
                    Skill Breakdown
                  </h4>
                </div>

                <div
                  className="
                    mt-7
                    grid
                    gap-x-8
                    gap-y-5

                    md:grid-cols-2
                  "
                >
                  {skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      score={skill.score}
                    />
                  ))}
                </div>
              </div>

              {/* AI Insights */}

              <div
                className="
                  rounded-[26px]
                  bg-slate-950
                  p-5
                  text-white

                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-purple-500
                    "
                  >
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.16em]
                        text-purple-300
                      "
                    >
                      AI Insights
                    </p>

                    <h4
                      className="
                        mt-1
                        text-lg
                        font-black
                      "
                    >
                      Know what to improve next
                    </h4>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <InsightCard
                    icon={CircleCheck}
                    label="Strongest Skill"
                    value="Role Definition"
                    style="text-emerald-400"
                  />

                  <InsightCard
                    icon={TriangleAlert}
                    label="Needs Improvement"
                    value="Constraints"
                    style="text-orange-400"
                  />

                  <InsightCard
                    icon={Lightbulb}
                    label="Recommendation"
                    value="Practice constraint-based prompts."
                    style="text-purple-300"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                MASTERY
            ================================================= */}

            <div
              className="
                mt-5
                rounded-[26px]
                border
                border-slate-200
                bg-gradient-to-r
                from-orange-50
                via-purple-50
                to-pink-50
                p-5

                sm:p-6
                lg:p-7
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-7

                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                <div className="max-w-lg">
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-purple-600
                    "
                  >
                    Prompt Mastery
                  </p>

                  <h4
                    className="
                      mt-2
                      text-2xl
                      font-black
                      text-slate-950
                    "
                  >
                    See your progression clearly.
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    Scores become progression, helping you understand how
                    close you are to the next level.
                  </p>
                </div>

                <div
                  className="
                    w-full

                    lg:max-w-xl
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    {[
                      "Beginner",
                      "Intermediate",
                      "Advanced",
                      "Expert",
                      "Master",
                    ].map((level, index) => (
                      <div
                        key={level}
                        className="
                          flex
                          min-w-0
                          flex-col
                          items-center
                        "
                      >
                        <div
                          className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            text-[11px]
                            font-black

                            ${
                              index <= 2
                                ? "bg-purple-600 text-white"
                                : "border border-slate-300 bg-white text-slate-400"
                            }
                          `}
                        >
                          {index + 1}
                        </div>

                        <span
                          className="
                            mt-2
                            hidden
                            text-[9px]
                            font-bold
                            text-slate-500

                            sm:block
                          "
                        >
                          {level}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="
                      mt-4
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: "58%",
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.9,
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-orange-500
                        via-purple-500
                        to-pink-500
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            BOTTOM MESSAGE
        ===================================================== */}

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
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mt-16
            flex
            flex-col
            items-center
            text-center
          "
        >
          <h3
            className="
              max-w-3xl
              text-3xl
              font-black
              tracking-[-0.03em]
              text-slate-950

              sm:text-4xl
            "
          >
            Every prompt becomes
            <span className="text-purple-600">
              {" "}
              feedback.
            </span>
            <br />
            Every feedback becomes
            <span className="text-orange-500">
              {" "}
              progress.
            </span>
          </h3>

          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-slate-600
            "
          >
            Prompto helps turn repeated practice into measurable Prompt
            Engineering growth.
          </p>

          <Link
            href="/analytics"
            className="
              group
              mt-7
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-slate-950
              px-7
              py-4
              font-black
              text-white
              shadow-xl
              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-purple-700
            "
          >
            Explore Analytics

            <ArrowRight
              size={19}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  label,
  value,
  suffix,
  icon: Icon,
  detail,
}: {
  label: string;
  value: string;
  suffix?: string;
  icon: React.ElementType;
  detail: string;
}) {
  return (
    <div
      className="
        group
        min-w-0
        rounded-[22px]
        border
        border-slate-200
        bg-white
        p-4
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg

        sm:p-5
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-2
        "
      >
        <p
          className="
            truncate
            text-[10px]
            font-black
            uppercase
            tracking-[0.12em]
            text-slate-400

            sm:text-xs
          "
        >
          {label}
        </p>

        <div
          className="
            hidden
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-purple-50
            text-purple-600

            sm:flex
          "
        >
          <Icon size={17} />
        </div>
      </div>

      <div
        className="
          mt-4
          flex
          items-end
          gap-1
        "
      >
        <span
          className="
            text-3xl
            font-black
            tracking-[-0.04em]
            text-slate-950

            sm:text-4xl
          "
        >
          {value}
        </span>

        {suffix && (
          <span
            className="
              mb-1
              text-xs
              font-bold
              text-slate-400
            "
          >
            {suffix}
          </span>
        )}
      </div>

      <p
        className="
          mt-2
          text-[11px]
          font-semibold
          text-emerald-600

          sm:text-xs
        "
      >
        {detail}
      </p>
    </div>
  );
}

/* =========================================================
   SKILL BAR
========================================================= */

function SkillBar({
  name,
  score,
}: {
  name: string;
  score: number;
}) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className="
            text-sm
            font-bold
            text-slate-700
          "
        >
          {name}
        </span>

        <span
          className="
            text-sm
            font-black
            text-slate-950
          "
        >
          {score}
        </span>
      </div>

      <div
        className="
          mt-2
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
          whileInView={{
            width: `${score}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-orange-500
            via-purple-500
            to-pink-500
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   INSIGHT CARD
========================================================= */

function InsightCard({
  icon: Icon,
  label,
  value,
  style,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  style: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        p-4
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <Icon
          size={18}
          className={`mt-0.5 shrink-0 ${style}`}
        />

        <div>
          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.14em]
              text-slate-500
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              text-sm
              font-bold
              leading-6
              text-white
            "
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}