import * as React from "react";
import { useDialogContext } from "./dialog-context";
import { useComposedRefs } from "../../utils/refs";

export type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef, baseId } = useDialogContext();

    const composedRefs = useComposedRefs(forwardedRef, triggerRef);

    return (
      <button
        ref={composedRefs}
        type="button"
        id={`dialog-${baseId}-trigger`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? `dialog-${baseId}-content` : undefined}
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
        {...props}
      />
    );
  }
);

DialogTrigger.displayName = "Dialog.Trigger";