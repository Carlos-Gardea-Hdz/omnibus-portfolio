const PROJECT_NODES = [
  { name: "ADMIN", color: "#FF6B35" },
  { name: "UNIGES", color: "#3B82F6" },
  { name: "BRAIN", color: "#8B5CF6" },
  { name: "EVTAPI", color: "#10B981" },
  { name: "PAYROLL", color: "#F59E0B" },
  { name: "OPSLIVE", color: "#EF4444" },
  { name: "NEXUS", color: "#06B6D4" },
  { name: "FLUXD", color: "#84CC16" },
  { name: "TITAN", color: "#F43F5E" },
];

const CX = 310;
const CY = 310;
const RADIUS = 220;

function getNodePosition(index: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 9;
  return {
    x: CX + RADIUS * Math.cos(angle),
    y: CY + RADIUS * Math.sin(angle),
  };
}

export default function NetworkDiagram() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 620 620"
        className="w-full h-full max-w-[500px] rounded-2xl bg-[#0A0C10] border border-[#1E2330]"
        style={{ filter: "drop-shadow(0 0 40px rgba(255,69,0,0.08))" }}
      >
        <defs>
          {/* Grid pattern */}
          <pattern
            id="dots-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.5" cy="0.5" r="0.8" fill="#1E2330" />
          </pattern>

          {/* Center glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4500" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
          </radialGradient>

          {/* Node glow */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hub glow filter */}
          <filter id="hubGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Line gradients */}
          {PROJECT_NODES.map((node, i) => {
            const { x, y } = getNodePosition(i);
            return (
              <linearGradient
                key={`grad-${i}`}
                id={`lineGrad${i}`}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.9" />
                <stop offset="100%" stopColor={node.color} stopOpacity="0.7" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Background dots grid */}
        <rect width="620" height="620" fill="url(#dots-grid)" />

        {/* Coordinate labels — blueprint aesthetic */}
        <text
          x="10"
          y="18"
          fill="#2A3044"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
        >
          X:0
        </text>
        <text
          x="560"
          y="18"
          fill="#2A3044"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
        >
          X:480
        </text>
        <text
          x="10"
          y="614"
          fill="#2A3044"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
        >
          Y:480
        </text>
        <text
          x="550"
          y="614"
          fill="#2A3044"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
        >
          Y:480
        </text>

        {/* Outer reference circle */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS + 32}
          fill="none"
          stroke="#1E2330"
          strokeWidth="0.8"
          strokeDasharray="3 8"
        />

        {/* Connection lines */}
        {PROJECT_NODES.map((_, i) => {
          const { x, y } = getNodePosition(i);
          return (
            <line
              key={`line-${i}`}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke={`url(#lineGrad${i})`}
              strokeWidth="1.5"
              strokeDasharray="8 5"
              strokeLinecap="round"
              style={{
                animation: `dashFlow 2.5s linear infinite`,
                animationDelay: `${i * 0.28}s`,
              }}
            />
          );
        })}

        {/* Animated data packets */}
        {PROJECT_NODES.map((node, i) => {
          const { x, y } = getNodePosition(i);
          const dur = 2.5 + i * 0.15;
          return (
            <circle key={`packet-${i}`} r="3.5" fill="#00D4FF" opacity="0.9">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              >
                <mpath href={`#path-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
            </circle>
          );
        })}

        {/* Hidden paths for animateMotion */}
        {PROJECT_NODES.map((_, i) => {
          const { x, y } = getNodePosition(i);
          return (
            <path
              key={`path-${i}`}
              id={`path-${i}`}
              d={`M${CX},${CY} L${x},${y}`}
              fill="none"
              style={{ display: "none" }}
            />
          );
        })}

        {/* Center hub glow */}
        <circle cx={CX} cy={CY} r={110} fill="url(#centerGlow)" />

        {/* Pulsing outer ring */}
        <circle
          cx={CX}
          cy={CY}
          r={70}
          fill="none"
          stroke="#FF4500"
          strokeWidth="1.5"
          opacity="0.25"
        >
          <animate
            attributeName="r"
            values="62;78;62"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.1;0.4"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Center hub */}
        <circle
          cx={CX}
          cy={CY}
          r={54}
          fill="#0A0C10"
          stroke="#FF4500"
          strokeWidth="2"
          filter="url(#hubGlow)"
        />
        <circle
          cx={CX}
          cy={CY}
          r={54}
          fill="none"
          stroke="#FF4500"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          opacity="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Hub label */}
        <text
          x={CX}
          y={CY - 14}
          textAnchor="middle"
          fill="#FF4500"
          fontSize="13"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
        >
          VPS + Traefik
        </text>
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fill="#F0F4FF"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
        >
          Docker · SSL
        </text>
        <text
          x={CX}
          y={CY + 20}
          textAnchor="middle"
          fill="#6B7A99"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
        >
          v3 · Ubuntu 24
        </text>

        {/* Project nodes */}
        {PROJECT_NODES.map((node, i) => {
          const { x, y } = getNodePosition(i);
          const labelAbove = y < CY;
          const isLeft = x < CX - 80;
          const isRight = x > CX + 80;
          const labelX = isLeft ? x - 8 : isRight ? x + 8 : x;
          const labelAnchor = isLeft ? "end" : isRight ? "start" : "middle";
          return (
            <g key={`node-${i}`} filter="url(#nodeGlow)">
              {/* Outer glow */}
              <circle cx={x} cy={y} r={34} fill={node.color} opacity="0.1">
                <animate
                  attributeName="r"
                  values="28;36;28"
                  dur={`${2.5 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.1;0.22;0.1"
                  dur={`${2.5 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Node circle */}
              <circle
                cx={x}
                cy={y}
                r={26}
                fill="#0A0C10"
                stroke={node.color}
                strokeWidth="2"
              />

              {/* Letter badge */}
              <text
                x={x}
                y={y - 2}
                textAnchor="middle"
                fill={node.color}
                fontSize="13"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
              >
                {String.fromCharCode(65 + i)}
              </text>
              <text
                x={x}
                y={y + 13}
                textAnchor="middle"
                fill="#6B7A99"
                fontSize="9"
                fontFamily="'JetBrains Mono', monospace"
              >
                {node.name}
              </text>

              {/* Node label outside */}
              <text
                x={labelX}
                y={labelAbove ? y - 34 : y + 46}
                textAnchor={labelAnchor}
                fill="#8899AA"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
              >
                {node.name}
              </text>
            </g>
          );
        })}

        {/* Corner crosshairs */}
        {[
          { x: 20, y: 20 },
          { x: 600, y: 20 },
          { x: 20, y: 600 },
          { x: 600, y: 600 },
        ].map((pt, i) => (
          <g key={`cross-${i}`} opacity="0.35">
            <line
              x1={pt.x - 8}
              y1={pt.y}
              x2={pt.x + 8}
              y2={pt.y}
              stroke="#1E2330"
              strokeWidth="1.2"
            />
            <line
              x1={pt.x}
              y1={pt.y - 8}
              x2={pt.x}
              y2={pt.y + 8}
              stroke="#1E2330"
              strokeWidth="1.2"
            />
          </g>
        ))}

        {/* Version label */}
        <text
          x={CX}
          y={608}
          textAnchor="middle"
          fill="#2A3044"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
        >
          OMNIBUS · v6.2 · carlosgardea.com
        </text>
      </svg>
    </div>
  );
}
