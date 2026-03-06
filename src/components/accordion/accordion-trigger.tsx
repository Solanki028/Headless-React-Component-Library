import * as React from "react";
import { useAccordionContext, useAccordionItemContext } from "./use-accordion";

export type AccordionTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, onClick, onKeyDown, ...props }, ref) => {
        const { value: selectedValues, onItemOpen, onItemClose, baseId } = useAccordionContext();
        const { value: itemValue } = useAccordionItemContext();

        const isOpen = selectedValues.includes(itemValue);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (isOpen) {
                onItemClose(itemValue);
            } else {
                onItemOpen(itemValue);
            }
            onClick?.(e);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (isOpen) {
                    onItemClose(itemValue);
                } else {
                    onItemOpen(itemValue);
                }
            }
            onKeyDown?.(e);
        };

        return (
            <button
                ref={ref}
                type="button"
                role="button"
                id={`accordion-${baseId}-trigger-${itemValue}`}
                aria-controls={`accordion-${baseId}-content-${itemValue}`}
                aria-expanded={isOpen}
                data-state={isOpen ? "open" : "closed"}
                data-accordion-trigger=""
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </button>
        );
    }
);

AccordionTrigger.displayName = "Accordion.Trigger";
