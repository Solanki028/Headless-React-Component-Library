import * as React from "react";
import { useTabsContext } from "./use-tabs";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    /**
     * Used to force mounting when more control is needed.
     * Useful when controlling animation with React animation libraries.
     */
    forceMount?: boolean;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ value, children, forceMount, ...props }, ref) => {
        const { value: contextValue, baseId } = useTabsContext();

        const isSelected = contextValue === value;

        if (!isSelected && !forceMount) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                id={`tabs-${baseId}-content-${value}`}
                aria-labelledby={`tabs-${baseId}-trigger-${value}`}
                tabIndex={0}
                data-state={isSelected ? "active" : "inactive"}
                hidden={!isSelected}
                {...props}
            >
                {children}
            </div>
        );
    }
);

TabsContent.displayName = "Tabs.Content";
