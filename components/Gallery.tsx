import Container from "./Container";
import HeroCarousel from "./HeroCarousel";
import { getGallerySlides } from "@/content/gallery";

export default function Gallery() {
  const slides = getGallerySlides();
  return (
    <section id="work" className="py-24">
      <Container>
        <div className="mb-10 max-w-[52ch]">
          <h2 className="text-2xl font-normal tracking-[-0.008em]">More work I&apos;m proud of</h2>
          <p className="mt-2 text-base leading-[1.55] text-[var(--color-muted)]">
            Real projects I&apos;ve put serious work into over the years — researched, designed, and shipped to real users.
          </p>
        </div>
        <HeroCarousel slides={slides} />
      </Container>
    </section>
  );
}
