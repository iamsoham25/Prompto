"use client";

import Link from "next/link";

import { BrainCircuit } from "lucide-react";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");

    setLoggedIn(!!token);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    setLoggedIn(false);

    router.push("/login");

  };

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-8 py-5 flex items-center justify-between">

      {/* Logo */}

      <Link
        href="/"
        className="flex items-center gap-3"
      >

        <BrainCircuit
          className="text-blue-500"
          size={34}
        />

        <h1 className="text-3xl font-bold text-white">
          Prompto
        </h1>

      </Link>

      {/* Navigation */}

      <div className="flex items-center gap-8 text-slate-300 font-medium">

        <Link
          href="/"
          className="hover:text-white transition"
        >
          Home
        </Link>

        <Link
          href="/learn"
          className="hover:text-white transition"
        >
          Learn
        </Link>

        <Link
          href="/playground"
          className="hover:text-white transition"
        >
          Playground
        </Link>

        <Link
          href="/challenges"
          className="hover:text-white transition"
        >
          Challenges
        </Link>

        {/* Show Dashboard only after login */}

        {loggedIn && (

          <Link
            href="/dashboard"
            className="hover:text-white transition"
          >
            Dashboard
          </Link>

        )}

        {/* Auth Buttons */}

        {!loggedIn ? (

          <>

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>

          </>

        ) : (

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-white"
          >
            Logout
          </button>

        )}

      </div>

    </nav>
  );
}