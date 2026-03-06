import type { ButtonHTMLAttributes, KeyboardEvent } from "react";
import { useDropdownContext } from "./dropdown-context";

type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownTrigger(props: DropdownTriggerProps) {
    const { open, setOpen, triggerRef } = useDropdownContext();

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) setOpen(true);
        }
        props.onKeyDown?.(e);
    };

    return (
        <button
            {...props}
            ref={triggerRef}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={(e) => {
                props.onClick?.(e);
                setOpen(!open);
            }}
            onKeyDown={handleKeyDown}
        />
    );
}
