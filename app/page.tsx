"use client";

import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <ChatHeader />

        <MessageList />

        <MessageInput />
      </div>
    </div>
  );
}
