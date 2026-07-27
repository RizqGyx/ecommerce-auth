"use client";

const DEFAULT_COLORS = ["#00b8ff", "#7c3aed", "#facc15"];

interface CelebrationBurstProps {
  colors?: string[];
  count?: number;
}

export default function CelebrationBurst({ colors = DEFAULT_COLORS, count = 16 }: CelebrationBurstProps) {
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (i % 2 === 0 ? 0.15 : -0.15);
    const distance = 70 + ((i * 37) % 50);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rotate = (i * 53) % 360;
    const delay = (i % 6) * 30;
    const size = i % 3 === 0 ? 8 : 5;
    const color = colors[i % colors.length];
    return { x, y, rotate, delay, size, color, key: i };
  });

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.key}
          className="absolute animate-burst rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}ms`,
            ["--burst-x" as string]: `${p.x}px`,
            ["--burst-y" as string]: `${p.y}px`,
            ["--burst-r" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
