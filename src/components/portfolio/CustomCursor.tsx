import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hasHover, setHasHover] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [hoverText, setHoverText] = useState("");

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lag effect
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.4 });
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.4 });

  useEffect(() => {
    // Only mount cursor on hover-capable devices (desktop)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHover(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest("a, button, [role='button'], .bento-card");

      if (interactiveEl) {
        if (interactiveEl.classList.contains("bento-card")) {
          // If it's a project card, show a "Ver" text
          const isProject = interactiveEl.closest("#projetos");
          if (isProject) {
            setCursorType("text");
            setHoverText("Explorar");
          } else {
            setCursorType("pointer");
            setHoverText("");
          }
        } else {
          setCursorType("pointer");
          setHoverText("");
        }
      } else {
        setCursorType("default");
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!hasHover) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center font-display text-[9px] font-bold tracking-widest text-primary-foreground uppercase select-none overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorType === "text" ? 64 : cursorType === "pointer" ? 44 : 20,
          height: cursorType === "text" ? 64 : cursorType === "pointer" ? 44 : 20,
          backgroundColor: cursorType === "text" ? "var(--accent)" : "transparent",
          border: cursorType === "text" ? "none" : "1.5px solid var(--color-primary)",
          boxShadow: cursorType !== "default" ? "var(--shadow-glow)" : "none",
        }}
        animate={{
          scale: cursorType !== "default" ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {cursorType === "text" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px]"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--neon)] rounded-full pointer-events-none z-50"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType !== "default" ? 0.3 : 1,
          opacity: cursorType === "text" ? 0 : 1,
        }}
      />
    </>
  );
}
