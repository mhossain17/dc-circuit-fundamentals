"use client";

import { useEffect, useRef } from "react";

interface PcbTraceProps {
  className?: string;
  animated?: boolean;
}

export function PcbTrace({ className = "", animated = false }: PcbTraceProps) {
  return (
    <svg
      aria-hidden="true"
      className={`text-circuit-lime opacity-30 ${className}`}
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Main horizontal trace */}
      <path
        d="M0 10 L30 10 L40 4 L80 4 L90 10 L160 10 L170 16 L200 16 L210 10 L280 10 L290 4 L320 4 L330 10 L400 10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray={animated ? "300" : "none"}
        strokeDashoffset={animated ? "300" : "0"}
        style={animated ? { animation: "trace-flow 3s linear infinite" } : {}}
      />
      {/* Junction dots */}
      {[40, 90, 170, 210, 290, 330].map((x) => (
        <circle key={x} cx={x} cy={x % 2 === 0 ? 10 : 10} r="2.5" fill="currentColor" />
      ))}
    </svg>
  );
}

/* Full-page animated circuit background used on the dashboard */
export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Build grid of nodes with Manhattan trace paths
    const COLS = 12;
    const ROWS = 8;
    const nodes: { x: number; y: number }[] = [];
    const edges: {
      from: number; to: number; progress: number; speed: number;
      dirX: number; dirY: number;
      particles: { t: number; active: boolean }[];
    }[] = [];

    const rebuild = () => {
      nodes.length = 0;
      edges.length = 0;
      const xStep = canvas.width / (COLS - 1);
      const yStep = canvas.height / (ROWS - 1);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          nodes.push({
            x: c * xStep + (Math.random() - 0.5) * xStep * 0.3,
            y: r * yStep + (Math.random() - 0.5) * yStep * 0.3,
          });
        }
      }
      const pushEdge = (from: number, to: number) => {
        const a = nodes[from], b = nodes[to];
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        edges.push({
          from, to, progress: 0,
          speed: 0.002 + Math.random() * 0.003,
          dirX: dx / len, dirY: dy / len,
          particles: [{ t: Math.random(), active: Math.random() > 0.5 }],
        });
      };
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          if (Math.random() > 0.4) pushEdge(r * COLS + c, r * COLS + c + 1);
        }
      }
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS; c++) {
          if (Math.random() > 0.55) pushEdge(r * COLS + c, (r + 1) * COLS + c);
        }
      }
    };

    rebuild();

    const LIME = "#39FF14";
    const COPPER = "#B87333";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      // Normalize mouse velocity for directional comparison
      const mvLen = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) || 1;
      const mvx = mouse.vx / mvLen;
      const mvy = mouse.vy / mvLen;
      // Only apply mouse influence when the cursor is actually moving
      const mouseActive = mvLen > 0.5;

      // Draw base copper traces
      ctx.strokeStyle = COPPER;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.08;
      for (const e of edges) {
        const a = nodes[e.from];
        const b = nodes[e.to];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Cursor proximity glow on nearby traces
      if (mouseActive) {
        for (const e of edges) {
          const midX = (nodes[e.from].x + nodes[e.to].x) / 2;
          const midY = (nodes[e.from].y + nodes[e.to].y) / 2;
          const distSq = (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2;
          const proximity = 1 / (1 + distSq / (180 * 180));
          if (proximity < 0.08) continue;
          const a = nodes[e.from], b = nodes[e.to];
          ctx.globalAlpha = proximity * 0.3;
          ctx.strokeStyle = LIME;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = LIME;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Draw nodes
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = COPPER;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw animated particles, speed modulated by mouse direction
      for (const e of edges) {
        // Alignment: dot product of edge direction with mouse movement direction
        const alignment = mouseActive ? e.dirX * mvx + e.dirY * mvy : 0;
        const midX = (nodes[e.from].x + nodes[e.to].x) / 2;
        const midY = (nodes[e.from].y + nodes[e.to].y) / 2;
        const distSq = (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2;
        const proximity = 1 / (1 + distSq / (250 * 250));
        // Aligned + nearby = faster; opposing + nearby = slower; far = neutral
        const boost = 1 + 4 * Math.max(0, alignment) * proximity * (mouseActive ? 1 : 0);

        for (const p of e.particles) {
          if (!p.active) {
            p.t += e.speed * 0.3;
            if (p.t > 1.2) { p.t = -0.2; p.active = Math.random() > 0.3; }
            continue;
          }
          p.t += e.speed * boost;
          if (p.t > 1.1) { p.t = -0.1; p.active = Math.random() > 0.3; }

          const t = Math.max(0, Math.min(1, p.t));
          const a = nodes[e.from];
          const b = nodes[e.to];

          let px: number, py: number;
          if (t < 0.5) {
            const tt = t * 2;
            px = a.x + (b.x - a.x) * tt;
            py = a.y;
          } else {
            const tt = (t - 0.5) * 2;
            px = b.x;
            py = a.y + (b.y - a.y) * tt;
          }

          const fade = Math.sin(Math.PI * p.t);
          // Aligned particles glow brighter near cursor
          const glowBoost = 1 + Math.max(0, alignment) * proximity * 1.5;
          ctx.globalAlpha = fade * 0.9;
          ctx.fillStyle = LIME;
          ctx.shadowBlur = 12 * glowBoost;
          ctx.shadowColor = LIME;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    // Track mouse velocity — must use window since canvas is pointer-events-none
    let lastMx = -1000, lastMy = -1000;
    const handleMouse = (e: MouseEvent) => {
      const nx = e.clientX, ny = e.clientY;
      mouseRef.current = { x: nx, y: ny, vx: nx - lastMx, vy: ny - lastMy };
      lastMx = nx; lastMy = ny;
    };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => { resize(); rebuild(); };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
