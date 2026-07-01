import Link from "next/link";
import HomeContainer from "./HomeContainer";
import RustLink from "./RustLink";
import CaseCover from "./CaseCover";
import ArrowRight from "./ArrowRight";
import { caseStudies } from "@/content/caseStudies";

export default function CaseStudies() {
  return (
    <section id="cases" className="pt-10 pb-20 md:pt-16 md:pb-24">
      <HomeContainer>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-10">
          {caseStudies.map((c)=>(
            <article
              key={c.slug}
              className="flex flex-col gap-6"
            >
              {/* Animated cover — clickable, leads to the case page */}
              <Link
                href={`/case-studies/${c.slug}`}
                aria-label={`Open ${c.title} case study`}
                className="block overflow-hidden rounded-[var(--radius-frame)] transition-transform duration-300 ease-[var(--ease-out)] will-change-transform hover:scale-[1.01]"
              >
                <CaseCover src={c.cover ?? ""} label="[ Case cover ]" />
              </Link>
              {/* Text */}
              <div className="max-w-[600px]">
                <p className="mb-3 text-sm text-[var(--color-text)]">{c.eyebrow}</p>
                <h3 className="text-2xl font-normal leading-[1.2] tracking-[-0.008em]">{c.title}</h3>
                <p className="mt-3 whitespace-pre-line text-base leading-[1.55] text-[var(--color-text)]">{c.summary}</p>
                <div className="mt-6">
                  <RustLink href={`/case-studies/${c.slug}`}>Read case study <ArrowRight className="h-3 w-3" /></RustLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
