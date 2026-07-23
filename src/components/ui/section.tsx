import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-14 sm:py-20 lg:py-24", className)} {...props}>
      {children}
    </section>
  );
}
