/**
 * Carousel nav arrow: custom, matched to the site language:
 * a soft accent-tinted disc (like the RustLink pill) with a thin, refined
 * line arrow. Points left by default; flip with -scale-x-100 for next.
 */
export default function ArrowCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="20" fill="var(--color-accent)" fillOpacity="0.09" />
      <g
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M25.5 20H14.8" />
        <path d="M19.6 14.6 14.2 20l5.4 5.4" />
      </g>
    </svg>
  );
}
