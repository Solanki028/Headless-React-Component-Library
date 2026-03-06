import type { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import { useDropdownContext } from "./dropdown-context";

type DropdownItemProps = HTMLAttributes<HTMLDivElement>;

export function DropdownItem(props: DropdownItemProps) {
    const { setOpen, triggerRef } = useDropdownContext();

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            props.onClick?.(e as unknown as MouseEvent<HTMLDivElement>);
            setOpen(false);
            triggerRef.current?.focus();
        }
        props.onKeyDown?.(e);
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        props.onClick?.(e);
        setOpen(false);
        triggerRef.current?.focus();
    };

    return (
        <div
            {...props}
            role="menuitem"
            tabIndex={-1}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={{
                cursor: "pointer",
                padding: "8px 12px",
                outline: "none",
                ...props.style,
            }}
            onMouseEnter={(e) => {
                (e.target as HTMLElement).focus();
                props.onMouseEnter?.(e);
            }}
        />
    );
}
