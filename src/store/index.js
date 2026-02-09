import { create } from "zustand";

const useMacbookStore = create((set) => ({
        color: "#2E2C2E",
        setColor: (color) => set({ color }),

        scale: 0.08,
        setScale: (scale) => set({ scale }),

        reset: () => set({ color: "#2E2C2E", scale: 0.08}),
}))

export default useMacbookStore;