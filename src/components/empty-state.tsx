import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
};

export function EmptyState({
  actionHref,
  actionLabel,
  className,
  description,
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-soluna border border-dashed border-border bg-surface-muted p-8 text-center",
        className,
      )}
    >
      <h3 className="font-display text-3xl font-medium text-foreground">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-body text-muted-foreground">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Button className="mt-6" href={actionHref} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
