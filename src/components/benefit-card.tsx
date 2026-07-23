import type { LucideIcon } from "lucide-react";

type BenefitCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function BenefitCard({
  icon: Icon,
  title,
  description,
}: BenefitCardProps) {
  return (
    <article className="rounded-soluna border border-border bg-surface p-5">
      <div className="mb-5 grid size-11 place-items-center rounded-full bg-secondary text-accent-gold">
        <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-small text-muted-foreground">{description}</p>
    </article>
  );
}
