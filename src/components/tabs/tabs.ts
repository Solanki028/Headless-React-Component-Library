import { TabsRoot, type TabsProps } from "./tabs-root";
import { TabsList, type TabsListProps } from "./tabs-list";
import { TabsTrigger, type TabsTriggerProps } from "./tabs-trigger";
import { TabsContent, type TabsContentProps } from "./tabs-content";

export const Tabs = Object.assign(TabsRoot, {
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
});

export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
