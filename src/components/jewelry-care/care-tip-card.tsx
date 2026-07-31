import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type CareTipCardProps = {
  description: ReactNode;
  icon: LucideIcon;
  title: string;
};

export function CareTipCard({
  description,
  icon: Icon,
  title,
}: CareTipCardProps) {
  return (
    <article className="group rounded-soluna-lg border border-border/80 bg-surface p-6 shadow-card transition-all duration-standard ease-soluna hover:-translate-y-1 hover:border-accent-gold/35 hover:shadow-lift">
      <div className="grid size-12 place-items-center rounded-full border border-accent-gold/25 bg-secondary text-accent-gold">
        <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-body text-muted-foreground">{description}</p>
    </article>
  );
}
