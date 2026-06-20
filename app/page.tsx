import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CaseStudies />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
