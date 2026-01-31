import { useMemo } from "react";

function HeartSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7.2-4.7-9.6-9.1C.7 8.5 2.1 5.7 4.8 4.8c1.9-.6 3.9.1 5.2 1.6C11.3 4.9 13.3 4.2 15.2 4.8c2.7.9 4.1 3.7 2.4 7.1C19.2 16.3 12 21 12 21z"
        fill="rgba(255, 182, 200, 0.85)"
      />
    </svg>
  );
}

export default function HeartsOverlay() {
  const hearts = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const left = Math.random() * 100;
      const duration = 10 + Math.random() * 10;
      const delay = Math.random() * 6;
      const size = 14 + Math.random() * 22;
      const opacity = 0.25 + Math.random() * 0.45;
      return { id: i, left, duration, delay, size, opacity };
    });
  }, []);

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}vw`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
            transform: `scale(${h.size / 22})`,
          }}
        >
          <HeartSvg />
        </div>
      ))}
    </div>
  );
}
