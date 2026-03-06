import * as React from "react";
import { TabsContext, type TabsOrientation, type TabsActivationMode } from "./tabs-context";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: TabsOrientation;
    activationMode?: TabsActivationMode;
}

export const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            value: controlledValue,
            defaultValue,
            onValueChange,
            orientation = "horizontal",
            activationMode = "automatic",
            children,
            ...props
        },
        ref
    ) => {
        const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
        const isControlled = controlledValue !== undefined;
        const value = isControlled ? controlledValue : uncontrolledValue;

        const handleValueChange = React.useCallback(
            (newValue: string) => {
                if (!isControlled) {
                    setUncontrolledValue(newValue);
                }
                onValueChange?.(newValue);
            },
            [isControlled, onValueChange]
        );

        const baseId = React.useId();
        const contextValue = React.useMemo(
            () => ({
                value,
                onValueChange: handleValueChange,
                orientation,
                activationMode,
                baseId,
            }),
            [
                value,
                handleValueChange,
                orientation,
                activationMode,
                baseId,
            ]
        );

        return (
            <TabsContext.Provider value={contextValue}>
                <div ref={ref} data-orientation={orientation} {...props}>
                    {children}
                </div>
            </TabsContext.Provider>
        );
    }
);

TabsRoot.displayName = "Tabs";
