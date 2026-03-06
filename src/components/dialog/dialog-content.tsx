import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDialogContext } from "./dialog-context";
import type { ReactNode } from "react";

type DialogContentProps = {
    children: ReactNode;
    style?: React.CSSProperties;
};

export function DialogContent({ children, style }: DialogContentProps) {
    const { open, setOpen } = useDialogContext();
    const dialogRef = useRef<HTMLDivElement>(null);

    /* ESCAPE KEY CLOSE */
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [setOpen]);

    /* FOCUS TRAP */
    useEffect(() => {
        if (!open) return;

        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = dialog.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        function handleTab(e: KeyboardEvent) {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        dialog.addEventListener("keydown", handleTab);

        first?.focus();

        return () => {
            dialog.removeEventListener("keydown", handleTab);
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
                if (e.target === dialogRef.current) {
                    setOpen(false);
                }
            }}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "6px",
                    minWidth: "300px",
                    ...style,
                }}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}