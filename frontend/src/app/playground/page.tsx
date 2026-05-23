export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        AI Playground
      </h1>

      <textarea
        placeholder="Write your prompt here..."
        className="w-full h-64 bg-slate-900 border border-slate-800 rounded-2xl p-6 outline-none"
      />

      <button className="mt-6 px-8 py-4 bg-blue-600 rounded-2xl hover:bg-blue-700 transition">
        Generate Response
      </button>
    </main>
  );
}