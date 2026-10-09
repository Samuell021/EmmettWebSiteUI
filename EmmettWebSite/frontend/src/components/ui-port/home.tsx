import { Hero } from "./hero";
import { ServicesSection } from "./services-section";
import { ProductsSection } from "./products-section";
import { ProjectsSection } from "./projects-section";
import { LibrarySection } from "./library-section";
import { AcademySection } from "./academy-section";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";

export function Home() {
  return (
    <div>
      {/* 1 — Hero: "We engineer intelligent systems." */}
      <Hero />

      {/* 2 — Services: Engineering across the entire stack */}
      <ServicesSection />

      {/* 3 — Products: Products born from engineering problems */}
      <ProductsSection />

      {/* 4 — Projects: What we've built */}
      <ProjectsSection />

      {/* 5 — Library: What we're learning */}
      <LibrarySection />

      {/* 6 — Academy: Build your way into deeper knowledge */}
      <AcademySection />

      {/* Contact CTA */}
      <ContactSection />

      <Footer />
    </div>
  );
}
