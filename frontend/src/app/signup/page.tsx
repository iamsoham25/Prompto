"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

export default function SignupPage() {

  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }

  }, []);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    if (!username || !email || !password) {

      alert("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/signup", {
        username,
        email,
        password,
      });

      console.log(response.data);

      if (response.data.success) {

        alert("Account Created Successfully");

        router.push("/login");

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-slate-800 mb-6 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </div>

    </main>
  );
}