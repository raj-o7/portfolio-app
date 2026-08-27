// The hero's signature visual: a small graph traversal animation. It is a
// literal, understated nod to how the site's author actually thinks — in
// nodes, edges, and BFS/DFS order — rather than a decorative blob or a
// stock illustration. Pure CSS keyframes (no JS) so it's cheap and respects
// prefers-reduced-motion via the global rule in globals.css.

const nodes = [
  { id: 0, x: 200, y: 36 },
  { id: 1, x: 96, y: 120 },
  { id: 2, x: 304, y: 120 },
  { id: 3, x: 40, y: 210 },
  { id: 4, x: 150, y: 210 },
  { id: 5, x: 250, y: 210 },
  { id: 6, x: 360, y: 210 },
  { id: 7, x: 150, y: 292 },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [4, 7],
];

// visit order (BFS from root) — index drives animation stagger
const visitOrder = [0, 1, 2, 3, 4, 5, 6, 7];

function edgeLength(a: (typeof nodes)[number], b: (typeof nodes)[number]) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function TraversalGraph() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto select-none" aria-hidden="true">
      <svg viewBox="0 0 400 330" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {edges.map(([a, b], i) => {
          const nodeA = nodes[a];
          const nodeB = nodes[b];
          const len = edgeLength(nodeA, nodeB);
          return (
            <line
              key={`edge-${a}-${b}`}
              x1={nodeA.x}
              y1={nodeA.y}
              x2={nodeB.x}
              y2={nodeB.y}
              stroke="var(--primary)"
              strokeWidth={1.5}
              className="tg-edge"
              style={{
                strokeDasharray: len,
                strokeDashoffset: len,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          );
        })}

        {nodes.map((n) => {
          const order = visitOrder.indexOf(n.id);
          return (
            <g key={n.id} style={{ animationDelay: `${order * 0.35}s` }} className="tg-node-group">
              <circle cx={n.x} cy={n.y} r={22} fill="url(#nodeGlow)" className="tg-glow" />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.id === 0 ? 7 : 5.5}
                fill="var(--card)"
                stroke="var(--primary)"
                strokeWidth={2}
                className="tg-node"
              />
            </g>
          );
        })}
      </svg>

      <style>{`
        .tg-edge {
          opacity: 0;
          animation: tg-draw 0.6s ease-out forwards;
        }
        .tg-node-group {
          opacity: 0;
          animation: tg-pop 0.5s ease-out forwards;
        }
        .tg-glow {
          opacity: 0;
          transform-origin: center;
        }
        @keyframes tg-draw {
          from { opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 0.5; }
        }
        @keyframes tg-pop {
          0% { opacity: 0; transform: scale(0.4); }
          60% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        .tg-node-group:nth-child(1) .tg-glow,
        .tg-node-group .tg-glow {
          animation: tg-glow-pulse 0.6s ease-out forwards;
        }
        @keyframes tg-glow-pulse {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
