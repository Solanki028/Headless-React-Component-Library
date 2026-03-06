import * as React from "react";

export interface AccordionContextValue {
    value: string[];
    onItemOpen: (itemValue: string) => void;
    onItemClose: (itemValue: string) => void;
    baseId: string;
}

export const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionItemContextValue {
    value: string;
}

export const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(
    undefined
);
