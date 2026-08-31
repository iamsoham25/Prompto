"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function StoryIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <section className=" relative overflow-hidden bg-[#09090f] px-5 py-28 text-white sm:px-8 sm:py-36 lg:px-12 lg:py-44 " >
      
      {/* Static background glows */}

      <div className=" pointer-events-none absolute left-[5%] top-[10%] hidden h-[300px] w-[300px] rounded-full bg-purple-700/15 blur-[80px] md:block " />

      <div className=" pointer-events-none absolute bottom-[-100px] right-[5%] hidden h-[320px] w-[320px] rounded-full bg-pink-600/10 blur-[80px] md:block " />

      {/* Grid */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      <div className=" relative z-10 mx-auto max-w-6xl text-center " >
        <motion.p
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="
            text-4xl font-black
            uppercase leading-tight
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
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scaleY: 0,
                }
          }
          whileInView={{
            opacity: 1,
            scaleY: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            ease,
          }}
          className=" mx-auto my-10 h-16 w-px origin-top bg-gradient-to-b from-purple-400
            to-pink-500
          "
        />

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease,
          }}
          className=" text-3xl font-black uppercase leading-tight tracking-[-0.03em] text-white/60 sm:text-4xl lg:text-6xl "
        >
          It knows what
          <br />
          you tell it.
        </motion.p>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
          }}
          className="my-12 flex justify-center"
        >
          <ArrowDown
            size={32}
            className="text-orange-500"
          />
        </motion.div>

        <motion.p
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease,
          }}
          className=" bg-gradient-to-r from-orange-400 via-purple-400
            to-pink-400
            bg-clip-text

            text-4xl font-black
            uppercase leading-tight
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