"use client";

import { useAuthStore, useOnlineUser } from "@/store/authStore";
import Image from "next/image";
import Pusher from "pusher-js";

export default function ChatHeader() {
  const username = useAuthStore((state) => state.user);
  const avatar = useAuthStore((state) => state.avatar);
  const logout = useAuthStore((state) => state.logout);
  const userRemove = useOnlineUser((state) => state.removeOnlineUser);

  const handleLogout = async () => {
    // disconnect pusher
    const pusher = Pusher.instances[0];

    if (pusher) {
      const channel = pusher.channel("presence-chat");
      if (channel) {
        channel.bind("pusher:member_removed", (member: any) => {
          userRemove({
            id: member.id,
            username: member.info.username,
            avatar: member.info.avatar,
          });
        });
      }

      pusher.unsubscribe("presence-chat");
      pusher.disconnect();
    }

    // remove user dari store
    if (username) {
      userRemove({
        id: username,
        username: username,
        avatar: avatar,
      });
    }

    // logout auth
    logout();
  };

  return (
    <div
      className="flex justify-between items-center"
      style={{ padding: "10px" }}
    >
      <div className="p-4 flex items-center gap-3">
        <Image
          src={avatar}
          alt="Avatar Header"
          width={50}
          height={50}
          className="w-10 h-10 bg-gray-200 rounded-full"
        />

        <div>
          <h3 className="font-semibold">{username}</h3>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>

      {/* logout */}
      <div>
        <p
          onClick={handleLogout}
          className="cursor-pointer text-red-500 hover:text-red-700"
        >
          Logout
        </p>
      </div>
    </div>
  );
}
