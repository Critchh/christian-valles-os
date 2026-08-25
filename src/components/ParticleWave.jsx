import { useEffect, useRef } from "react";

function ParticleWave() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");

    let animationFrame;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

const settings = {
  spacing: 18,

  // Calmer ambient wave
  waveHeight: 22,
  waveSpeed: 0.00018,

  // Mouse/touch interaction
  interactionRadius: 150,
  interactionStrength: 12,
};

    let points = [];

    const buildPoints = () => {
      points = [];

      const spacing = settings.spacing;

      for (
        let y = -spacing;
        y <= height + spacing;
        y += spacing
      ) {
        for (
          let x = -spacing;
          x <= width + spacing;
          x += spacing
        ) {
          points.push({
            baseX: x,
            baseY: y,
          });
        }
      }
    };

    const resize = () => {
      const bounds =
        container.getBoundingClientRect();

      width = bounds.width;
      height = bounds.height;

      devicePixelRatio =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      canvas.width =
        width * devicePixelRatio;

      canvas.height =
        height * devicePixelRatio;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );

      buildPoints();
    };

    const handlePointerMove = (
      event
    ) => {
      const bounds =
        container.getBoundingClientRect();

      pointer.x =
        event.clientX -
        bounds.left;

      pointer.y =
        event.clientY -
        bounds.top;

      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleTouchMove = (
      event
    ) => {
      const touch =
        event.touches?.[0];

      if (!touch) return;

      const bounds =
        container.getBoundingClientRect();

      pointer.x =
        touch.clientX -
        bounds.left;

      pointer.y =
        touch.clientY -
        bounds.top;

      pointer.active = true;
    };

    const draw = (time) => {
      context.clearRect(
        0,
        0,
        width,
        height
      );

      const t =
        time *
        settings.waveSpeed;

      for (const point of points) {
        let x =
          point.baseX;

        let y =
          point.baseY;

const waveA =
  Math.sin(
    point.baseX * 0.015 +
    t * 4
  );

const waveB =
  Math.cos(
    point.baseY * 0.018 +
    t * 2
  );

const waveC =
  Math.sin(
    (
      point.baseX +
      point.baseY
    ) * 0.009 -
    t * 3
  );

        y +=
          waveA *
          settings.waveHeight;

        y +=
          waveC *
          11;

        x +=
          waveB *
          6;

        let interaction = 0;

        if (pointer.active) {
          const deltaX =
            x - pointer.x;

          const deltaY =
            y - pointer.y;

          const distance =
            Math.sqrt(
              deltaX * deltaX +
              deltaY * deltaY
            );

          if (
            distance <
            settings.interactionRadius
          ) {
            interaction =
              1 -
              distance /
                settings.interactionRadius;

            const safeDistance =
              distance || 1;

            x +=
              (
                deltaX /
                safeDistance
              ) *
              interaction *
              settings.interactionStrength;

            y +=
              (
                deltaY /
                safeDistance
              ) *
              interaction *
              settings.interactionStrength;
          }
        }

        const depth =
          Math.max(
            0.08,
            Math.min(
              1,
              (
                Math.sin(
                  point.baseX *
                    0.008 +
                  point.baseY *
                    0.005 +
                  t * 2
                ) +
                1
              ) /
                2
            )
          );

        const radius =
          0.8 +
          depth * 0.9;

        const baseAlpha =
          0.11 +
          depth * 0.18;

        if (
          interaction >
          0.02
        ) {
          context.fillStyle =
            `rgba(
              22,
              140,
              82,
              ${0.18 + interaction * 0.5}
            )`;
        } else {
          context.fillStyle =
            `rgba(
              46,
              53,
              50,
              ${baseAlpha}
            )`;
        }

        context.beginPath();

        context.arc(
          x,
          y,
          radius +
            interaction * 0.7,
          0,
          Math.PI * 2
        );

        context.fill();
      }

      animationFrame =
        requestAnimationFrame(draw);
    };

    resize();

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(
      container
    );

    container.addEventListener(
      "pointermove",
      handlePointerMove
    );

    container.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    container.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true,
      }
    );

    container.addEventListener(
      "touchend",
      handlePointerLeave
    );

    animationFrame =
      requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      resizeObserver.disconnect();

      container.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      container.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      container.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      container.removeEventListener(
        "touchend",
        handlePointerLeave
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="particle-wave-shell"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="particle-wave-canvas"
      />
    </div>
  );
}

export default ParticleWave;