import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GithubModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repoUrl: string;
  repoName: string;
}

export function GithubModal({ open, onOpenChange, repoUrl, repoName }: GithubModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[85vh] p-0 overflow-hidden bg-card border-border rounded-2xl flex flex-col">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 bg-secondary/40">
                <div className="flex items-center gap-2 min-w-0">
                  <Github className="h-4 w-4 text-[var(--neon)] shrink-0" />
                  <DialogTitle className="truncate text-sm font-medium">{repoName}</DialogTitle>
                </div>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-accent px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:scale-[1.02] transition-transform mr-8"
                >
                  Abrir no GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              
              <div className="relative flex-1 bg-background">
                <iframe
                  src={repoUrl}
                  title={repoName}
                  className="absolute inset-0 h-full w-full"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
                
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/95 opacity-100 transition-opacity">
                  <div className="pointer-events-auto max-w-md text-center px-8">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.18, type: "spring", stiffness: 200, damping: 14 }}
                      className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-accent shadow-[var(--shadow-glow)]"
                    >
                      <Github className="h-7 w-7 text-primary-foreground" />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="text-xl font-bold"
                    >
                      {repoName}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mt-2 text-sm text-muted-foreground"
                    >
                      O GitHub bloqueia a visualização direta em iframe por segurança. Abra o repositório
                      em uma nova aba para explorar o código completo.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.42, type: "spring" }}
                    >
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
                      >
                        Abrir repositório
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
