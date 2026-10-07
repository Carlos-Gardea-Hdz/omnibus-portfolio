interface BorderBeamProps {
  color: string;
  duration?: number;
}

// A conic gradient whose angle is animated via @property, masked down to the
// 1px border ring. Decorative: aria-hidden and pointer-events none.
export function BorderBeam({ color, duration = 6 }: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      className="border-beam"
      style={{ "--beam-color": color, "--beam-duration": `${duration}s` } as React.CSSProperties}
    />
  );
}
