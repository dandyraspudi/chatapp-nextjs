"use client";

import { useOnlineUser } from "@/store/authStore";

export default function Sidebar() {
  const userList = useOnlineUser((state) => state.userOnline);

  return (
    <div className="w-72 bg-gray-900 text-white">
      <h2
        className="text-xl font-bold mb-4 flex items-center justify-center"
        style={{ height: "50px" }}
      >
        ChatsApp
      </h2>

      <div className="space-y-2">
        {userList.map((user, i) => (
          <div
            key={i}
            className="p-3 rounded-lg cursor-pointer flex items-center"
            style={{ height: "30px", padding: "0 10px" }}
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}
