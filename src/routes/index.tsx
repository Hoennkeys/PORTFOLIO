import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

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
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
