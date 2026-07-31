const links = [
  { href: "#cuidados-generales", label: "Cuidados generales" },
  { href: "#plata-925", label: "Plata 925" },
  {
    href: "#acero-inoxidable-quirurgico",
    label: "Acero inoxidable y quirúrgico",
  },
  { href: "#acero-blanco", label: "Acero blanco" },
  { href: "#cobre-blanco", label: "Cobre blanco" },
  { href: "#fantasia", label: "Fantasía" },
  { href: "#mantener-el-brillo", label: "Mantener el brillo" },
] as const;

export function CareGuideNav() {
  return (
    <nav aria-label="Índice de la guía de cuidados">
      <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {links.map((link) => (
          <li className="shrink-0" key={link.href}>
            <a
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 text-small font-bold text-muted-foreground shadow-sm transition-all duration-fast hover:border-accent-gold/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
