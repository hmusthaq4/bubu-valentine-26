import { useState } from "react";
import PhotoCollage from "./components/PhotoCollage";
import HeartsOverlay from "./components/HeartsOverlay";
import ValentineCard from "./components/ValentineCard";
import AfterYesCollage from "./components/AfterYesCollage";

export default function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg">
      <PhotoCollage />
      <div className="overlay" />
      <HeartsOverlay />

      <main className="center">
        <ValentineCard accepted={accepted} onAccept={() => setAccepted(true)} />
      </main>

      <AfterYesCollage show={accepted} />
    </div>
  );
}
