import Link from "next/link";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] pt-12 pb-10">
      <Container>
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-2.5 text-lg font-normal tracking-tight">Shon</div>
            <p className="max-w-[26ch] text-sm text-[var(--color-text)]">
              Senior product designer. Designs and builds products end to end.
            </p>
          </div>
          {[
            { heading: "Pages", links: [["Work","#work"],["Case studies","#cases"],["About","#about"]] },
            { heading: "Social", links: [["LinkedIn","https://linkedin.com/in/shon-hazan-095373199"],["Read.cv","#"],["X / Twitter","#"]] },
            { heading: "Contact", links: [["Email","mailto:"],["Resume (PDF)","/resume.pdf"]] },
          ].map(col=>(
            <div key={col.heading}>
              <h4 className="mb-3 text-xs font-normal uppercase tracking-[.08em] text-[var(--color-text)]">{col.heading}</h4>
              {col.links.map(([label,href])=>(
                <Link key={label} href={href} className="mb-2.5 block text-sm text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-ink)]">{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-[var(--color-line)] pt-5 text-xs text-[var(--color-text)]">
          <span>© 2026 Shon</span>
          <span>Designed and built end to end</span>
        </div>
      </Container>
    </footer>
  );
}
