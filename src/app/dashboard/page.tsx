export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold">
            XP Points
          </h2>

          <p className="text-4xl mt-4 font-bold text-blue-500">
            1200
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold">
            Current Streak
          </h2>

          <p className="text-4xl mt-4 font-bold text-orange-400">
            7 Days
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold">
            Skill Level
          </h2>

          <p className="text-4xl mt-4 font-bold text-green-400">
            Beginner
          </p>
        </div>
      </div>
    </main>
  );
}