import Container from "./Container";
const LOGOS = ["[ Logo ]","[ Logo ]","[ Logo ]","[ Logo ]","[ Logo ]","[ Logo ]"];
export default function LogoStrip() {
  return (
    <div className="border-y border-[var(--color-line)] py-12">
      <Container>
        <p className="mb-6 text-center text-sm text-[var(--color-faint)]">
          Trusted by teams across fintech, public sector and health
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
          {LOGOS.map((l,i)=>(
            <span key={i} className="text-base font-medium tracking-wide text-[var(--color-faint)]">{l}</span>
          ))}
        </div>
      </Container>
    </div>
  );
}
