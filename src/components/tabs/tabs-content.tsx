import * as React from "react";
import { useTabsContext } from "./use-tabs";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ value, children, ...props }, ref) => {
        const { value: contextValue, baseId } = useTabsContext();

        const isSelected = contextValue === value;

        if (!isSelected) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                id={`tabs-${baseId}-content-${value}`}
                aria-labelledby={`tabs-${baseId}-trigger-${value}`}
                tabIndex={0}
                data-state="active"
                {...props}
            >
                {children}
            </div>
        );
    }
);

TabsContent.displayName = "Tabs.Content";
