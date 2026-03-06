import { createContext, useContext } from "react";
import type { RefObject } from "react";

type DropdownContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    triggerRef: RefObject<HTMLButtonElement | null>;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error("Dropdown components must be used inside <Dropdown>");
    }

    return context;
}
