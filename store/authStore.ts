import { create } from "zustand";

type AuthState = {
  user: string;
  avatar: string;
  login: (username: string, avatar: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: "",
  avatar: "",

  login: (username, avatar) =>
    set({
      user: username,
      avatar: avatar
    }),

  logout: () =>
    set({
      user: "",
    }),
}));

type User = {
  id: string;
  username: string;
  avatar: string;
};

type OnlineUserListStore = {
  userOnline: User[];
  setOnlineUser: (user: User[]) => void;
  removeOnlineUser: (user: User) => void;
};

export const useOnlineUser = create<OnlineUserListStore>((set) => ({
  userOnline: [],

  setOnlineUser: (users) =>
    set({
      userOnline: users,
    }),

  removeOnlineUser: (user) =>
    set((state) => ({
      userOnline: state.userOnline.filter((item) => item.username !== user.username),
    })),
}));
