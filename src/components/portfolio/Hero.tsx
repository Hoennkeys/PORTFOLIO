import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MagneticWrapper } from "./MagneticWrapper";
import { AvatarOrb } from "./AvatarOrb";
import { Divider3D } from "./Divider3D";

const heroAvatar = "/hero-avatar.png";

export function Hero() {
  const avatarCardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Soft spring physics for the tilt movement
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!avatarCardRef.current) return;
    const rect = avatarCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Rotation values (max 20 degrees)
    const rX = -(mouseY / (height / 2)) * 18;
    const rY = (mouseX / (width / 2)) * 18;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="top" className="pt-32 pb-12 px-6 perspective-3d">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 perspective-3d">
        <div className="flex-1 max-w-2xl float-slow relative z-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3 w-3 text-[var(--neon)]" />
            Estágio · Suporte Técnico N1 · Imobzi
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Lucas Ferreira,
            <br />
            <span className="text-gradient">Desenvolvedor Full-Stack</span>
            <br />
            em Formação.
          </h1>
          <Divider3D label="SYS_NODE_INIT" color="cyan" />
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
            Acadêmico de ADS e estagiário em Suporte Técnico na Imobzi. Aplico lógica e resolução de
            problemas no dia a dia, enquanto evoluo em{" "}
            <span className="text-foreground font-medium">
              React, Node.js, TypeScript e C++
            </span>
            .
          </p>
          <div className="mt-8">
            <MagneticWrapper maxDistance={10} sensitivity={0.35} className="w-fit">
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              >
                Conheça meus Projetos
                <ArrowRight className="h-4 w-4" />
              </a>
            </MagneticWrapper>
          </div>
        </div>

        <motion.div
          ref={avatarCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          className="relative float-delayed shrink-0 w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center cursor-pointer z-10"
        >
          <AvatarOrb />
          <div
            className="relative h-44 w-44 sm:h-56 sm:w-56 rounded-full overflow-hidden border border-border/40 bg-secondary/30 shadow-[var(--shadow-violet)] z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            <img
              src={heroAvatar}
              alt="Ilustração minimalista de Lucas Ferreira"
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
