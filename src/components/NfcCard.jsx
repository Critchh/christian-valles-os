import { useState } from "react";
import { RotateCcw, Wifi } from "lucide-react";

function NfcCard() {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((value) => !value);

  return (
    <div className="nfc-stage">
      <div className="nfc-stage-heading">
        <span>PHYSICAL + DIGITAL IDENTITY</span>
        <strong>Tap once. Share instantly.</strong>
        <p>A programmable NFC business card for opening contact details, a website, or a purpose-built destination.</p>
      </div>
      <button
        className={`nfc-card${flipped ? " is-flipped" : ""}`}
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        aria-label={flipped ? "Show card front" : "Show card back"}
      >
        <span className="nfc-card-inner">
          <span className="nfc-face nfc-front">
            <img src="/nfc-card-front-safe.png" alt="Front of Christian Valles metal NFC business card" />
          </span>
          <span className="nfc-face nfc-back">
            <img src="/nfc-card-back-safe.png" alt="Back of Christian Valles metal NFC business card with decorative non-scannable code" />
            <span className="nfc-back-label"><Wifi size={16} /> DIGITAL CONTACT INTERFACE</span>
          </span>
        </span>
      </button>
      <button className="nfc-control" type="button" onClick={toggle}>
        <RotateCcw size={14} /> Flip card
      </button>
    </div>
  );
}

export default NfcCard;
