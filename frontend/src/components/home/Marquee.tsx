"use client";

const marqueeItems = [
  "LEARN",
  "PRACTICE",
  "EVALUATE",
  "IMPROVE",
  "CHALLENGE",
  "ANALYZE",
  "COMPARE",
  "MASTER",
  "PROMPT ENGINEERING",
];

export default function Marquee() {
  const repeatedItems = [
    ...marqueeItems,
    ...marqueeItems,
  ];

  return (
    <section
      className="
        overflow-hidden
        border-y
        border-slate-200
        bg-white
        py-5
      "
    >
      <div className="marquee-track flex w-max items-center">
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="
              flex
              shrink-0
              items-center
              gap-6
              pr-6

              sm:gap-8
              sm:pr-8
            "
          >
            <span
              className={`
                whitespace-nowrap
                text-sm
                font-black
                tracking-[0.16em]

                sm:text-base
                lg:text-lg

                ${
                  index % 2 === 0
                    ? "text-slate-900"
                    : "text-orange-500"
                }
              `}
            >
              {item}
            </span>

            <span
              className="
                text-xl
                text-purple-500
              "
            >
              ✦
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}