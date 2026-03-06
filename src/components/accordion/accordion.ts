import { AccordionRoot } from "./accordion-root";
import { AccordionItem } from "./accordion-item";
import { AccordionTrigger } from "./accordion-trigger";
import { AccordionContent } from "./accordion-content";

export const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
});

export type { AccordionProps, AccordionSingleProps, AccordionMultipleProps } from "./accordion-root";
export type { AccordionItemProps } from "./accordion-item";
export type { AccordionTriggerProps } from "./accordion-trigger";
export type { AccordionContentProps } from "./accordion-content";
