import Link from "next/link";
import TransitionLink from "./TransitionLink";

type Props = {
  href: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  /** Route through the curtain page transition (internal links only). */
  transition?: boolean;
};

export default function Button({ href, variant = "primary", children, className = "", style, target, rel, transition = false }: Props) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-[11px] text-sm font-medium cursor-pointer no-underline transition-[transform,opacity,border-color,background-color] duration-150 ease-[var(--ease-out)] active:scale-[0.97]";
  const styles = {
    primary: "bg-[var(--color-btn)] text-white hover:-translate-y-px hover:opacity-90 active:translate-y-0",
    ghost:   "border border-[color-mix(in_srgb,var(--color-text)_45%,transparent)] text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)]",
  };
  const Component = transition ? TransitionLink : Link;
  return <Component href={href} target={target} rel={rel} className={`${base} ${styles[variant]} ${className}`} style={style}>{children}</Component>;
}
