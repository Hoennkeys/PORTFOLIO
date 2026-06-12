import { useEffect, useRef, useState } from "react";

import "./SpotlightOverlay.css";

export function SpotlightOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const animatePosition = () => {
      const overlay = overlayRef.current;
      if (!overlay || !activeRef.current) {
        frameRef.current = null;
        return;
      }

      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.22;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.22;

      overlay.style.setProperty("--x", `${currentRef.current.x}px`);
      overlay.style.setProperty("--y", `${currentRef.current.y}px`);

      frameRef.current = window.requestAnimationFrame(animatePosition);
    };

    const requestPositionUpdate = (event: MouseEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!activeRef.current) {
        activeRef.current = true;
        currentRef.current = targetRef.current;
        setIsActive(true);
      }

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animatePosition);
      }
    };

    const deactivate = () => {
      activeRef.current = false;
      setIsActive(false);
    };

    window.addEventListener("mousemove", requestPositionUpdate, { passive: true });
    document.documentElement.addEventListener("mouseleave", deactivate);
    window.addEventListener("blur", deactivate);

    return () => {
      window.removeEventListener("mousemove", requestPositionUpdate);
      document.documentElement.removeEventListener("mouseleave", deactivate);
      window.removeEventListener("blur", deactivate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={`spotlight-overlay${isActive ? " is-active" : ""}`}
      aria-hidden="true"
    />
  );
}
