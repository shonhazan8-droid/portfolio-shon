"use client";
import { createContext, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router],
  );

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
    </TransitionContext.Provider>
  );
}
