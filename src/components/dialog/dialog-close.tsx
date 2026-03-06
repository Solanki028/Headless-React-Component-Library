import type { ButtonHTMLAttributes } from "react";
import { useDialogContext } from "./dialog-context";

type DialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DialogClose(props: DialogCloseProps) {
  const { setOpen } = useDialogContext();

  return (
    <button
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
    />
  );
}