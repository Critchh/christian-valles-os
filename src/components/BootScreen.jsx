import { useEffect, useState } from "react";

function BootScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1350);
    const finishTimer = setTimeout(onFinish, 2050);

    return () => { clearTimeout(exitTimer); clearTimeout(finishTimer); };
  }, [onFinish]);

  return (
    <section className={`cvos-boot${exiting ? " is-exiting" : ""}`} aria-label="Loading CVOS">
      <div className="cvos-boot-mark">
        <span className="cvos-boot-halo" aria-hidden="true" />
        <img src="/cvos-brand-mark.png" alt="CVOS Baybayin mark" />
      </div>
    </section>
  );
}

export default BootScreen;
