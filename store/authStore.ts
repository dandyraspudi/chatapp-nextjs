import { create } from "zustand";

type AuthState = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (username) =>
    set({
      user: username,
    }),

  logout: () =>
    set({
      user: null,
    }),
}));

type User = {
  id: string;
  username: string;
};

type OnlineUserListStore = {
  userOnline: User[];
  setOnlineUser: (user: User) => void;
  removeOnlineUser: (user: User) => void;
};

export const useOnlineUser = create<OnlineUserListStore>((set) => ({
  userOnline: [],

  setOnlineUser: (user) =>
    set((state) => ({
      userOnline: [...state.userOnline, user],
    })),

  removeOnlineUser: (user) =>
    set((state) => ({
      userOnline: state.userOnline.filter((item) => item.id !== user.id),
    })),
}));
