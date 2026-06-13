"use client";

import Link from "next/link";

import { BrainCircuit } from "lucide-react";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");

  const router = useRouter();

  useEffect(() => {

  const token =
    localStorage.getItem("token");

  const name =
    localStorage.getItem("userName");

  setLoggedIn(!!token);

  if (name) {

    setUserName(name);

  }

}, []);

  const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("userEmail");

  localStorage.removeItem("userName");

  localStorage.removeItem("isLoggedIn");

  setLoggedIn(false);

  router.push("/login");

};

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 px-8 py-5 flex items-center justify-between">

      {/* Logo */}

      <Link
        href="/"
        className="flex items-center gap-3"
      >

        <BrainCircuit
          className="text-orange-500"
          size={34}
        />

        <h1 className="text-3xl font-bold text-slate-900">
          Prompto
        </h1>

      </Link>

      {/* Navigation */}

      <div className="flex items-center gap-8 text-slate-700 font-medium">

        <Link
          href="/"
          className="hover:text-orange-500 transition"
        >
          Home
        </Link>

        <Link
          href="/learn"
          className="hover:text-orange-500 transition"
        >
          Learn
        </Link>

        <Link
          href="/playground"
          className="hover:text-orange-500 transition"
        >
          Playground
        </Link>

        <Link
          href="/templates"
          className="hover:text-orange-500 transition "
        >
         Templates
        </Link>

        <Link
          href="/mentor"
          className=" hover:text-orange-500 transition "
        >
           Mentor
        </Link>

        <Link
          href="/challenges"
          className="hover:text-orange-500 transition"
        >
          Challenges
        </Link>

        {/* Show Dashboard only after login */}

        {loggedIn && (

          <Link
            href="/dashboard"
            className="hover:text-orange-500 transition"
          >
            Dashboard
          </Link>

        )}

        {/* Auth Buttons */}

        {!loggedIn ? (

          <>

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-orange-300 hover:text-bg-orange-500/10 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (

        <>
          
          <div className="text-slate-400 text-sm">
            {userName}
          </div>
      
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-500 transition text-white"
          >
            Logout
          </button>
      
        </>
      
      )}

      </div>

    </nav>
  );
}