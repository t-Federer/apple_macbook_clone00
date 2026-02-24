import { create } from "zustand";

const useMacbookStore = create((set) => ({
        color: "#ADB5BD",
        setColor: (color) => set({ color }),

        scale: 0.07, //16" default
        setScale: (scale) => set({ scale }),

        texture: "/videos/feature-1.mp4",
        setTexture: (texture) => set({ texture }),

        reset: () => set({ color: "#ADB5BD", scale: 0.07, texture: "/videos/feature-1.mp4" }),
}))

export default useMacbookStore;
