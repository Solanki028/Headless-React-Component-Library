import * as React from "react";
import { AccordionContext, AccordionItemContext } from "./accordion-context";

export function useAccordionContext() {
    const context = React.useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an <Accordion> component");
    }
    return context;
}

export function useAccordionItemContext() {
    const context = React.useContext(AccordionItemContext);
    if (!context) {
        throw new Error(
            "AccordionItem internal components must be used within an <Accordion.Item> component"
        );
    }
    return context;
}
