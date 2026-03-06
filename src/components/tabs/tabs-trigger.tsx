import * as React from "react";
import { useTabsContext } from "./use-tabs";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, children, onClick, onKeyDown, ...props }, forwardedRef) => {
        const {
            value: contextValue,
            onValueChange,
            baseId,
        } = useTabsContext();

        const isSelected = contextValue === value;
        const tabIndex = isSelected ? 0 : -1;

        const handleClick = React.useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isSelected) {
                    onValueChange(value);
                }
                onClick?.(e);
            },
            [isSelected, value, onValueChange, onClick]
        );

        const handleKeyDown = React.useCallback(
            (e: React.KeyboardEvent<HTMLButtonElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!isSelected) {
                        onValueChange(value);
                    }
                }
                onKeyDown?.(e);
            },
            [isSelected, value, onValueChange, onKeyDown]
        );

        return (
            <button
                ref={forwardedRef}
                role="tab"
                type="button"
                id={`tabs-${baseId}-trigger-${value}`}
                aria-selected={isSelected}
                aria-controls={`tabs-${baseId}-content-${value}`}
                data-state={isSelected ? "active" : "inactive"}
                data-value={value}
                tabIndex={tabIndex}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </button>
        );
    }
);

TabsTrigger.displayName = "Tabs.Trigger";
