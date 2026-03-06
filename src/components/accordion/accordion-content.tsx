import * as React from "react";
import { useAccordionContext, useAccordionItemContext } from "./use-accordion";

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, ...props }, ref) => {
        const { value: selectedValues, baseId } = useAccordionContext();
        const { value: itemValue } = useAccordionItemContext();

        const isOpen = selectedValues.includes(itemValue);

        if (!isOpen) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="region"
                id={`accordion-${baseId}-content-${itemValue}`}
                aria-labelledby={`accordion-${baseId}-trigger-${itemValue}`}
                data-state="open"
                {...props}
            >
                {children}
            </div>
        );
    }
);

AccordionContent.displayName = "Accordion.Content";
