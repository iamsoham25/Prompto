"use client";

import Link from "next/link";

import { BrainCircuit } from "lucide-react";

import { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("userName");

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

const navItem = (path: string) =>

    pathname === path

        ? "px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold transition"

        : "px-4 py-2 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition";

  return (

    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">

      <div className="w-full h-20 px-10 flex items-center">

        {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
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

          <div className="flex items-center gap-1 ml-16">

            <Link
              href="/"
              className={navItem("/")}
            >
              Home
            </Link>

            <Link
              href="/learn"
              className={navItem("/learn")}
            >
              Learn
            </Link>

            <Link
              href="/playground"
              className={navItem("/playground")}
            >
              Playground
            </Link>

            <Link href="/comparator"
            className={navItem("/comparator")}
            >
              Comparator
            </Link>

            <Link
              href="/templates"
              className={navItem("/templates")}
            >
             Templates
            </Link>

            <Link
              href="/improver"
              className={navItem("/improver")}
            >
              Improver
            </Link>

            <Link
              href="/challenges"
              className={navItem("/challenges")}
            >
              Challenges
            </Link>

            <Link
              href="/evaluator"
              className={navItem("/evaluator")}
            >
              Evaluator
            </Link>

            <Link
              href="/analytics"
              className={navItem("/analytics")}
            >
              Analytics
            </Link>

            <Link
              href="/history"
              className={navItem("/history")}
            >
              History
            </Link>

          {/* Show Dashboard only after login */}

            {loggedIn && (

              <Link
                href="/dashboard"
                className={navItem("/dashboard")}
              >
                Dashboard
              </Link>

            )}

            {/* Auth Buttons */}

            <div className="ml-8 flex items-center gap-4">

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
      
              <button
                onClick={handleLogout}
                className="ml-3 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition"
              >
                Logout
              </button>
      
            </>
          )}

          </div>

        </div>
      </div>
    </nav>
  );
}