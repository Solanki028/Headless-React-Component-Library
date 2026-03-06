import { DialogRoot } from "./dialog-root";
import { DialogTrigger } from "./dialog-trigger";
import { DialogContent } from "./dialog-content";
import { DialogClose } from "./dialog-close";
import { DialogTitle } from "./dialog-title";

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Close: DialogClose,
  Title: DialogTitle,
});