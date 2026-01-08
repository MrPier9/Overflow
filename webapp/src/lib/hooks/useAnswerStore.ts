import { create } from "zustand/react";
import { Answer } from "../types"

type AnswerStore = {
    answer: Answer | undefined;
    setAnswer: (answer: Answer) => void;
    clearAnswer: () => void
}

export const useAnswerStore = create<AnswerStore>((set) => ({
    answer: undefined,
    setAnswer: (answer) => set({ answer }),
    clearAnswer: () => set({ answer: undefined })
}))