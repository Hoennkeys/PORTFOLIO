import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const items = [
  {
    label: "GitHub",
    href: "https://github.com/Hoennkeys",
    icon: Github,
    handle: "@Hoennkeys",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ferreir4dev/",
    icon: Linkedin,
    handle: "Ferreir4dev",
  },
  {
    label: "Enviar E-mail",
    href: "mailto:ferreir4dev@gmail.com",
    icon: Mail,
    handle: "ferreir4dev@gmail.com",
  },
];

export function Contact() {
  return (
    <section id="contato" className="py-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
        <div className="bento-card bento-card-hover lg:col-span-3 p-8 sm:p-12 relative overflow-hidden">
          <div
            className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-accent)" }}
            aria-hidden
          />
          <span className="text-xs uppercase tracking-widest text-[var(--violet)] font-medium">
            Contato
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold leading-tight">
            Vamos Criar
            <br />
            <span className="text-gradient">Algo Juntos?</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md">
            Estou sempre aberto a novas ideias, colaborações ou conversas sobre desenvolvimento.
          </p>
        </div>

        <div className="lg:col-span-2 grid gap-4">
          {items.map(({ label, href, icon: Icon, handle }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="bento-card bento-card-hover group flex items-center justify-between gap-3 p-5"
                aria-label={label}
              >
                <span className="flex items-center gap-4 min-w-0">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60 border border-border group-hover:bg-gradient-accent group-hover:border-transparent transition-all">
                    <Icon className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{label}</span>
                    <span className="block text-xs text-muted-foreground truncate">{handle}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--neon)] transition-colors shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
