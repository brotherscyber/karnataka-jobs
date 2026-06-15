"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "King@1989") {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Karnataka Jobs Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white px-6 py-3 rounded w-full"
        >
          Login
        </button>
      </div>
    </main>
  );
}