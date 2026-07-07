"use client";
import Link from "next/link";
import { usePageTransition } from "./PageTransition";

type Props = React.ComponentProps<typeof Link> & { href: string };

/**
 * A next/link that routes through the curtain transition.
 * Modified clicks (new tab, middle-click) fall through to the browser.
 */
export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const navigate = usePageTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
