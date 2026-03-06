import { createContext, useContext } from "react";

type DialogContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export function useDialogContext() {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error("Dialog components must be used inside <Dialog>");
    }

    return context;
}