// Three blurred color blobs drifting slowly behind the hero. Low alpha keeps
// text contrast above AA; the drift is disabled under prefers-reduced-motion.
export function AuraBackground() {
  return (
    <div aria-hidden="true" className="aura-bg">
      <span className="aura-blob aura-blob-a" />
      <span className="aura-blob aura-blob-b" />
      <span className="aura-blob aura-blob-c" />
    </div>
  );
}
