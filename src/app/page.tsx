import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex flex-col items-center justify-center text-center h-[90vh] px-6">
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-2 rounded-full mb-8">
          The Future of Prompt Engineering
        </div>

        <h1 className="text-7xl md:text-8xl font-bold leading-tight max-w-5xl mb-8">
          Master AI Prompting Like a Professional
        </h1>

        <p className="text-slate-400 text-xl max-w-3xl leading-relaxed mb-10">
          Learn Prompt Engineering, AI Agents, RAG, Evals,
          Workflows, and Production AI Systems from Beginner to Expert Level.
        </p>

        <div className="flex gap-6">
          <Button text="Start Learning" />
          <Button text="Explore Playground" />
        </div>
      </section>
    </main>
  );
}