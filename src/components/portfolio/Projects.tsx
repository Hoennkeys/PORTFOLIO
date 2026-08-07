import { useState } from "react";
import { ExternalLink, Github, Hammer, Radio } from "lucide-react";
import { GithubModal } from "./GithubModal";

type Repo = {
  url: string;
  name: string;
  label?: string;
};

type Project = {
  title: string;
  description: string;
  stack: string[];
  status: "online" | "construcao";
  liveUrl?: string;
  repoUrl?: string;
  repoName?: string;
  extraRepos?: Repo[];
};

const projects: Project[] = [
  {
    title: "Plataforma de Serviços (Tibia)",
    description:
      "Sistema personalizado para gerenciamento de encomendas e serviços diretos, focado na experiência do usuário e controle de fluxo.",
    stack: ["React", "TypeScript", "Tailwind", "Vite"],
    status: "online",
    liveUrl: "https://ferreiraservice.vercel.app/",
  },
  {
    title: "Marketplace MMORPG",
    description:
      "Plataforma de marketplace e automação para a comunidade de MMORPG, otimizando transações e fluxos de jogo.",
    stack: ["React", "TypeScript", "Node.js"],
    status: "construcao",
    repoUrl: "https://github.com/Hoennkeys/munera-landing-page-36",
    repoName: "Hoennkeys/munera-landing-page-36",
  },
  {
    title: "CRM de Gestão de Vendas",
    description:
      "Sistema robusto para gerenciar leads, clientes e funil de vendas, com foco em segurança, escalabilidade e UX fluida para equipes comerciais.",
    stack: ["React", "Node.js", "SQL", "TypeScript"],
    status: "construcao",
    repoUrl: "https://github.com/Hoennkeys/vendapro-crm",
    repoName: "Hoennkeys/vendapro-crm",
  },
  {
    title: "Portfólio Pessoal",
    description:
      "Este site: portfólio interativo com identidade visual própria, apresentando projetos, stack e formas de contato — open source e em evolução contínua.",
    stack: ["TanStack Start", "React", "TypeScript", "Tailwind"],
    status: "online",
    repoUrl: "https://github.com/Hoennkeys/PORTFOLIO",
    repoName: "Hoennkeys/PORTFOLIO",
  },
  {
    title: "RibbitApp + RibbitSite",
    description:
      "Ecossistema de absorção, identificação e catalogação de sons de sapos, rãs e pererecas. O app captura e processa os áudios enquanto o site exibe o acervo e os dados coletados.",
    stack: ["React Native", "TypeScript", "Supabase", "React", "Tailwind", "Vite"],
    status: "construcao",
    liveUrl: "https://appribbit.vercel.app/",
    repoUrl: "https://github.com/Hoennkeys/RibbitApp",
    repoName: "Hoennkeys/RibbitApp",
    extraRepos: [
      {
        url: "https://github.com/Hoennkeys/RibbitSite",
        name: "Hoennkeys/RibbitSite",
        label: "Ver RibbitSite no GitHub",
      },
    ],
  },
  {
    title: "Chaotic Idle",
    description:
      "Jogo idle em desenvolvimento baseado no universo Chaotic. Colecione e evolua criaturas, acumule recursos passivamente e descubra combinações únicas nesse universo estratégico e nostálgico.",
    stack: ["JavaScript", "HTML", "CSS"],
    status: "construcao",
    repoUrl: "https://github.com/Hoennkeys/ChaoticIdle",
    repoName: "Hoennkeys/ChaoticIdle",
  },
];

export function Projects() {
  const [activeRepo, setActiveRepo] = useState<{ url: string; name: string } | null>(null);

  return (
    <section id="projetos" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[var(--neon)] font-medium">
              Projetos
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">O Que Estou Construindo</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            @Ferreir4dev.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="bento-card bento-card-hover p-7 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-5 right-5">
                {p.status === "online" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--neon)]">
                    <Radio className="h-3 w-3" />
                    Online
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--violet)]/30 bg-[var(--violet)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--violet)]">
                    <Hammer className="h-3 w-3" />
                    Em Construção
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold pr-24">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {p.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                  >
                    {p.status === "construcao" ? "Ver Site Online" : "Ver Projeto Online"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                {p.repoUrl && p.repoName ? (
                  <button
                    type="button"
                    onClick={() => setActiveRepo({ url: p.repoUrl!, name: p.repoName! })}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[var(--violet)]/40 hover:bg-secondary cursor-pointer"
                  >
                    <Github className="h-4 w-4" />
                    {p.extraRepos?.length ? "Ver RibbitApp no GitHub" : "Ver Código no GitHub"}
                  </button>
                ) : null}
                {p.extraRepos?.map((repo) => (
                  <button
                    key={repo.url}
                    type="button"
                    onClick={() => setActiveRepo({ url: repo.url, name: repo.name })}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[var(--violet)]/40 hover:bg-secondary cursor-pointer"
                  >
                    <Github className="h-4 w-4" />
                    {repo.label ?? "Ver Código no GitHub"}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <GithubModal
        open={!!activeRepo}
        onOpenChange={(o) => !o && setActiveRepo(null)}
        repoUrl={activeRepo?.url ?? ""}
        repoName={activeRepo?.name ?? ""}
      />
    </section>
  );
}
