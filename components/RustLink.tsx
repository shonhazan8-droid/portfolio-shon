import TransitionLink from "./TransitionLink";

export default function RustLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <TransitionLink
      href={href}
      className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/[0.08] py-3 pl-4 pr-3.5 text-sm font-medium leading-none text-[var(--color-accent)] no-underline transition-[gap,background-color] duration-150 ease-[var(--ease-out)] hover:gap-2.5 hover:bg-[var(--color-accent)]/[0.14]"
    >
      {children}
    </TransitionLink>
  );
}
