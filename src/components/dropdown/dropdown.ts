import { DropdownRoot } from "./dropdown-root";
import { DropdownTrigger } from "./dropdown-trigger";
import { DropdownContent } from "./dropdown-content";
import { DropdownItem } from "./dropdown-item";

export const Dropdown = Object.assign(DropdownRoot, {
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Item: DropdownItem,
});
