"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Braces, BrainCircuit, BriefcaseBusiness, CheckCircle2, Code2, Crown, FileText, Flame, GraduationCap, Lightbulb, Lock, Megaphone, Medal, Network, Sparkles, Star, Target, Trophy, Zap, } from "lucide-react";

/* =========================================================
   CHALLENGE TRACKS
========================================================= */

const tracks = [
  {
    name: "Coding",
    icon: Code2,
  },
  {
    name: "Summarization",
    icon: FileText,
  },
  {
    name: "JSON",
    icon: Braces,
  },
  {
    name: "Marketing",
    icon: Megaphone,
  },
  {
    name: "Chain-of-Thought",
    icon: BrainCircuit,
  },
  {
    name: "Agentic",
    icon: Bot,
  },
  {
    name: "RAG",
    icon: Network,
  },
  {
    name: "Enterprise",
    icon: BriefcaseBusiness,
  },
  {
    name: "Education",
    icon: GraduationCap,
  },
  {
    name: "Creative",
    icon: Lightbulb,
  },
];

/* =========================================================
   SAMPLE CHALLENGES
========================================================= */

const challenges = [
  {
    id: "01",
    title: "Python Function Generator",
    difficulty: "Easy",
    xp: 50,
    passScore: 70,
    state: "completed",
  },
  {
    id: "02",
    title: "Debug Python Program",
    difficulty: "Easy",
    xp: 60,
    passScore: 70,
    state: "active",
  },
  {
    id: "03",
    title: "SQL Query Generator",
    difficulty: "Medium",
    xp: 70,
    passScore: 70,
    state: "available",
  },
  {
    id: "04",
    title: "REST API Generator",
    difficulty: "Medium",
    xp: 90,
    passScore: 75,
    state: "locked",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ChallengesShowcase() {
    return (
    <section
      id="challenges-showcase"
      className=" relative overflow-hidden bg-[#080910] py-24 text-white sm:py-28 lg:py-36 "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className=" pointer-events-none absolute inset-0 opacity-[0.035] "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className=" pointer-events-none absolute -left-[200px] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-600/15 blur-[160px] "
      />

      <div
        className=" pointer-events-none absolute -right-[200px] top-[30%] h-[550px] w-[550px] rounded-full bg-purple-600/20 blur-[170px] "
      />

      <div
        className=" pointer-events-none absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-pink-600/10 blur-[170px] "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

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
            className=" inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 "
          >
            <Trophy
              size={15}
              className="text-orange-400"
            />

            <span
              className=" text-xs font-black uppercase tracking-[0.22em] text-orange-400 "
            >
              Challenge Arena
            </span>
          </div>

          <h2
            className=" mt-6 text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl "
          >
            Learning is only the start.
            <br />

            <span
              className=" bg-gradient-to-r from-orange-400 via-purple-400
                to-pink-400
                bg-clip-text
                text-transparent
              "
            >
              Now prove your skills.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-slate-400

              sm:text-lg
            "
          >
            Solve practical Prompt Engineering challenges, receive AI-powered
            evaluation, earn XP and continuously improve your ability to
            communicate with AI.
          </p>
        </motion.div>

        {/* =====================================================
            TRACKS
        ===================================================== */}

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
          transition={{
            duration: 0.5,
          }}
          className="
            mt-14
            flex
            flex-wrap
            justify-center
            gap-3
          "
        >
          {tracks.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.name}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.045]
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-300
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-purple-400/30
                  hover:bg-purple-500/10
                  hover:text-white
                "
              >
                <Icon
                  size={15}
                  className="
                    text-orange-400
                    transition-colors
                    group-hover:text-purple-400
                  "
                />

                {track.name}
              </div>
            );
          })}
        </motion.div>

        {/* =====================================================
            MAIN ARENA
        ===================================================== */}

        <div
          className="
            mt-20
            grid
            gap-6

            lg:grid-cols-[1.45fr_0.75fr]
          "
        >
          {/* =================================================
              CHALLENGE ARENA PREVIEW
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.045]
              shadow-2xl
            "
          >
            {/* Window header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/10
                px-5
                py-4

                sm:px-7
              "
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <span
                  className="
                    hidden
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500

                    sm:block
                  "
                >
                  Prompto Challenge Arena
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-400/10
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-emerald-400
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                Live
              </div>
            </div>

            {/* Arena body */}

            <div className="p-5 sm:p-7 lg:p-8">
              {/* Arena heading */}

              <div
                className="
                  flex
                  flex-col
                  gap-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-purple-400
                    "
                  >
                    Coding Track
                  </p>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-black

                      sm:text-3xl
                    "
                  >
                    Prompt Engineering Challenges
                  </h3>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-orange-400/20
                    bg-orange-400/10
                    px-4
                    py-3
                  "
                >
                  <Zap
                    size={18}
                    className="text-orange-400"
                  />

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">
                      Available XP
                    </p>

                    <p className="font-black text-orange-400">
                      1,000+
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress */}

              <div className="mt-8">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-sm
                  "
                >
                  <span className="font-semibold text-slate-400">
                    Track Progress
                  </span>

                  <span className="font-black text-white">
                    25%
                  </span>
                </div>

                <div
                  className="
                    mt-3
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-white/10
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "25%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2,
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

              {/* Challenge rows */}

              <div className="mt-8 space-y-3">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                  >
                    <ChallengeRow
                      challenge={challenge}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Arena CTA */}

              <Link
                href="/challenges"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-black
                  text-orange-400
                "
              >
                View all challenge tracks

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </motion.div>

          {/* =================================================
              GAMIFICATION COLUMN
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              grid
              gap-5

              sm:grid-cols-2

              lg:grid-cols-1
            "
          >
            {/* XP CARD */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-orange-400/20
                bg-gradient-to-br
                from-orange-500/15
                to-transparent
                p-6

                sm:p-7
              "
            >
              <div
                className="
                  absolute
                  -right-12
                  -top-12
                  h-40
                  w-40
                  rounded-full
                  bg-orange-500/15
                  blur-[50px]
                "
              />

              <div className="relative">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-500
                    shadow-lg
                    shadow-orange-500/20
                  "
                >
                  <Zap size={22} />
                </div>

                <p
                  className="
                    mt-7
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-orange-400
                  "
                >
                  Earn XP
                </p>

                <h3
                  className="
                    mt-2
                    text-3xl
                    font-black
                  "
                >
                  Every challenge
                  <br />
                  moves you forward.
                </h3>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  Higher quality prompts unlock better scores and more XP.
                </p>

                <div
                  className="
                    mt-6
                    flex
                    items-end
                    gap-2
                  "
                >
                  <span
                    className="
                      text-5xl
                      font-black
                      text-white
                    "
                  >
                    +80
                  </span>

                  <span
                    className="
                      mb-1
                      font-black
                      text-orange-400
                    "
                  >
                    XP
                  </span>
                </div>
              </div>
            </div>

            {/* STREAK */}

            <div
              className="
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.045]
                p-6

                sm:p-7
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
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
                    bg-red-400/10
                    text-red-400
                  "
                >
                  <Flame size={21} />
                </div>

                <span
                  className="
                    rounded-full
                    bg-red-400/10
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-red-400
                  "
                >
                  STREAK
                </span>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-black">
                  7
                </span>

                <span className="mb-1 text-sm font-bold text-slate-400">
                  days
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Practice consistently and build your Prompt Engineering habit.
              </p>

              <div
                className="
                  mt-6
                  grid
                  grid-cols-7
                  gap-2
                "
              >
                {["M", "T", "W", "T", "F", "S", "S"].map(
                  (day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className="
                        flex
                        flex-col
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-bold
                          text-slate-500
                        "
                      >
                        {day}
                      </span>

                      <div
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-red-400/15
                          text-red-400
                        "
                      >
                        <CheckCircle2 size={14} />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* LEVEL */}

            <div
              className="
                rounded-[28px]
                border
                border-purple-400/20
                bg-gradient-to-br
                from-purple-500/15
                to-transparent
                p-6

                sm:col-span-2
                sm:p-7

                lg:col-span-1
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-purple-400
                    "
                  >
                    Skill Progression
                  </p>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-black
                    "
                  >
                    Level up your mastery.
                  </h3>
                </div>

                <Crown
                  size={30}
                  className="text-yellow-400"
                />
              </div>

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  gap-2
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
                      flex-1
                      flex-col
                      items-center
                    "
                  >
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        text-xs
                        font-black

                        ${
                          index <= 1
                            ? "border-purple-400 bg-purple-500 text-white"
                            : "border-white/10 bg-white/[0.05] text-slate-600"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    <span
                      className="
                        mt-2
                        hidden
                        max-w-full
                        truncate
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
                  mt-5
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-white/10
                "
              >
                <div
                  className="
                    h-full
                    w-[35%]
                    rounded-full
                    bg-gradient-to-r
                    from-purple-500
                    to-pink-500
                  "
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            GAMIFICATION FEATURES
        ===================================================== */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mt-16
            grid
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.035]

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          <GameFeature
            icon={Target}
            title="Pass Scores"
            description="Every challenge has a minimum score required for completion."
          />

          <GameFeature
            icon={Star}
            title="Bonus XP"
            description="Exceptional prompts can earn additional experience rewards."
          />

          <GameFeature
            icon={Medal}
            title="Achievements"
            description="Unlock milestones as your learning and challenge progress grows."
          />

          <GameFeature
            icon={Crown}
            title="Levels"
            description="Progress from Beginner toward advanced Prompt Engineering mastery."
          />
        </motion.div>

        {/* =====================================================
            CTA
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
          <p
            className="
              max-w-2xl
              text-base
              leading-7
              text-slate-400
            "
          >
            Stop only reading about Prompt Engineering. Start solving
            problems that test whether you can actually use it.
          </p>

          <Link
            href="/challenges"
            className="
              group
              mt-7
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-pink-500
              px-7
              py-4
              font-black
              text-white
              shadow-xl
              shadow-orange-500/10
              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-orange-500/20
            "
          >
            Enter Challenge Arena

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
   CHALLENGE ROW
========================================================= */

function ChallengeRow({
  challenge,
}: {
  challenge: (typeof challenges)[number];
}) {
  const completed =
    challenge.state === "completed";

  const locked =
    challenge.state === "locked";

  const active =
    challenge.state === "active";

  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        p-4
        transition-all
        duration-300

        sm:flex-row
        sm:items-center
        sm:justify-between

        ${
          active
            ? "border-purple-400/30 bg-purple-500/10"
            : "border-white/10 bg-white/[0.035]"
        }

        ${
          locked
            ? "opacity-55"
            : "hover:border-white/20 hover:bg-white/[0.06]"
        }
      `}
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-4
        "
      >
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-sm
            font-black

            ${
              completed
                ? "bg-emerald-400/10 text-emerald-400"
                : active
                ? "bg-purple-500 text-white"
                : locked
                ? "bg-white/[0.05] text-slate-600"
                : "bg-orange-400/10 text-orange-400"
            }
          `}
        >
          {completed ? (
            <CheckCircle2 size={19} />
          ) : locked ? (
            <Lock size={17} />
          ) : (
            challenge.id
          )}
        </div>

        <div className="min-w-0">
          <h4
            className="
              truncate
              font-black
              text-white
            "
          >
            {challenge.title}
          </h4>

          <div
            className="
              mt-1.5
              flex
              flex-wrap
              items-center
              gap-2
              text-xs
            "
          >
            <span className="text-slate-500">
              {challenge.difficulty}
            </span>

            <span className="text-slate-700">
              •
            </span>

            <span className="text-slate-500">
              Pass {challenge.passScore}+
            </span>
          </div>
        </div>
      </div>

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-4

          sm:justify-end
        "
      >
        <span
          className="
            flex
            items-center
            gap-1
            text-sm
            font-black
            text-orange-400
          "
        >
          <Zap size={14} />

          {challenge.xp} XP
        </span>

        {completed && (
          <span
            className="
              rounded-full
              bg-emerald-400/10
              px-3
              py-1
              text-xs
              font-bold
              text-emerald-400
            "
          >
            Completed
          </span>
        )}

        {active && (
          <span
            className="
              rounded-full
              bg-purple-400/10
              px-3
              py-1
              text-xs
              font-bold
              text-purple-300
            "
          >
            Continue
          </span>
        )}

        {locked && (
          <span
            className="
              rounded-full
              bg-white/[0.05]
              px-3
              py-1
              text-xs
              font-bold
              text-slate-600
            "
          >
            Locked
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   GAME FEATURE
========================================================= */

function GameFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group
        border-b
        border-white/10
        p-6
        transition-colors
        duration-300

        hover:bg-white/[0.04]

        sm:p-7

        sm:[&:nth-child(odd)]:border-r

        lg:border-b-0
        lg:border-r
        lg:last:border-r-0
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
          bg-white/[0.06]
          text-purple-400
          transition-all
          duration-300

          group-hover:-translate-y-1
          group-hover:bg-purple-500
          group-hover:text-white
        "
      >
        <Icon size={20} />
      </div>

      <h3
        className="
          mt-5
          text-lg
          font-black
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-slate-500
        "
      >
        {description}
      </p>
    </div>
  );
}