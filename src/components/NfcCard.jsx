import { useState } from "react";
import { RotateCcw, Wifi } from "lucide-react";

function NfcCard() {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((value) => !value);

  return (
    <div className="nfc-stage">
      <button
        className={`nfc-card${flipped ? " is-flipped" : ""}`}
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        aria-label={flipped ? "Show card front" : "Show card back"}
      >
        <span className="nfc-card-inner">
          <span className="nfc-face nfc-front">
            <img src="/nfc-card-front.jpg" alt="Front of Christian Valles metal NFC business card" />
          </span>
          <span className="nfc-face nfc-back">
            <img src="/nfc-card-back.jpg" alt="Back of Christian Valles metal NFC business card with QR code" />
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
