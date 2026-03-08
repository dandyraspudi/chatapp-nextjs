"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";

export default function MessageList() {
  const [messages, setMessages] = useState<
    Array<{ user: string; text: string; time: string }>
  >([]);
  const currentUsername = useAuthStore((state) => state.user);
  const setTypingUser = useChatStore((state) => state.setTypingUser);
  const typingUser = useChatStore((state) => state.typingUser);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_PUSHER_KEY ||
      !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    ) {
      console.error("Pusher environment variables are not defined");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("chat");

    // handle typing
    channel.bind("typing", (data: { user: string }) => {
      setTypingUser(data.user);

      setTimeout(() => {
        setTypingUser(null);
      }, 2000);
    });

    channel.bind(
      "message",
      (data: { user: string; text: string; time: string }) => {
        setMessages((prev) => [...prev, data]);
      },
    );

    return () => {
      pusher.disconnect();
    };
  }, []);

  return (
    <div
      className="flex-1 flex-col-reverse overflow-y-auto p-6 space-y-4 bg-gray-200"
      style={{ padding: "15px" }}
    >
      {/* typing user */}
      {typingUser !== currentUsername && typingUser && (
        <div className="text-sm text-gray-500 px-4 text-center">
          {typingUser} is typing...
        </div>
      )}

      {/* message */}
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.user === currentUsername ? "justify-end" : "justify-start"}`}
          style={{ margin: "5px 0" }}
        >
          <div
            className={`px-4 py-2 rounded-lg max-w-[60%] ${
              msg.user === currentUsername
                ? "bg-green-500 text-white"
                : "bg-white text-black"
            }`}
            style={{ padding: "5px 10px" }}
          >
            <div className="text-xs">{msg.user}</div>
            {msg.text}
            <div className="text-xs">{msg.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
