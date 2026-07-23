import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Heading({ as: Tag = "h2", children, className }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-h2 font-medium text-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
