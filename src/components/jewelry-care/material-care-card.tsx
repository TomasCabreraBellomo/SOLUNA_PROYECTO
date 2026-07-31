import type { LucideIcon } from "lucide-react";

type MaterialCareCardProps = {
  id: string;
  icon: LucideIcon;
  items: readonly {
    title: string;
    description: string;
  }[];
  title: string;
};

export function MaterialCareCard({
  id,
  icon: Icon,
  items,
  title,
}: MaterialCareCardProps) {
  return (
    <article
      className="scroll-mt-32 rounded-soluna-lg border border-border/80 bg-surface p-6 shadow-card sm:p-8"
      id={id}
    >
      <div className="flex items-center gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-accent-gold">
          <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
        </div>
        <h3 className="font-display text-3xl font-semibold leading-tight text-foreground">
          {title}
        </h3>
      </div>
      <dl className="mt-6 grid gap-5">
        {items.map((item) => (
          <div
            className="border-l border-accent-gold/35 pl-4"
            key={item.title}
          >
            <dt className="font-bold text-foreground">{item.title}</dt>
            <dd className="mt-1 text-body text-muted-foreground">
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
