"use client";

import { useState, useEffect } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    router.push("/dashboard");
  }

}, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    const response = await API.post("/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:");
    console.log(response.data);

    if (response.data.success) {

      // Save everything
      localStorage.setItem( "token", response.data.token || "" );

      localStorage.setItem( "userEmail", response.data.email || "" );

      localStorage.setItem( "userName", response.data.username || "" );

      localStorage.setItem( "isLoggedIn", "true" );

      // Verify immediately
      console.log( "Stored Email:", localStorage.getItem("userEmail") );

      console.log( "Stored Username:", localStorage.getItem("userName") );

      console.log( "Stored Token:", localStorage.getItem("token") );

      alert("Login Successful");

      // Give browser time to save
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);

    } else {
      alert(response.data.message);
    }

  } catch (error) {
    console.log(error);
    alert("Login Failed");
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center">

      <div className="bg-[#0f172a] p-10 rounded-3xl w-[500px] shadow-2xl">

        <h1 className="text-5xl text-white font-bold mb-10 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-5 rounded-2xl bg-[#1e293b] text-white mb-6 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-5 rounded-2xl bg-[#1e293b] text-white mb-6 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white p-5 rounded-2xl font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}