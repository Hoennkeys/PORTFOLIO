import {
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Atom,
  Server,
  Globe,
  Paintbrush,
  Wind,
  Zap,
  Smartphone,
  Terminal,
  Layers,
} from "lucide-react";

const skills = [
  { icon: Code2, label: "C++" },
  { icon: Braces, label: "JavaScript" },
  { icon: FileCode2, label: "TypeScript" },
  { icon: Globe, label: "HTML" },
  { icon: Paintbrush, label: "CSS" },
  { icon: Atom, label: "React" },
  { icon: Smartphone, label: "React Native" },
  { icon: Server, label: "Node.js" },
  { icon: Layers, label: "FastAPI" },
  { icon: Terminal, label: "Python" },
  { icon: Database, label: "SQL" },
  { icon: Wind, label: "Tailwind" },
  { icon: Zap, label: "Vite" },
  { icon: GitBranch, label: "Git" },
];

export function About() {
  return (
    <section id="sobre" className="py-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
        <div className="bento-card bento-card-hover lg:col-span-3 p-8 sm:p-10">
          <span className="text-xs uppercase tracking-widest text-[var(--neon)] font-medium">
            Sobre mim
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Uma Breve Jornada</h2>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Estou cursando Análise e Desenvolvimento de Sistemas, e cada linha de código é um
              passo a mais nessa jornada de transformar ideias em produtos reais. O que me move é
              resolver problemas — entender uma dor, desenhar uma solução e ver tudo funcionando.
            </p>
            <p>
              Já construí projetos completos por conta própria, dos primeiros wireframes ao deploy.
              Atualmente, atuo como Suporte Técnico N1 na Imobzi, onde aplico meus conhecimentos em
              resolução de problemas e otimização de processos, enquanto continuo evoluindo minhas
              habilidades de desenvolvimento focado em React, Node.js, TypeScript e C++.
            </p>
          </div>
        </div>

        <div className="bento-card bento-card-hover lg:col-span-2 p-8">
          <span className="text-xs uppercase tracking-widest text-[var(--violet)] font-medium">
            Stack
          </span>
          <h3 className="mt-3 text-2xl font-bold">Skills Principais</h3>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {skills.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm transition-colors hover:border-[var(--neon)]/40 hover:bg-secondary/70"
              >
                <Icon className="h-4 w-4 text-[var(--neon)]" />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
