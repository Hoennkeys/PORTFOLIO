import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticWrapperProps {
  children: React.ReactNode;
  /** Maximum pixel offset the element can move. Default is 15. */
  maxDistance?: number;
  /** Sensitivity of the magnetic pull. Higher means more movement. Default is 0.2. */
  sensitivity?: number;
  className?: string;
}

export function MagneticWrapper({
  children,
  maxDistance = 15,
  sensitivity = 0.2,
  className = "",
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasHover, setHasHover] = useState(false);

  // Motion values for X and Y translates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics configuration
  const springX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.8 });

  // Only enable on devices that support hover (prevents layout jumping on mobile taps)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHover(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasHover || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find coordinates relative to the center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const targetX = (clientX - centerX) * sensitivity;
    const targetY = (clientY - centerY) * sensitivity;

    // Clamp the translations to maxDistance to avoid clipping/extreme moves
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, targetX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, targetY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    // Return gently to original position
    x.set(0);
    y.set(0);
  };

  if (!hasHover) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
