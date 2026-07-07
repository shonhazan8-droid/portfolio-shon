"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "cover" | "reveal";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

/**
 * Curtain page transition: an accent-colored panel rises from the bottom,
 * covers the viewport while the route changes, then continues upward to
 * reveal the new page (one continuous direction — never a bounce back).
 *
 * Only links that opt in via <TransitionLink> / usePageTransition() get the
 * curtain; anchors and external links stay untouched. Reduced-motion users
 * navigate instantly with no curtain. A safety timeout force-reveals if a
 * navigation ever stalls, so the screen can't stay covered.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const covering = useRef(false);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (covering.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      covering.current = true;
      pendingHref.current = href;
      setPhase("cover");
    },
    [router],
  );

  // New route mounted while covered → lift the curtain.
  useEffect(() => {
    if (covering.current) {
      covering.current = false;
      if (safety.current) clearTimeout(safety.current);
      setPhase("reveal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => () => { if (safety.current) clearTimeout(safety.current); }, []);

  const onCurtainEnd = () => {
    if (phase === "cover" && pendingHref.current) {
      const href = pendingHref.current;
      pendingHref.current = null;
      router.push(href);
      // If the route never resolves, don't leave the screen covered.
      safety.current = setTimeout(() => {
        covering.current = false;
        setPhase("reveal");
      }, 3000);
    } else if (phase === "reveal") {
      setPhase("idle");
    }
  };

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        aria-hidden="true"
        className={`curtain${phase !== "idle" ? ` curtain-${phase}` : ""}`}
        onAnimationEnd={onCurtainEnd}
      />
    </TransitionContext.Provider>
  );
}
