import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function MorphingBlobs() {
  const blob1Ref = useRef<SVGPathElement>(null);
  const blob2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!blob1Ref.current || !blob2Ref.current) return;

    // Animates morphing of path coordinate d for Blob 1 using Anime.js v4 animate
    animate(blob1Ref.current, {
      d: [
        "M80,50 C80,75 60,90 40,90 C20,90 10,75 10,50 C10,25 20,10 40,10 C60,10 80,25 80,50 Z",
        "M75,54 C75,80 62,88 42,88 C22,88 12,78 12,54 C12,30 26,12 46,12 C66,12 75,30 75,54 Z",
        "M84,46 C84,72 56,94 36,94 C16,94 8,68 8,46 C8,24 22,8 42,8 C62,8 84,24 84,46 Z",
        "M80,50 C80,75 60,90 40,90 C20,90 10,75 10,50 C10,25 20,10 40,10 C60,10 80,25 80,50 Z"
      ],
      duration: 9000,
      ease: "inOutQuad",
      loop: true
    });

    // Animates morphing of path coordinate d for Blob 2
    animate(blob2Ref.current, {
      d: [
        "M70,40 C70,65 55,80 35,80 C15,80 10,65 10,40 C10,15 20,10 35,10 C50,10 70,15 70,40 Z",
        "M65,42 C65,65 54,78 34,78 C14,78 12,65 12,42 C12,19 22,12 37,12 C52,12 65,19 65,42 Z",
        "M74,38 C74,60 52,84 32,84 C12,84 6,60 6,38 C6,16 18,6 38,6 C58,6 74,16 74,38 Z",
        "M70,40 C70,65 55,80 35,80 C15,80 10,65 10,40 C10,15 20,10 35,10 C50,10 70,15 70,40 Z"
      ],
      duration: 11000,
      ease: "inOutQuad",
      loop: true
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.22]">
      {/* Glowing Morphing Blob 1 (Top Left area) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute -top-[15%] -left-[15%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] overflow-visible"
      >
        <path ref={blob1Ref} fill="var(--color-primary)" style={{ filter: "blur(40px)" }} />
      </svg>

      {/* Glowing Morphing Blob 2 (Bottom Right area) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-[50%] -right-[15%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] overflow-visible"
      >
        <path ref={blob2Ref} fill="var(--color-violet)" style={{ filter: "blur(50px)" }} />
      </svg>
    </div>
  );
}
