import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import WhatIsPrompto from "@/components/home/WhatIsPrompto";
import StoryIntro from "@/components/home/StoryIntro";
import ProductWorkspace from "@/components/home/ProductWorkspace";
import HowItWorks from "@/components/home/HowItWorks";
import LearningRoadmap from "@/components/home/LearningRoadmap";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white text-slate-950">
      <Hero />

      <Marquee />

      <WhatIsPrompto />

      <StoryIntro />

      <ProductWorkspace />

      <HowItWorks />

      <LearningRoadmap />
    </main>
  );
}