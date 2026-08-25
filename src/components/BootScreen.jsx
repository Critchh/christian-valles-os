import { useEffect, useState } from "react";

function BootScreen({ onFinish }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setReady(true);
    }, 1800);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3200);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <section className="boot-screen">
      <button
        className="skip-button"
        onClick={onFinish}
      >
        Skip
      </button>

      <div className="boot-logo-stage">
        <img
          src="/cvos-icon.png"
          alt="CVOS"
          className="boot-logo"
        />

        <div className="boot-logo-glow" />
      </div>

      <div className="boot-brand">
        <h1>CVOS</h1>

        <p>
          CHRISTIAN VALLES OS
        </p>

        <div
          className={[
            "boot-status",
            ready
              ? "boot-status-ready"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="boot-status-dot" />

          <span>
            {ready
              ? "SYSTEM READY"
              : "INITIALIZING"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default BootScreen;