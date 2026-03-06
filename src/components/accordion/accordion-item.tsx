import * as React from "react";
import { AccordionItemContext } from "./accordion-context";
import { useAccordionContext } from "./use-accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ value, children, disabled, ...props }, ref) => {
        const { value: selectedValues } = useAccordionContext();
        const isOpen = selectedValues.includes(value);

        const contextValue = React.useMemo(() => ({ value }), [value]);

        return (
            <AccordionItemContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    data-state={isOpen ? "open" : "closed"}
                    data-disabled={disabled ? "" : undefined}
                    {...props}
                >
                    {children}
                </div>
            </AccordionItemContext.Provider>
        );
    }
);

AccordionItem.displayName = "Accordion.Item";
