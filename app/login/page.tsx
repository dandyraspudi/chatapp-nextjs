"use client";

import { useState } from "react";
import { useAuthStore, useOnlineUser } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const setOnlineUser = useOnlineUser((state) => state.setOnlineUser);

  const handleLogin = () => {
    if (!username || !avatar) return;

    login(username, avatar);
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
          avatar: avatar,
        },
      },
    });

    const channel = pusher.subscribe("presence-chat");

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      const users = Object.entries(members.members).map(
        ([id, info]: [string, any]) => ({
          id,
          username: info.name,
          avatar: info.avatar,
        }),
      );

      setOnlineUser(users);
    });

    router.push("/");

    return () => {
      pusher.disconnect();
    };
  };

  const avatarUrl = [
    {
      image:
        "https://cdn.pixabay.com/photo/2023/09/30/09/08/ai-generated-8285211_1280.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2013/07/12/17/02/man-151714_1280.png",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/03/15/09/32/woman-7854120_1280.png",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2013/07/12/15/24/goaty-149860_1280.png",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2022/02/10/08/02/extraterrestrial-7004805_1280.png",
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded-lg w-80">
        {/* seleted avatar */}
        {avatar && (
          <div className="flex justify-center">
            <Image
              src={avatar}
              alt="Avatar Selected"
              width={100}
              height={100}
              className="rounded-full border-2 border-gray-50 cursor-pointer object-fill"
              style={{height: "150px"}}
            />
          </div>
        )}

        {/* avatar */}
        <h2 className="text-xl font-bold mb-4">Avatar</h2>
        <div className="grid grid-cols-5 gap-1 mb-4 place-items-stretch">
          {avatarUrl.map((item, idx) => (
            <Image
              key={idx}
              src={item.image}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full border-2 border-gray-50 cursor-pointer"
              onClick={() => setAvatar(item.image)}
            />
          ))}
        </div>

        {/* join username */}
        <h2 className="text-xl font-bold mb-4">Join</h2>

        <input
          className="border w-full p-2 rounded mb-3"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded cursor-pointer"
        >
          Join
        </button>
      </div>
    </div>
  );
}
