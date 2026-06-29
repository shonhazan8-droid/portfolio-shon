import HomeContainer from "./HomeContainer";
import HeroCarousel from "./HeroCarousel";
import { getGallerySlides } from "@/content/gallery";

export default function Gallery() {
  const slides = getGallerySlides();
  return (
    <section id="work" className="py-20 md:py-24">
      <HomeContainer>
        <HeroCarousel
          slides={slides}
          heading="More work I'm proud of"
          description="Real projects I've put serious work into over the years — researched, designed, and shipped to real users."
        />
      </HomeContainer>
    </section>
  );
}
