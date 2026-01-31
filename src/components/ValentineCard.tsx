import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

import heartSticker from "../assets/stickers/heart.png";
import cloudSticker from "../assets/stickers/cloud.png";
import starSticker from "../assets/stickers/star.png";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Props = {
  accepted: boolean;
  onAccept: () => void;
};

export default function ValentineCard({ accepted, onAccept }: Props) {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const noRef = useRef<HTMLButtonElement | null>(null);

  const [noPos, setNoPos] = useState({ x: 170, y: 0 });
  const [wiggle, setWiggle] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const noText = useMemo(() => {
    if (noAttempts >= 7) return "Okay okay 🙈";
    if (noAttempts >= 5) return "Eeeek 😭";
    if (noAttempts >= 3) return "Hmm…";
    return "No";
  }, [noAttempts]);

  useEffect(() => {
    const placeInitial = () => {
      const area = areaRef.current;
      const btn = noRef.current;
      if (!area || !btn) return;

      const pad = 6;
      const w = area.clientWidth;
      const h = area.clientHeight;
      const bw = btn.offsetWidth || 92;
      const bh = btn.offsetHeight || 48;

      const x = clamp(w - bw - 6, pad, w - bw - pad);
      const y = clamp(0, pad, h - bh - pad);
      setNoPos({ x, y });
    };

    placeInitial();
    window.addEventListener("resize", placeInitial);
    return () => window.removeEventListener("resize", placeInitial);
  }, []);

  function moveNoButton() {
    const area = areaRef.current;
    const btn = noRef.current;
    if (!area || !btn) return;

    const pad = 6;
    const w = area.clientWidth;
    const h = area.clientHeight;
    const bw = btn.offsetWidth || 92;
    const bh = btn.offsetHeight || 48;

    let nx = 0;
    let ny = 0;
    for (let i = 0; i < 12; i++) {
      nx = rand(pad, w - bw - pad);
      ny = rand(pad, h - bh - pad);
      const dx = Math.abs(nx - noPos.x);
      const dy = Math.abs(ny - noPos.y);
      if (dx + dy > 70) break;
    }

    setWiggle(true);
    window.setTimeout(() => setWiggle(false), 160);
    setNoPos({ x: nx, y: ny });

    setNoAttempts((a) => a + 1);
    setYesScale((s) => clamp(s + 0.03, 1, 1.25));
  }

  function onYes() {
    confetti({ particleCount: 150, spread: 75, origin: { y: 0.72 } });
    setTimeout(() => confetti({ particleCount: 90, spread: 95, origin: { y: 0.65 } }), 160);
    setTimeout(() => onAccept(), 350);
  }

  return (
    <section
      className="sticker-card"
      style={{ opacity: accepted ? 0 : 1, transition: "opacity 240ms ease" }}
    >
      {/* Sticker PNGs */}
      <img className="card-sticker s1" src={heartSticker} alt="" />
      <img className="card-sticker s2" src={cloudSticker} alt="" />
      <img className="card-sticker s3" src={starSticker} alt="" />
      <img className="card-sticker s4" src={heartSticker} alt="" />

      <h2 className="card-title">Hello Kanmani kutty 💘</h2>
      <h1 className="card-question">Would you like to be my Valentine ?</h1>
      <p className="card-sub">(You are legally required to say yes.) 😄</p>

      <div className="btn-row" ref={areaRef}>
        <button
          className="btn btn-yes"
          onClick={onYes}
          style={{ transform: `scale(${yesScale})` }}
        >
          Yes 💗
        </button>

        <button
          ref={noRef}
          className={`btn btn-no ${wiggle ? "wiggle" : ""}`}
          onMouseEnter={moveNoButton}
          onFocus={moveNoButton}
          onPointerDown={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
          style={{
            ["--x" as any]: `${noPos.x}px`,
            ["--y" as any]: `${noPos.y}px`,
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: "transform 260ms cubic-bezier(.2,.9,.2,1)",
          }}
          aria-label="No (this button runs away)"
        >
          {noText}
        </button>
      </div>
    </section>
  );
}
