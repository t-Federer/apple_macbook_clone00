import { create } from "zustand";

const useMacbookStore = create((set) => ({
        color: "#5F5A59",
        setColor: (color) => set({ color }),

        scale: 0.08,
        setScale: (scale) => set({ scale }),

        reset: () => set({ color: "#5F5A59", scale: 0.07}),
}))

export default useMacbookStore;