"use client";

import Link from "next/link";
import {
  BrainCircuit,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // =========================================================
  // CHECK LOGIN
  // =========================================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");

    setLoggedIn(!!token);

    if (name) {
      setUserName(name);
    }
  }, []);

  // =========================================================
  // CLOSE MOBILE MENU WHEN ROUTE CHANGES
  // =========================================================

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // =========================================================
  // LOCK PAGE SCROLL WHEN MOBILE MENU IS OPEN
  // =========================================================

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");

    setLoggedIn(false);
    setMenuOpen(false);

    router.push("/login");
  };

  // =========================================================
  // NAVIGATION ITEMS
  // =========================================================

  const navigation = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Learn",
      path: "/learn",
    },
    {
      name: "Playground",
      path: "/playground",
    },
    {
      name: "Comparator",
      path: "/comparator",
    },
    {
      name: "Templates",
      path: "/templates",
    },
    {
      name: "Improver",
      path: "/improver",
    },
    {
      name: "Challenges",
      path: "/challenges",
    },
    {
      name: "Evaluator",
      path: "/evaluator",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
    {
      name: "History",
      path: "/history",
    },
  ];

  // =========================================================
  // ACTIVE LINK CHECK
  // =========================================================

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // =========================================================
  // DESKTOP NAV STYLE
  // =========================================================

  const desktopNavItem = (path: string) =>
    isActive(path)
      ? "px-3 py-2 rounded-xl bg-orange-500 text-white font-semibold transition whitespace-nowrap"
      : "px-3 py-2 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition whitespace-nowrap";

  // =========================================================
  // MOBILE NAV STYLE
  // =========================================================

  const mobileNavItem = (path: string) =>
    isActive(path)
      ? "block w-full px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold transition"
      : "block w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 lg:h-20 flex items-center justify-between">

            {/* =====================================================
                LOGO
            ===================================================== */}

            <Link
              href="/"
              className="flex items-center gap-2 lg:gap-3 shrink-0"
            >
              <BrainCircuit
                className="text-orange-500 shrink-0"
                size={32}
              />

              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Prompto
              </h1>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
            ===================================================== */}

            <div className="hidden xl:flex items-center gap-1 ml-8">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={desktopNavItem(item.path)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Dashboard */}

              {loggedIn && (
                <Link
                  href="/dashboard"
                  className={desktopNavItem("/dashboard")}
                >
                  Dashboard
                </Link>
              )}

              {/* Authentication */}

              <div className="ml-3 flex items-center gap-2">
                {!loggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="
                        px-4 py-2
                        rounded-xl
                        border border-orange-300
                        text-slate-700
                        hover:bg-orange-50
                        hover:text-orange-600
                        transition
                        whitespace-nowrap
                      "
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      className="
                        px-4 py-2
                        rounded-xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        transition
                        whitespace-nowrap
                      "
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      transition
                      whitespace-nowrap
                      cursor-pointer
                    "
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            {/* =====================================================
                MOBILE / TABLET MENU BUTTON
            ===================================================== */}

            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              className="
                xl:hidden
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                text-slate-800
                hover:bg-slate-100
                transition
                cursor-pointer
              "
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={27} />
              ) : (
                <Menu size={27} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}

      {menuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">

          {/* DARK BACKDROP */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/40"
          />

          {/* MENU PANEL */}

          <div
            className="
              absolute
              top-16
              left-0
              right-0
              max-h-[calc(100vh-4rem)]
              overflow-y-auto
              bg-white
              border-b
              border-slate-200
              shadow-xl
            "
          >
            <div className="px-4 sm:px-6 py-5">

              {/* USER INFORMATION */}

              {loggedIn && userName && (
                <div className="mb-4 p-4 rounded-2xl bg-slate-50">
                  <p className="text-xs text-slate-500">
                    Signed in as
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {userName}
                  </p>
                </div>
              )}

              {/* NAVIGATION */}

              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={mobileNavItem(item.path)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* DASHBOARD */}

              {loggedIn && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <Link
                    href="/dashboard"
                    className={`
                      ${mobileNavItem("/dashboard")}
                      flex items-center gap-3
                    `}
                  >
                    <LayoutDashboard size={19} />

                    Dashboard
                  </Link>
                </div>
              )}

              {/* AUTHENTICATION */}

              <div className="mt-4 pt-4 border-t border-slate-200">
                {!loggedIn ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      className="
                        flex
                        items-center
                        justify-center
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-orange-300
                        text-slate-700
                        font-medium
                        hover:bg-orange-50
                        transition
                      "
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      className="
                        flex
                        items-center
                        justify-center
                        px-4
                        py-3
                        rounded-xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        font-semibold
                        transition
                      "
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-3
                      rounded-xl
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      font-semibold
                      transition
                      cursor-pointer
                    "
                  >
                    <LogOut size={19} />

                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}