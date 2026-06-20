import Link from "next/link";

export default function RustLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] no-underline transition-[gap] duration-150 hover:gap-2.5"
    >
      {children}
    </Link>
  );
}
