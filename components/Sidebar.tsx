"use client";

import { useOnlineUser } from "@/store/authStore";
import Image from "next/image";
import { useEffect } from "react";
import Pusher from "pusher-js";

export default function Sidebar() {
  const userList = useOnlineUser((state) => state.userOnline);
  const setOnlineUser = useOnlineUser((state) => state.setOnlineUser);

  // useEffect(() => {
  //   // ketika pertama join channel
  //   const channel = Pusher.subscribe("presence-chat");

  //   channel.bind("pusher:subscription_succeeded", (members: any) => {
  //     const users = Object.keys(members.members).map((id) => ({
  //       id,
  //       username: members.members[id].username,
  //       avatar: members.members[id].avatar,
  //     }));

  //     setOnlineUser(users);
  //   });
  // });

  return (
    <div className="w-72 bg-gray-900 text-white">
      <h2
        className="text-xl font-bold mb-4 flex items-center justify-center"
        style={{ height: "50px" }}
      >
        ChatsApp
      </h2>

      <div className="space-y-3 flex flex-col gap-3">
        {userList.map((user, i) => (
          <div
            key={i}
            className="p-3 rounded-lg flex items-center gap-2 font-semibold"
            style={{ height: "30px", padding: "0 10px" }}
          >
            <Image
              src={user.avatar}
              alt="Avatar Sidebar"
              width={50}
              height={50}
              className="w-10 h-10 bg-gray-200 rounded-full"
            />
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}
