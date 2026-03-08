"use client";

import { useState, useEffect } from "react";
import { useAuthStore, useOnlineUser } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const setOnlineUser = useOnlineUser((state) => state.setOnlineUser);

  const handleLogin = () => {
    if (!username) return;

    login(username);
    addUser();
  };

  const addUser = () => {
    if (!username) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
      auth: {
        params: {
          user: username,
        },
      },
    });

    const channel = pusher.subscribe("presence-chat");

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      console.log("online users:", members);
      setOnlineUser(members);
    });

    router.push("/");

    return () => {
      pusher.disconnect();
    };
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
