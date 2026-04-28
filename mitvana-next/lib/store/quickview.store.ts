import { ModalProps } from "../types";
import { create } from "zustand";

type QuickViewState = {
    modal: ModalProps<{ slug: string }>
    setModal: (modal: ModalProps<{ slug: string }>) => void;
    closeModal: () => void;
};

export const useQuickViewStore = create<QuickViewState>((set) => ({
    modal: { show: false },
    setModal: (modal: ModalProps<{ slug: string }>) => set({ modal }),
    closeModal: () => set({ modal: { show: false } }),
}));