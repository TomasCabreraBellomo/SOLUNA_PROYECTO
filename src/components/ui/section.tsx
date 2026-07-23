import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)} {...props}>
      {children}
    </section>
  );
}
