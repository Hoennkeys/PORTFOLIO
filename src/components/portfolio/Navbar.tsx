export function Navbar() {
  const links = [
    { href: "#projetos", label: "Projetos" },
    { href: "#sobre", label: "Sobre mim" },
    { href: "#contato", label: "Contato" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 group" aria-label="Início">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent font-display font-bold text-primary-foreground text-sm shadow-[var(--shadow-glow)]">
            &lt;/&gt;
          </span>
          <span className="font-display font-semibold tracking-tight hidden sm:inline">L.</span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
