import * as React from "react";
import { useDialogContext } from "./dialog-context";

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, ...props }, ref) => {
    const { baseId } = useDialogContext();

    return (
      <h2 ref={ref} id={`dialog-${baseId}-title`} {...props}>
        {children}
      </h2>
    );
  }
);

DialogTitle.displayName = "Dialog.Title";