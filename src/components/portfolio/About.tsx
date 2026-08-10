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
  Layers,
} from "lucide-react";
import { ScrollRevealText } from "./ScrollRevealText";
import { Divider3D } from "./Divider3D";
import { MagneticWrapper } from "./MagneticWrapper";

import { animate, stagger } from "animejs";

const skills = [
  { icon: Code2, label: "C++" },
  { icon: Braces, label: "JavaScript" },
  { icon: FileCode2, label: "TypeScript" },
  { icon: Globe, label: "HTML" },
  { icon: Paintbrush, label: "CSS" },
  { icon: Atom, label: "React" },
  { icon: Smartphone, label: "React Native" },
  { icon: Server, label: "Node.js" },
  { icon: Database, label: "SQL" },
  { icon: Layers, label: "Supabase" },
  { icon: Wind, label: "Tailwind" },
  { icon: Zap, label: "Vite" },
  { icon: GitBranch, label: "Git" },
];

export function About() {
  const handleIconHover = (index: number) => {
    // Stagger animation flowing outward from the hovered icon using Anime.js v4 animate
    animate(".tech-icon", {
      scale: [
        { value: 0.92, duration: 100, ease: "outQuad" },
        { value: 1.05, duration: 180, ease: "inOutQuad" },
        { value: 1, duration: 100, ease: "outQuad" },
      ],
      delay: stagger(35, { grid: [2, 7], from: index }),
    });
  };

  return (
    <section id="sobre" className="py-20 px-6 perspective-3d">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 perspective-3d">
        <div className="float-slow relative z-10">
          <span className="text-xs uppercase tracking-widest text-[var(--neon)] font-medium">
            Sobre mim
          </span>
          <ScrollRevealText text="Uma Breve Jornada" className="mt-3 text-3xl sm:text-4xl font-bold" />
          <Divider3D label="DATA_STREAM_01" color="cyan" />
          <div className="mt-4 space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
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

        <div className="float-delayed relative z-10">
          <span className="text-xs uppercase tracking-widest text-[var(--violet)] font-medium">
            Stack
          </span>
          <ScrollRevealText text="Skills Principais" className="mt-3 text-2xl font-bold" as="h3" />
          <Divider3D label="TECH_STACK" color="violet" />
          <ul className="mt-6 flex flex-wrap gap-3">
            {skills.map(({ icon: Icon, label }, index) => (
              <li
                key={label}
                onMouseEnter={() => handleIconHover(index)}
                className="tech-icon flex items-center gap-2.5 rounded-full border border-border/30 bg-secondary/20 px-4 py-2.5 text-sm font-semibold transition-all hover:border-[var(--neon)]/50 hover:bg-secondary/40 hover:scale-105 cursor-pointer"
              >
                <Icon className="h-4 w-4 text-[var(--neon)]" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
