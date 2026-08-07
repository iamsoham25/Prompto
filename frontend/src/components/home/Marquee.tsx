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
  return (
    <section className="w-full overflow-hidden border-y border-slate-200 bg-white py-5">
      <div className="prompto-marquee">
        <div className="prompto-marquee-group">
          {marqueeItems.map((item, index) => (
            <div
              key={`first-${index}`}
              className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
            >
              <span
                className={
                  index % 2 === 0
                    ? "whitespace-nowrap text-sm font-black tracking-[0.16em] text-slate-900 sm:text-base lg:text-lg"
                    : "whitespace-nowrap text-sm font-black tracking-[0.16em] text-orange-500 sm:text-base lg:text-lg"
                }
              >
                {item}
              </span>

              <span className="text-xl text-purple-500">
                ✦
              </span>
            </div>
          ))}
        </div>

        <div className="prompto-marquee-group" aria-hidden="true" >
          {marqueeItems.map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
            >
              <span
                className={
                  index % 2 === 0
                    ? "whitespace-nowrap text-sm font-black tracking-[0.16em] text-slate-900 sm:text-base lg:text-lg"
                    : "whitespace-nowrap text-sm font-black tracking-[0.16em] text-orange-500 sm:text-base lg:text-lg"
                }
              >
                {item}
              </span>

              <span className="text-xl text-purple-500">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}