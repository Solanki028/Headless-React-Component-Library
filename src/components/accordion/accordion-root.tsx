import * as React from "react";
import { AccordionContext } from "./accordion-context";

export interface AccordionSingleProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
}

export interface AccordionMultipleProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    collapsible?: never; // Multiple is inherently collapsible, don't confuse users
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionProps>(
    (props, ref) => {
        const { children, ...restProps } = props;
        const baseId = React.useId();
        const internalRef = React.useRef<HTMLDivElement>(null);

        const mergedRef = React.useCallback(
            (node: HTMLDivElement) => {
                internalRef.current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            },
            [ref]
        );

        // Normalize state to an array of strings whether single or multiple
        const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(() => {
            if (props.type === "multiple") {
                return props.defaultValue || [];
            }
            return props.defaultValue ? [props.defaultValue] : [];
        });

        const isControlled = props.value !== undefined;

        const value = React.useMemo(() => {
            if (isControlled) {
                if (props.type === "multiple") return props.value as string[];
                return props.value ? [(props.value as string)] : [];
            }
            return uncontrolledValue;
        }, [isControlled, props.value, props.type, uncontrolledValue]);

        const handleItemOpen = React.useCallback(
            (itemValue: string) => {
                let nextValue: string[];

                if (props.type === "single") {
                    nextValue = [itemValue];
                    if (!isControlled) setUncontrolledValue(nextValue);
                    props.onValueChange?.(itemValue);
                } else {
                    nextValue = [...value, itemValue];
                    if (!isControlled) setUncontrolledValue(nextValue);
                    props.onValueChange?.(nextValue);
                }
            },
            [isControlled, props, value]
        );

        const handleItemClose = React.useCallback(
            (itemValue: string) => {
                if (props.type === "single") {
                    if (props.type === "single" && props.collapsible) {
                        if (!isControlled) setUncontrolledValue([]);
                        props.onValueChange?.("");
                    }
                } else {
                    const nextValue = value.filter((v) => v !== itemValue);
                    if (!isControlled) setUncontrolledValue(nextValue);
                    props.onValueChange?.(nextValue);
                }
            },
            [isControlled, props, value]
        );

        // Keyboard Navigation (Roving Focus)
        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                const container = internalRef.current;
                if (!container) return;

                const focusedElement = document.activeElement as HTMLButtonElement | null;
                if (!focusedElement) return;

                const triggers = Array.from(
                    container.querySelectorAll<HTMLButtonElement>(
                        '[role="button"][data-accordion-trigger]:not([disabled])'
                    )
                );

                const currentIndex = triggers.indexOf(focusedElement);
                if (currentIndex === -1) return;

                let nextIndex = currentIndex;

                switch (event.key) {
                    case "ArrowDown":
                        nextIndex = (currentIndex + 1) % triggers.length;
                        break;
                    case "ArrowUp":
                        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
                        break;
                    case "Home":
                        nextIndex = 0;
                        break;
                    case "End":
                        nextIndex = triggers.length - 1;
                        break;
                    default:
                        props.onKeyDown?.(event);
                        return;
                }

                event.preventDefault();

                const nextTrigger = triggers[nextIndex];
                if (nextTrigger) {
                    nextTrigger.focus();
                }

                props.onKeyDown?.(event);
            },
            [props]
        );

        const contextValue = React.useMemo(
            () => ({
                value,
                onItemOpen: handleItemOpen,
                onItemClose: handleItemClose,
                baseId,
            }),
            [value, handleItemOpen, handleItemClose, baseId]
        );

        // Filter out accordion-specific props before spreading to the div
        const divProps = Object.fromEntries(
            Object.entries(restProps).filter(([key]) =>
                !["type", "value", "defaultValue", "onValueChange", "collapsible", "onKeyDown"].includes(key)
            )
        );

        return (
            <AccordionContext.Provider value={contextValue}>
                <div ref={mergedRef} onKeyDown={handleKeyDown} data-orientation="vertical" {...divProps}>
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    }
);

AccordionRoot.displayName = "Accordion";
