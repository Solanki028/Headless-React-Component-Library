import * as React from "react";

export type DropdownContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    baseId: string;
};

export const DropdownContext = React.createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
    const context = React.useContext(DropdownContext);

    if (!context) {
        throw new Error("Dropdown components must be used inside <Dropdown>");
    }

    return context;
}
