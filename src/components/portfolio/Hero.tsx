import { ArrowRight, Sparkles } from "lucide-react";

const heroAvatar = "/hero-avatar.png";

export function Hero() {
  return (
    <section id="top" className="pt-32 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
        <div className="bento-card bento-card-hover lg:col-span-3 p-8 sm:p-12 flex flex-col justify-center overflow-hidden relative">
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-accent)" }}
            aria-hidden
          />
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3 w-3 text-[var(--neon)]" />
            Disponível para a primeira oportunidade
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Lucas Ferreira,
            <br />
            <span className="text-gradient">Desenvolvedor Full-Stack</span>
            <br />
            em Formação.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
            Acadêmico de Análise e Desenvolvimento de Sistemas. Apaixonado por criar soluções, desde
            sistemas de nicho até arquiteturas robustas. Atualmente focado em{" "}
            <span className="text-foreground font-medium">
              React, Node.js, TypeScript e C++
            </span>
            .
          </p>
          <div className="mt-8">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
            >
              Conheça meus Projetos
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="bento-card bento-card-hover lg:col-span-2 p-8 flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: "var(--gradient-soft)" }}
            aria-hidden
          />
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-full overflow-hidden border border-border bg-secondary/50 shadow-[var(--shadow-violet)]">
            <img
              src={heroAvatar}
              alt="Ilustração minimalista de Lucas Ferreira"
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
