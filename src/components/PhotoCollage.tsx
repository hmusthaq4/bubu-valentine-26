import { useMemo } from "react";

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

export default function PhotoCollage() {
  const photos = useMemo(() => {
    const values = Object.values(photoModules);
    if (values.length === 0) return [];
    const expanded =
      values.length >= 18 ? values : Array.from({ length: 24 }, (_, i) => values[i % values.length]);
    return shuffle(expanded).slice(0, 24);
  }, []);

  const rotations = useMemo(
    () => Array.from({ length: 24 }, () => `${(Math.random() * 10 - 5).toFixed(2)}deg`),
    []
  );

  if (photos.length === 0) return null;

  return (
    <div className="collage" aria-hidden="true">
      <div className="collage-grid">
        {photos.map((src, idx) => (
          <div key={idx} className="polaroid" style={{ ["--r" as any]: rotations[idx] }}>
            <img loading="lazy" src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
