import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div
          className="
          bg-gradient-to-r
          from-blue-600
          via-purple-600
          to-pink-500
          rounded-[40px]
          p-16
          text-white
          shadow-2xl
        "
        >
          <div className="max-w-2xl">

            <div
              className="
                inline-flex
                items-center
                px-5
                py-2
                rounded-full
                bg-white/20
                backdrop-blur-lg
                mb-8
              "
            >
              🚀 Future of AI Learning
            </div>

            <h1
              className="
                text-6xl
                md:text-7xl
                font-bold
                leading-tight
                mb-8
              "
            >
              Master AI Prompting
              <br />
              Like a Professional
            </h1>

            <p
              className="
                text-xl
                text-white/90
                leading-relaxed
                max-w-3xl
                mb-10
              "
            >
              Learn Prompt Engineering, AI Agents,
              RAG, Evals, Workflows and Production AI
              Systems from Beginner to Expert.
            </p>

            <div className="flex gap-5 flex-wrap">

              <Button text="Start Learning" />

              <button
                className="
                  px-8
                  py-4
                  rounded-2xl
                  bg-white
                  text-slate-900
                  font-semibold
                  shadow-lg
                  hover:scale-105
                  transition
                "
              >
                Explore Playground
              </button>

            </div>

          </div>
        </div>

      </section>

      {/* Features Section */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <h2
          className="
            text-4xl
            font-bold
            text-slate-900
            mb-10
          "
        >
          Why Learn With Prompto?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl p-8 shadow-md">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="text-2xl font-bold mb-3">
              Structured Learning
            </h3>

            <p className="text-slate-600">
              Step-by-step roadmap from Beginner
              to Advanced Prompt Engineer.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md">
            <div className="text-5xl mb-4">🎯</div>

            <h3 className="text-2xl font-bold mb-3">
              Daily Challenges
            </h3>

            <p className="text-slate-600">
              Earn XP, unlock badges and improve
              your prompting skills every day.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md">
            <div className="text-5xl mb-4">🤖</div>

            <h3 className="text-2xl font-bold mb-3">
              AI Playground
            </h3>

            <p className="text-slate-600">
              Practice prompts using real AI
              models and improve faster.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}