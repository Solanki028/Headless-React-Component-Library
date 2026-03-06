import * as React from "react";
import { DropdownContext } from "./dropdown-context";

export interface DropdownProps {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DropdownRoot({
    children,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
}: DropdownProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const baseId = React.useId();

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback(
        (value: boolean) => {
            if (!isControlled) {
                setUncontrolledOpen(value);
            }
            onOpenChange?.(value);
        },
        [isControlled, onOpenChange]
    );

    const contextValue = React.useMemo(
        () => ({
            open,
            setOpen,
            triggerRef,
            baseId,
        }),
        [open, setOpen, baseId]
    );

    return (
        <DropdownContext.Provider value={contextValue}>
            {children}
        </DropdownContext.Provider>
    );
}
