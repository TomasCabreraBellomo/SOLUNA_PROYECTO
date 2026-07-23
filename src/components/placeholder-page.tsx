import { EmptyState } from "@/components/empty-state";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({
  description,
  eyebrow,
  title,
}: PlaceholderPageProps) {
  return (
    <PublicLayout>
      <Section>
        <Container>
          <SectionHeading
            description={description}
            eyebrow={eyebrow}
            title={title}
          />
          <EmptyState
            className="mt-10 text-left"
            description="El contenido completo se incorporará en próximas etapas, manteniendo esta estructura visual y los datos centralizados."
            title="Sección en preparación"
          />
        </Container>
      </Section>
    </PublicLayout>
  );
}
