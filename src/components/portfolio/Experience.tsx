import { useRef } from "react";
import { Briefcase, Radio } from "lucide-react";
import { ScrollRevealText } from "./ScrollRevealText";
import { MagneticWrapper } from "./MagneticWrapper";
import { Divider3D } from "./Divider3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!timelineRef.current) return;

    // Animates the vertical line down the timeline
    gsap.to(timelineRef.current.querySelector(".timeline-progress"), {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
        end: "bottom 70%",
        scrub: true,
      },
    });

    // Glow effect on the bullets as scroll reaches them
    gsap.fromTo(
      timelineRef.current.querySelectorAll(".timeline-bullet"),
      { scale: 0.8, borderColor: "var(--border)" },
      {
        scale: 1.15,
        borderColor: "var(--neon)",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: timelineRef });

  return (
    <section id="experiencia" className="py-20 px-6 perspective-3d">
      <div className="max-w-4xl mx-auto perspective-3d">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[var(--neon)] font-medium">
            Experiência
          </span>
          <ScrollRevealText text="Onde Atuo Hoje" className="mt-2 text-3xl sm:text-4xl font-bold" />
          <Divider3D label="JOB_TIMELINE" color="cyan" />
        </div>

        <div ref={timelineRef} className="relative pl-0 sm:pl-10 perspective-3d">
          {/* Vertical progress timeline line */}
          <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-border/20 hidden sm:block">
            <div className="timeline-progress bg-gradient-to-b from-[var(--neon)] to-[var(--violet)] w-full h-full origin-top scale-y-0" />
          </div>

          <div className="grid gap-6 perspective-3d">
            {experiences.map((exp) => (
              <div key={exp.company} className="relative">
                {/* Timeline Bullet */}
                <div className="timeline-bullet absolute left-[-41px] top-8 h-5 w-5 rounded-full border border-border bg-secondary/90 items-center justify-center hidden sm:flex z-10 transition-colors duration-300">
                  <div className="h-2 w-2 rounded-full bg-[var(--neon)]" />
                </div>

                <MagneticWrapper maxDistance={8} sensitivity={0.08}>
                  <article className="float-slow p-4 flex flex-col relative overflow-hidden h-full">
                    <div className="absolute top-5 right-5">
                      {exp.status === "current" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--neon)]/20 bg-[var(--neon)]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--neon)]">
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
                          className="rounded-full border border-border bg-secondary/30 px-3 py-1 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </MagneticWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
