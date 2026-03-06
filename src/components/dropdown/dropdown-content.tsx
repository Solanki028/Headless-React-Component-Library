import * as React from "react";
import { createPortal } from "react-dom";
import { useDropdownContext } from "./dropdown-context";
import { useComposedRefs } from "../../utils/refs";

export type DropdownContentProps = React.HTMLAttributes<HTMLDivElement>;

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
    ({ children, style: userStyle, ...props }, forwardedRef) => {
        const { open, setOpen, triggerRef, baseId } = useDropdownContext();
        const contentRef = React.useRef<HTMLDivElement>(null);
        const [coords, setCoords] = React.useState({ top: 0, left: 0 });
        const searchQueryRef = React.useRef("");
        const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

        const composedRefs = useComposedRefs(forwardedRef, contentRef);


        React.useLayoutEffect(() => {
            if (open && triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                setCoords({
                    top: rect.bottom + window.scrollY + 4,
                    left: rect.left + window.scrollX,
                });
            }
        }, [open, triggerRef]);


        React.useEffect(() => {
            if (!open) return;

            const handlePointerDown = (e: PointerEvent) => {
                const target = e.target as Node;
                if (triggerRef.current?.contains(target)) return;
                if (contentRef.current && !contentRef.current.contains(target)) {
                    setOpen(false);
                }
            };

            const timeoutId = setTimeout(() => document.addEventListener("pointerdown", handlePointerDown), 0);
            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener("pointerdown", handlePointerDown);
            };
        }, [open, setOpen, triggerRef]);


        // Keyboard navigation
        const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
                return;
            }

            const content = contentRef.current;
            if (!content) return;

            const getItems = () => Array.from(content.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'));
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
                const prevIndex = (currentIndex - 1 + items.length) % items.length;
                items[prevIndex]?.focus();
            } else if (e.key === "Home") {
                e.preventDefault();
                items[0]?.focus();
            } else if (e.key === "End") {
                e.preventDefault();
                items[items.length - 1]?.focus();
            } else if (e.key === "Tab") {
                e.preventDefault();
                setOpen(false);
                triggerRef.current?.focus();
            } else if (e.key.length === 1 && /^[a-zA-Z0-9_-]$/.test(e.key)) {
                const query = (searchQueryRef.current + e.key).toLowerCase();
                searchQueryRef.current = query;

                if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                searchTimeoutRef.current = setTimeout(() => {
                    searchQueryRef.current = "";
                }, 500);

                const match = items.find(item => item.textContent?.toLowerCase().trim().startsWith(query));
                if (match) match.focus();
            }
        }, [setOpen, triggerRef]);

        // Auto-focus first item on open
        React.useEffect(() => {
            if (open) {
                const timer = setTimeout(() => {
                    const content = contentRef.current;
                    if (content) {
                        const items = Array.from(content.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'));
                        if (items.length > 0 && !items.includes(document.activeElement as HTMLElement)) {
                            items[0].focus();
                        }
                    }
                }, 50);
                return () => clearTimeout(timer);
            }
        }, [open]);

        if (!open) return null;

        return createPortal(
            <div
                ref={composedRefs}
                id={`dropdown-${baseId}-content`}
                role="menu"
                tabIndex={-1}
                aria-labelledby={`dropdown-${baseId}-trigger`}
                onKeyDown={handleKeyDown}
                style={{
                    position: "absolute",
                    top: `${coords.top}px`,
                    left: `${coords.left}px`,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "4px",
                    minWidth: "150px",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1000,
                    outline: "none",
                    ...userStyle,
                }}
                {...props}
            >
                {children}
            </div>,
            document.body
        );
    }
);

DropdownContent.displayName = "Dropdown.Content";
