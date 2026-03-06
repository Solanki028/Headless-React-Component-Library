import * as React from "react";
import { TabsContext } from "./tabs-context";

export function useTabsContext() {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a <Tabs> component");
    }
    return context;
}
