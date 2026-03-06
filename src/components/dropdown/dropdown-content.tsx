import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDropdownContext } from "./dropdown-context";
import type { ReactNode } from "react";

type DropdownContentProps = {
    children: ReactNode;
    style?: React.CSSProperties;
};

export function DropdownContent({ children, style: userStyle }: DropdownContentProps) {
    const { open, setOpen, triggerRef } = useDropdownContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const searchQueryRef = useRef("");
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Position popover
    useEffect(() => {
        if (open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setStyle({
                position: "absolute",
                top: `${rect.bottom + window.scrollY + 4}px`,
                left: `${rect.left + window.scrollX}px`,
                zIndex: 1000,
            });
        }
    }, [open, triggerRef]);

    // Close on click outside
    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (e: PointerEvent) => {
            const target = e.target as Node;
            if (triggerRef.current?.contains(target)) return;
            if (contentRef.current && !contentRef.current.contains(target)) {
                setOpen(false);
            }
        };

        // Delay attaching to not catch the event that opened the dropdown
        const timeoutId = setTimeout(() => document.addEventListener("pointerdown", handlePointerDown), 0);
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [open, setOpen, triggerRef]);

    // Keyboard navigation
    useEffect(() => {
        if (!open) return;

        const content = contentRef.current;
        if (!content) return;

        const getItems = () => {
            return Array.from(content.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
                return;
            }

            const items = getItems();
            if (items.length === 0) return;

            const activeElement = document.activeElement as HTMLElement;
            const currentIndex = items.indexOf(activeElement);

            if (e.key === "ArrowDown") {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % items.length;
                items[nextIndex]?.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                items[prevIndex]?.focus();
            } else if (e.key === "Home") {
                e.preventDefault();
                items[0]?.focus();
            } else if (e.key === "End") {
                e.preventDefault();
                items[items.length - 1]?.focus();
            } else if (e.key === "Tab") {
                e.preventDefault();
                if (e.shiftKey) {
                    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items[prevIndex]?.focus();
                } else {
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex]?.focus();
                }
            } else if (/^[a-zA-Z0-9_-]$/.test(e.key)) {
                const query = searchQueryRef.current + e.key.toLowerCase();
                searchQueryRef.current = query;

                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }
                searchTimeoutRef.current = setTimeout(() => {
                    searchQueryRef.current = "";
                }, 500);

                const match = items.find(item =>
                    item.textContent?.toLowerCase().trim().startsWith(query)
                );

                if (match) {
                    match.focus();
                }
            }
        };

        content.addEventListener("keydown", handleKeyDown);

        // Auto focus first item on open
        const items = getItems();
        if (items.length > 0 && !items.includes(document.activeElement as HTMLElement)) {
            items[0].focus();
        }

        return () => {
            content.removeEventListener("keydown", handleKeyDown);
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return createPortal(
        <div
            ref={contentRef}
            role="menu"
            style={{
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "4px",
                minWidth: "150px",
                display: "flex",
                flexDirection: "column",
                ...style,
                ...userStyle,
            }}
        >
            {children}
        </div>,
        document.body
    );
}
