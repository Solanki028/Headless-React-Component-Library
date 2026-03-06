import * as React from "react";
import { useTabsContext } from "./use-tabs";

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ children, onKeyDown, ...props }, forwardedRef) => {
        const { orientation, activationMode, onValueChange } = useTabsContext();
        const internalRef = React.useRef<HTMLDivElement>(null);

        const ref = React.useCallback(
            (node: HTMLDivElement) => {
                internalRef.current = node;
                if (typeof forwardedRef === "function") {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    forwardedRef.current = node;
                }
            },
            [forwardedRef]
        );

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                const listNode = internalRef.current;
                if (!listNode) return;

                const focusedElement = document.activeElement as HTMLButtonElement | null;
                if (!focusedElement) return;

                const triggers = Array.from(
                    listNode.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
                );

                const currentIndex = triggers.indexOf(focusedElement);
                if (currentIndex === -1) return;

                let nextIndex = currentIndex;
                const isHorizontal = orientation === "horizontal";

                switch (event.key) {
                    case isHorizontal ? "ArrowRight" : "ArrowDown":
                        nextIndex = (currentIndex + 1) % triggers.length;
                        break;
                    case isHorizontal ? "ArrowLeft" : "ArrowUp":
                        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
                        break;
                    case "Home":
                        nextIndex = 0;
                        break;
                    case "End":
                        nextIndex = triggers.length - 1;
                        break;
                    default:
                        onKeyDown?.(event);
                        return;
                }

                event.preventDefault();

                const nextTrigger = triggers[nextIndex];
                if (nextTrigger) {
                    nextTrigger.focus();
                    if (activationMode === "automatic") {
                        const val = nextTrigger.getAttribute("data-value");
                        if (val !== null) {
                            onValueChange(val);
                        }
                    }
                }

                onKeyDown?.(event);
            },
            [orientation, activationMode, onValueChange, onKeyDown]
        );

        return (
            <div
                ref={ref}
                role="tablist"
                aria-orientation={orientation}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </div>
        );
    }
);

TabsList.displayName = "Tabs.List";
