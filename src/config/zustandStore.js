import create from "zustand";

export const useStore = create((set) => ({
  isLoading: false,
  startLoading: () => set(() => ({ isLoading: true })),
  stopLoading: () => set(() => ({ isLoading: false })),
}));
