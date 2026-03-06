import type { ButtonHTMLAttributes } from "react";
import { useDialogContext } from "./dialog-context";

type DialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DialogTrigger(props: DialogTriggerProps) {
  const { setOpen } = useDialogContext();

  return (
    <button
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(true);
      }}
    />
  );
}