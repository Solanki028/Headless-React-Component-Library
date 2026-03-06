import { useState } from "react";
import type { ReactNode } from "react";
import { DialogContext } from "./dialog-context";

type DialogProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DialogRoot({ children, open, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const state = isControlled ? open : internalOpen;

  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  return (
    <DialogContext.Provider value={{ open: state, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}