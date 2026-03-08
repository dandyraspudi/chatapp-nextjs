"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function Chat() {
  const [messages, setMessages] = useState<
    Array<{ user: string; text: string; time: string }>
  >([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

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

  return (
    <div className="border border-indigo-600" style={{ maxWidth: 500, margin: "auto" }}>
      <h2 className="text-4xl font-bold">Realtime Chat</h2>

      <input
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          overflowY: "auto",
          padding: 10,
          marginTop: 10,
        }}
      >
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.user}</b>: {msg.text} <small>{msg.time}</small>
          </p>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          style={{ flex: 1 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
