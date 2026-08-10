import { useState } from "react";
import { ExternalLink, Github, Hammer, Radio } from "lucide-react";
import { GithubModal } from "./GithubModal";
import { ScrollRevealText } from "./ScrollRevealText";
import { motion, AnimatePresence } from "framer-motion";
import { Divider3D } from "./Divider3D";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projetos" className="py-24 px-6 perspective-3d">
      <div className="max-w-4xl mx-auto perspective-3d">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[var(--neon)] font-medium">
              Projetos
            </span>
            <ScrollRevealText text="O Que Estou Construindo" className="mt-2 text-3xl sm:text-4xl font-bold" />
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Estes são alguns dos projetos que desenvolvi ou estou trabalhando atualmente. Outros
            códigos e experimentos podem ser encontrados no meu GitHub{" "}
            <a
              href="https://github.com/Hoennkeys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold underline decoration-[var(--neon)]/40 underline-offset-4 hover:text-[var(--neon)] transition-colors cursor-pointer"
            >
              @Hoennkeys
            </a>{" "}
            e no Vercel{" "}
            <a
              href="https://vercel.com/lucas-ferreiras-projects-2a07c0ea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold underline decoration-[var(--neon)]/40 underline-offset-4 hover:text-[var(--neon)] transition-colors cursor-pointer"
            >
              @Ferreir4dev.
            </a>
          </p>
        </div>

        <Divider3D color="cyan" />

        <div className="flex flex-col">
          {projects.map((p, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={p.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="border-b border-border/30 py-6 sm:py-8 transition-colors duration-300"
              >
                <div className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted-foreground/50">
                      0{index + 1}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                      isHovered ? "text-[var(--neon)] translate-x-3 scale-[1.01]" : "text-foreground"
                    }`}>
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {p.status === "online" ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--neon)]/20 bg-[var(--neon)]/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--neon)]">
                        <Radio className="h-2.5 w-2.5" />
                        Online
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--violet)]/20 bg-[var(--violet)]/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--violet)]">
                        <Hammer className="h-2.5 w-2.5" />
                        Construção
                      </span>
                    )}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 pl-6 pr-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-xl">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {p.description}
                          </p>

                          <ul className="mt-4 flex flex-wrap gap-1.5">
                            {p.stack.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-full border border-border/40 bg-secondary/30 px-2.5 py-0.5 text-[11px] text-muted-foreground/90"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0 min-w-[200px]">
                          {p.liveUrl ? (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                            >
                              {p.status === "construcao" ? "Ver Site Online" : "Ver Projeto Online"}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : null}
                          {p.repoUrl && p.repoName ? (
                            <button
                              type="button"
                              onClick={() => setActiveRepo({ url: p.repoUrl!, name: p.repoName! })}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/40 bg-secondary/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-[var(--violet)]/40 hover:bg-secondary cursor-pointer"
                            >
                              <Github className="h-3.5 w-3.5" />
                              {p.extraRepos?.length ? "Ver RibbitApp no GitHub" : "Ver Código no GitHub"}
                            </button>
                          ) : null}
                          {p.extraRepos?.map((repo) => (
                            <button
                              key={repo.url}
                              type="button"
                              onClick={() => setActiveRepo({ url: repo.url, name: repo.name })}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/40 bg-secondary/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-[var(--violet)]/40 hover:bg-secondary cursor-pointer"
                            >
                              <Github className="h-3.5 w-3.5" />
                              {repo.label ?? "Ver Código no GitHub"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
