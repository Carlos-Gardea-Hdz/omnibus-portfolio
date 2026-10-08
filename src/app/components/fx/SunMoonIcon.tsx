interface SunMoonIconProps {
  moon: boolean;
  size?: number;
}

// Both glyphs are static paths stacked in one SVG; the theme swap is an opacity
// crossfade (plus a small rotation), which stays on the compositor and needs
// no SVG mask. Transitions are switched off under prefers-reduced-motion.
export function SunMoonIcon({ moon, size = 18 }: SunMoonIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="sun-moon-icon"
      data-moon={moon}
    >
      <g className="sun-moon-sun">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </g>
      <path className="sun-moon-moon" d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}
