import * as React from "react";
import { useDropdownContext } from "./dropdown-context";

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
    ({ onClick, onKeyDown, onMouseEnter, disabled, style, ...props }, ref) => {
        const { setOpen, triggerRef } = useDropdownContext();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) return;
            onClick?.(e);
            setOpen(false);
            triggerRef.current?.focus();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
                setOpen(false);
                triggerRef.current?.focus();
            }
            onKeyDown?.(e);
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) return;
            (e.currentTarget as HTMLElement).focus();
            onMouseEnter?.(e);
        };

        return (
            <button
                ref={ref}
                type="button"
                role="menuitem"
                tabIndex={disabled ? undefined : -1}
                aria-disabled={disabled}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    cursor: disabled ? "not-allowed" : "pointer",
                    padding: "8px 12px",
                    opacity: disabled ? 0.5 : 1,
                    ...style,
                }}
                {...props}
            />
        );
    }
);

DropdownItem.displayName = "Dropdown.Item";
