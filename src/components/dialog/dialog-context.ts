import { createContext, useContext, type RefObject } from "react";

type DialogContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    triggerRef: RefObject<HTMLButtonElement | null>;
    baseId: string;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export function useDialogContext() {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error("Dialog components must be used inside <Dialog>");
    }

    return context;
}