import { Github, Linkedin, Mail, ArrowUpRight, MessageSquare } from "lucide-react";
import { ScrollRevealText } from "./ScrollRevealText";
import { MagneticWrapper } from "./MagneticWrapper";
import { ContactTorus } from "./ContactTorus";
import { Divider3D } from "./Divider3D";

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
  {
    label: "WhatsApp",
    href: "https://wa.me/5581982180780",
    icon: MessageSquare,
    handle: "(81) 982180780",
  },
];

export function Contact() {
  return (
    <section id="contato" className="py-20 px-6 perspective-3d">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12 perspective-3d">
        <div className="float-slow relative w-full flex flex-col items-center justify-center min-h-[300px] z-10">
          <ContactTorus />
          <span className="text-xs uppercase tracking-widest text-[var(--violet)] font-medium z-10">
            Contato
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-bold leading-tight z-10">
            <ScrollRevealText text="Vamos Criar" as="span" />
            <br />
            <span className="block text-gradient mt-2 text-[var(--neon)] filter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              Algo Juntos?
            </span>
          </h2>
          <Divider3D label="COMM_LINK" color="pink" />
          <p className="mt-4 text-muted-foreground max-w-md mx-auto z-10">
            Estou sempre aberto a novas ideias, colaborações ou conversas sobre desenvolvimento.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full float-delayed relative z-10">
          {items.map(({ label, href, icon: Icon, handle }) => {
            const external = href.startsWith("http");
            return (
              <MagneticWrapper key={label} maxDistance={6} sensitivity={0.2}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-full border border-border/30 bg-secondary/10 px-6 py-3 transition-all hover:border-[var(--neon)]/50 hover:bg-secondary/20 hover:scale-[1.03] cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-[var(--neon)] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm">{label}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-[var(--neon)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </MagneticWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
