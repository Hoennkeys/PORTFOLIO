import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
}

export function ScrollRevealText({
  text,
  className = "",
  delay = 0,
  as: Component = "h2",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animates the words sliding up from the overflow mask
    gsap.from(containerRef.current.querySelectorAll(".reveal-word"), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 88%", // triggers when 88% of the viewport is reached
        toggleActions: "play none none reverse", // replay when scrolling back up
      },
      y: "110%",
      duration: 0.8,
      delay: delay,
      stagger: 0.04,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const words = text.split(" ");

  return (
    <Component
      ref={containerRef as any}
      className={`${className} flex flex-wrap gap-x-[0.25em] row-gap-0`}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <span className="reveal-word inline-block">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
