export default function ChallengesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Prompt Challenges
      </h1>

      <div className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold">
            Beginner Challenge
          </h2>

          <p className="text-slate-400 mt-2">
            Make AI respond only in JSON format.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold">
            Intermediate Challenge
          </h2>

          <p className="text-slate-400 mt-2">
            Build a Chain of Thought prompt.
          </p>
        </div>
      </div>
    </main>
  );
}