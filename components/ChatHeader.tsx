"use client";

import { useAuthStore, useOnlineUser } from "@/store/authStore";
export default function ChatHeader() {
  const username = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const userRemove = useOnlineUser((state) => state.removeOnlineUser);

  return (
    <div
      className="flex justify-between items-center"
      style={{ padding: "10px" }}
    >
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />

        <div>
          <h3 className="font-semibold">{username}</h3>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>

      {/* logout */}
      <div>
        <p
          onClick={logout}
          className="cursor-pointer text-red-500 hover:text-red-700"
        >
          Logout
        </p>
      </div>
    </div>
  );
}
