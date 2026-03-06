import * as React from "react";
import { useDropdownContext } from "./dropdown-context";
import { useComposedRefs } from "../../utils/refs";

export type DropdownTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
    ({ onClick, onKeyDown, ...props }, forwardedRef) => {
        const { open, setOpen, triggerRef, baseId } = useDropdownContext();

        const composedRefs = useComposedRefs(forwardedRef, triggerRef);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!open) {
                    setOpen(true);
                } else {
                    // If already open, find the menu and focus first item
                    const content = document.getElementById(`dropdown-${baseId}-content`);
                    if (content) {
                        const firstItem = content.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
                        firstItem?.focus();
                    }
                }
            }
            onKeyDown?.(e);
        };

        return (
            <button
                ref={composedRefs}
                type="button"
                id={`dropdown-${baseId}-trigger`}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={open ? `dropdown-${baseId}-content` : undefined}
                onClick={(e) => {
                    onClick?.(e);
                    setOpen(!open);
                }}
                onKeyDown={handleKeyDown}
                {...props}
            />
        );
    }
);

DropdownTrigger.displayName = "Dropdown.Trigger";
