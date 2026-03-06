import * as React from "react";
import { useAccordionContext, useAccordionItemContext } from "./use-accordion";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Used to force mounting when more control is needed.
     * Useful when controlling animation with React animation libraries.
     */
    forceMount?: boolean;
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, forceMount, ...props }, ref) => {
        const { value: selectedValues, baseId } = useAccordionContext();
        const { value: itemValue } = useAccordionItemContext();

        const isOpen = selectedValues.includes(itemValue);

        if (!isOpen && !forceMount) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="region"
                id={`accordion-${baseId}-content-${itemValue}`}
                aria-labelledby={`accordion-${baseId}-trigger-${itemValue}`}
                data-state={isOpen ? "open" : "closed"}
                hidden={!isOpen}
                {...props}
            >
                {children}
            </div>
        );
    }
);

AccordionContent.displayName = "Accordion.Content";
