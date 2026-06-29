import { Briefcase, Radio } from "lucide-react";

type ExperienceItem = {
  company: string;
  role: string;
  description: string;
  tags: string[];
  status: "current" | "past";
};

const experiences: ExperienceItem[] = [
  {
    company: "Imobzi",
    role: "Suporte Técnico N1 (Estágio)",
    description:
      "Atuação focada em atendimento técnico, diagnóstico de chamados, suporte ao usuário e aplicação prática de lógica e sistemas no dia a dia da plataforma.",
    tags: ["Suporte N1", "Diagnóstico", "Atendimento"],
    status: "current",
  },
];

export function Experience() {
  return (
    <section id="experiencia" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[var(--neon)] font-medium">
            Experiência
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Onde Atuo Hoje</h2>
        </div>

        <div className="grid gap-6">
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="bento-card bento-card-hover p-7 sm:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-5 right-5">
                {exp.status === "current" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--neon)]">
                    <Radio className="h-3 w-3" />
                    Em andamento
                  </span>
                ) : null}
              </div>

              <div className="flex items-start gap-4 pr-28">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/50">
                  <Briefcase className="h-5 w-5 text-[var(--neon)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--violet)]">{exp.role}</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {exp.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
