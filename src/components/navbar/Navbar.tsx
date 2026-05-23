export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 px-8 py-5 flex items-center justify-between bg-slate-950">
      <h1 className="text-3xl font-bold text-white">
        Prompto
      </h1>

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

        <a href="/challenges" className="hover:text-white transition">
          Challenges
        </a>

        <a
          href="/login"
          className="px-5 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
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