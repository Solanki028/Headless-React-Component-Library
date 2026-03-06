import * as React from "react";
import { createPortal } from "react-dom";
import { useDialogContext } from "./dialog-context";
import { useComposedRefs } from "../../utils/refs";

export type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
    ({ children, style, onClick, ...props }, forwardedRef) => {
        const { open, setOpen, triggerRef, baseId } = useDialogContext();
        const contentRef = React.useRef<HTMLDivElement>(null);

        const composedRefs = useComposedRefs(forwardedRef, contentRef);


        React.useEffect(() => {
            if (!open) return;

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setOpen(false);
                }
            };
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, [open, setOpen]);


        React.useEffect(() => {
            if (!open) return;

            const content = contentRef.current;
            if (!content) return;

            const previouslyFocusedElement = document.activeElement as HTMLElement;

            const focusableElements = content.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            function handleTab(e: KeyboardEvent) {
                if (e.key !== "Tab") return;

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last?.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first?.focus();
                    }
                }
            }

            content.addEventListener("keydown", handleTab);
            first?.focus();

            const trigger = triggerRef.current;
            return () => {
                content.removeEventListener("keydown", handleTab);

                if (trigger) {
                    trigger.focus();
                } else if (previouslyFocusedElement) {
                    previouslyFocusedElement.focus();
                }
            };
        }, [open, triggerRef]);

        if (!open) return null;

        return createPortal(
            <div
                role="presentation"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setOpen(false);
                    }
                    onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                }}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                }}
            >
                <div
                    ref={composedRefs}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`dialog-${baseId}-title`}
                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "6px",
                        minWidth: "300px",
                        ...style,
                    }}
                    {...props}
                >
                    {children}
                </div>
            </div>,
            document.body
        );
    }
);

DialogContent.displayName = "Dialog.Content";