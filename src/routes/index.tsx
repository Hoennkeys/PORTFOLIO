import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { SpotlightOverlay } from "@/components/portfolio/SpotlightOverlay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Ferreira — Dev Full-Stack" },
      {
        name: "description",
        content:
          "Portfólio de Lucas Ferreira — estagiário em Suporte Técnico na Imobzi, desenvolvedor full-stack em formação.",
      },
      { property: "og:title", content: "Lucas Ferreira — Dev Full-Stack" },
      {
        property: "og:description",
        content:
          "Portfólio de Lucas Ferreira — estagiário em Suporte Técnico na Imobzi, desenvolvedor full-stack em formação.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--gradient-accent)" }}
        aria-hidden
      />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <SpotlightOverlay />
    </div>
  );
}
