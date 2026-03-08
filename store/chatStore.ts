import { create } from "zustand";

type ChatState = {
  typingUser: string | null;
  setTypingUser: (user: string | null) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  typingUser: null,

  setTypingUser: (user) =>
    set({
      typingUser: user,
    }),
}));
