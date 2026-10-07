import { useId } from "react";

interface SunMoonIconProps {
  moon: boolean;
  size?: number;
}

// One circle morphs between sun and crescent: a mask circle slides in to bite
// the moon while the rays fade and rotate away. Pure CSS transitions on SVG
// attributes-as-style, so prefers-reduced-motion can switch them off.
export function SunMoonIcon({ moon, size = 18 }: SunMoonIconProps) {
  const maskId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="sun-moon-icon"
      data-moon={moon}
    >
      <mask id={maskId}>
        <rect x="0" y="0" width="24" height="24" fill="white" stroke="none" />
        <circle className="sun-moon-bite" cx={moon ? 17 : 30} cy={moon ? 7 : 0} r="7" fill="black" stroke="none" />
      </mask>
      <circle
        className="sun-moon-body"
        cx="12"
        cy="12"
        r={moon ? 9 : 5}
        fill="currentColor"
        stroke="none"
        mask={`url(#${maskId})`}
      />
      <g className="sun-moon-rays" style={{ opacity: moon ? 0 : 1 }}>
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </g>
    </svg>
  );
}
