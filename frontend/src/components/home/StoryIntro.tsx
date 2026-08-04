"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function StoryIntro() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#09090f]
        px-5
        py-28
        text-white

        sm:px-8
        sm:py-36

        lg:px-12
        lg:py-44
      "
    >
      {/* Background glow */}

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[10%]
          top-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-purple-700/20
          blur-[130px]
        "
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-100px]
          right-[5%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-pink-600/15
          blur-[140px]
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          text-center
        "
      >
        <motion.p
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
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            text-4xl
            font-black
            uppercase
            leading-tight
            tracking-[-0.04em]

            sm:text-5xl
            lg:text-7xl
          "
        >
          AI doesn&apos;t know
          <br />
          what you want.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            scaleY: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleY: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="
            mx-auto
            my-10
            h-16
            w-px
            origin-top
            bg-gradient-to-b
            from-purple-400
            to-pink-500
          "
        />

        <motion.p
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
          }}
          transition={{
            delay: 0.25,
            duration: 0.7,
          }}
          className="
            text-3xl
            font-black
            uppercase
            leading-tight
            tracking-[-0.03em]
            text-white/60

            sm:text-4xl
            lg:text-6xl
          "
        >
          It knows what
          <br />
          you tell it.
        </motion.p>

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
            delay: 0.55,
            duration: 0.6,
          }}
          className="
            my-12
            flex
            justify-center
          "
        >
          <ArrowDown
            size={32}
            className="text-orange-500"
          />
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.65,
            duration: 0.8,
          }}
          className="
            bg-gradient-to-r
            from-orange-400
            via-purple-400
            to-pink-400
            bg-clip-text
            text-4xl
            font-black
            uppercase
            leading-tight
            tracking-[-0.04em]
            text-transparent

            sm:text-5xl
            lg:text-7xl
          "
        >
          Prompto teaches you
          <br />
          how to tell it better.
        </motion.p>
      </div>
    </section>
  );
}