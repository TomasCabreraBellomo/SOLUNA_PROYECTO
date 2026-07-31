import { Droplets, Layers3, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const tips = [
  { icon: Droplets, label: "Evitá agua y perfumes." },
  { icon: Layers3, label: "Guardá cada pieza por separado." },
  { icon: Sparkles, label: "Limpiá con un paño suave." },
  { icon: ShieldCheck, label: "Elegí el cuidado según el material." },
] as const;

export function HomeCarePreview() {
  return (
    <Reveal className="overflow-hidden rounded-soluna-lg border border-accent-gold/25 bg-[linear-gradient(135deg,hsl(var(--surface))_0%,hsl(var(--secondary)/0.72)_100%)] p-6 shadow-card sm:p-9 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-eyebrow font-bold uppercase text-accent-gold">
            Cuida tus favoritos
          </p>
          <h2 className="mt-4 max-w-xl font-display text-h2 font-medium text-foreground">
            Pequeños cuidados, brillo por más tiempo
          </h2>
          <p className="mt-5 max-w-lg text-body text-muted-foreground">
            Aprendé cómo guardar, limpiar y proteger tus accesorios según su
            material.
          </p>
          <Button className="mt-7" href="/cuida-tus-joyas" variant="secondary">
            Ver guía de cuidados
          </Button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {tips.map(({ icon: Icon, label }) => (
            <li
              className="flex min-h-24 items-center gap-4 rounded-soluna border border-border/70 bg-background/85 p-4 text-small font-semibold text-foreground shadow-sm"
              key={label}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-accent-gold">
                <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
