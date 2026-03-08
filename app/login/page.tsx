"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = () => {
    if (!username) return;

    login(username);
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border w-full p-2 rounded mb-3"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
