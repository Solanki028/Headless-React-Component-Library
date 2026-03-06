import { useState, useRef } from "react";
import type { ReactNode } from "react";
import { DropdownContext } from "./dropdown-context";

type DropdownProps = {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export function DropdownRoot({ children, open, onOpenChange }: DropdownProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const isControlled = open !== undefined;
    const state = isControlled ? open : internalOpen;

    const setOpen = (value: boolean) => {
        if (isControlled) {
            onOpenChange?.(value);
        } else {
            setInternalOpen(value);
        }
    };

    return (
        <DropdownContext.Provider value={{ open: state, setOpen, triggerRef }}>
            {children}
        </DropdownContext.Provider>
    );
}
