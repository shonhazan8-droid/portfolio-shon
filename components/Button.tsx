import Link from "next/link";

type Props = {
  href: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export default function Button({ href, variant = "primary", children, className = "", target, rel }: Props) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-[11px] text-sm font-medium cursor-pointer no-underline transition-[transform,opacity,border-color,background-color] duration-150 ease-[var(--ease-out)] active:scale-[0.97]";
  const styles = {
    primary: "bg-[var(--color-btn)] text-white hover:-translate-y-px hover:opacity-90 active:translate-y-0",
    ghost:   "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-ink)]",
  };
  return <Link href={href} target={target} rel={rel} className={`${base} ${styles[variant]} ${className}`}>{children}</Link>;
}
