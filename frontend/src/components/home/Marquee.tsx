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
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="prompto-marquee">
      <div className="prompto-marquee-track">
        {items.map((item, index) => (
          <div className="prompto-marquee-item" key={`${item}-${index}`}>
            <span
              className={
                index % 2 === 0
                  ? "prompto-marquee-text prompto-marquee-dark"
                  : "prompto-marquee-text prompto-marquee-orange"
              }
            >
              {item}
            </span>

            <span className="prompto-marquee-star">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}