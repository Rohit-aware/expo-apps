import { create } from "zustand";

type ChatState = {
    selectedRoom: any | null;
    setSelectedRoom: (room: any) => void;
};

export const useChatStore = create<ChatState>((set) => ({
    selectedRoom: null,
    setSelectedRoom: (room) => set({ selectedRoom: room }),
}));