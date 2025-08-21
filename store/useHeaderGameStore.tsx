import { create } from "zustand";

interface HeaderGameProps {
    restartGame: () => void;
    setRestartGame: (func: () => void) => void;
}

export const useHeaderGameStore = create<HeaderGameProps>((set) =>({
    restartGame: () =>{},
    setRestartGame: (func) => set({restartGame: func}),
}));