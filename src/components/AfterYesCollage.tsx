import { useEffect, useMemo, useState } from "react";

import heartSticker from "../assets/stickers/heart.png";
import cloudSticker from "../assets/stickers/cloud.png";

const photoModules = import.meta.glob("../assets/photos/*.{png,jpg,jpeg,webp,gif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function AfterYesCollage({ show }: { show: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (show) setMounted(true);
  }, [show]);

  const photos = useMemo(() => {
    const values = Object.values(photoModules);
    if (values.length === 0) return [];
    const expanded =
      values.length >= 30 ? values : Array.from({ length: 42 }, (_, i) => values[i % values.length]);
    return shuffle(expanded).slice(0, 42);
  }, []);

  const rotations = useMemo(
    () => Array.from({ length: 60 }, () => `${(Math.random() * 10 - 5).toFixed(2)}deg`),
    []
  );

  if (!mounted) return null;

  return (
    <div className={`afteryes ${show ? "show" : ""}`} aria-hidden={!show}>
      <div className="afteryes-bg" />

      <div className="afteryes-grid">
        {photos.map((src, idx) => (
          <div key={idx} className="afteryes-tile" style={{ ["--r" as any]: rotations[idx] }}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="afteryes-msg">
        <div className="afteryes-bubble">
          <img className="afteryes-sticker a1" src={heartSticker} alt="" />
          <img className="afteryes-sticker a2" src={cloudSticker} alt="" />

          <div className="afteryes-emoji">🥰💞</div>
          <div className="afteryes-title">YAYYYYY!!!</div>
          <div className="afteryes-sub">You’re my Valentine ❤️</div>
        </div>
      </div>
    </div>
  );
}
