"use client";

import {
  ReactNode,
  useRef,
  useState,
  MouseEvent,
} from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg)"
  );

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    const rotateY =
      (x / (rect.width / 2)) * intensity;

    const rotateX =
      -(y / (rect.height / 2)) * intensity;

    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1200px) rotateX(0deg) rotateY(0deg)"
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="
          absolute
          inset-0
          translate-x-3
          translate-y-4
          rounded-[inherit]
          bg-black/10
          blur-xl
          -z-10
        "
      />

      <div
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}