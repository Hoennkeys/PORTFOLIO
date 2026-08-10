interface Divider3DProps {
  color?: "cyan" | "violet" | "pink";
}

export function Divider3D({ color = "cyan" }: Divider3DProps) {
  // Determine gradient color mapping based on design system
  const colorMap = {
    cyan: {
      shadow: "rgba(0, 240, 255, 0.4)",
      border: "rgba(0, 240, 255, 0.75)",
      bg: "from-transparent via-[var(--neon)]/50 to-transparent",
    },
    violet: {
      shadow: "rgba(168, 85, 247, 0.4)",
      border: "rgba(168, 85, 247, 0.75)",
      bg: "from-transparent via-[var(--violet)]/50 to-transparent",
    },
    pink: {
      shadow: "rgba(236, 72, 153, 0.4)",
      border: "rgba(236, 72, 153, 0.75)",
      bg: "from-transparent via-[var(--color-violet)]/50 to-transparent",
    },
  };

  const activeColor = colorMap[color];

  return (
    <div className="flex items-center gap-4 my-6 w-full select-none pointer-events-none transform-style-3d z-20">
      {/* Left laser thread */}
      <div 
        className={`h-[1px] flex-1 bg-gradient-to-r ${activeColor.bg}`}
        style={{ filter: `drop-shadow(0 0 4px ${activeColor.shadow})` }}
      />
      
      {/* Center 3D Diamond Node */}
      <div className="flex items-center gap-2 shrink-0">
        <div 
          className="h-1.5 w-1.5 rotate-45 animate-pulse transition-all duration-300"
          style={{ 
            backgroundColor: activeColor.border,
            boxShadow: `0 0 8px 2px ${activeColor.shadow}`
          }}
        />
      </div>
      
      {/* Right laser thread */}
      <div 
        className={`h-[1px] flex-1 bg-gradient-to-l ${activeColor.bg}`}
        style={{ filter: `drop-shadow(0 0 4px ${activeColor.shadow})` }}
      />
    </div>
  );
}
