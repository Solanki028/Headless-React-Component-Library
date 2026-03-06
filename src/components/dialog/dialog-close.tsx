import * as React from "react";
import { useDialogContext } from "./dialog-context";

export type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          setOpen(false);
        }}
        {...props}
      />
    );
  }
);

DialogClose.displayName = "Dialog.Close";