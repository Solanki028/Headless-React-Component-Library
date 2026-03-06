import type { ReactNode } from "react";

type DialogTitleProps = {
  children: ReactNode;
};

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2>{children}</h2>;
}