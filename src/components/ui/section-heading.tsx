import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-eyebrow font-bold uppercase text-accent-gold">
          {eyebrow}
        </p>
      ) : null}
      <Heading>{title}</Heading>
      {description ? (
        <p className="mt-4 text-body text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
