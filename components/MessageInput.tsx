"use client";

import { useState, useRef } from "react";
import { useAuthStore } from "@/store/authStore";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const username = useAuthStore((state) => state.user);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = async () => {
    if (!input || !username) return;

    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        user: username,
        message: input,
      }),
    });

    setInput("");
  };

  const sendTyping = async () => {
    await fetch("/api/typing", {
      method: "POST",
      body: JSON.stringify({
        user: username,
      }),
    });
  };

  const handleTyping = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      sendTyping();
    }, 150);
  };

  return (
    <div>
      <div className="p-4 border-t flex gap-3" style={{ padding: "10px" }}>
        <input
          className="flex-1 border border-gray-400 rounded-lg px-4 py-2 outline-none"
          placeholder="Type a message..."
          style={{ padding: "5px 10px" }}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer font-bold"
          style={{ padding: "5px 10px" }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
