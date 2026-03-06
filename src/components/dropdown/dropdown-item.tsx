import * as React from "react";
import { useDropdownContext } from "./dropdown-context";

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
    ({ onClick, onKeyDown, onMouseEnter, disabled, style, ...props }, ref) => {
        const { setOpen, triggerRef } = useDropdownContext();

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) return;
            onClick?.(e);
            setOpen(false);
            triggerRef.current?.focus();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                setOpen(false);
                triggerRef.current?.focus();
            }
            onKeyDown?.(e);
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) return;
            (e.currentTarget as HTMLElement).focus();
            onMouseEnter?.(e);
        };

        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={disabled ? undefined : -1}
                aria-disabled={disabled}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    padding: "8px 12px",
                    outline: "none",
                    opacity: disabled ? 0.5 : 1,
                    ...style,
                }}
                {...props}
            />
        );
    }
);

DropdownItem.displayName = "Dropdown.Item";
