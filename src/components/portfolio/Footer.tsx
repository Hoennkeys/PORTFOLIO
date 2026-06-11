import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 Lucas Ferreira. Todos os direitos reservados.</p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Hoennkeys"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-[var(--neon)]/40 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ferreir4dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-[var(--neon)]/40 hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
