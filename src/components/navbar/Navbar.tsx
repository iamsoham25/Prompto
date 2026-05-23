import { BrainCircuit } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BrainCircuit className="text-blue-500" size={34} />

        <h1 className="text-3xl font-bold text-white">
          Prompto
        </h1>
      </div>

      <div className="flex items-center gap-8 text-slate-300 font-medium">
        <a href="/" className="hover:text-white transition">
          Home
        </a>

        <a href="/learn" className="hover:text-white transition">
          Learn
        </a>

        <a href="/playground" className="hover:text-white transition">
          Playground
        </a>

        <a href="/dashboard" className="hover:text-white transition">
          Dashboard
        </a>

        <a href="/challenges" className="hover:text-white transition">
          Challenges
        </a>

        <a
          href="/login"
          className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
        >
          Login
        </a>

        <a
          href="/signup"
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}