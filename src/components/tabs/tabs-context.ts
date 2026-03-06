import * as React from "react";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsActivationMode = "automatic" | "manual";

export interface TabsContextValue {
    value: string | undefined;
    onValueChange: (value: string) => void;
    orientation: TabsOrientation;
    activationMode: TabsActivationMode;
    baseId: string;
}

export const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);
