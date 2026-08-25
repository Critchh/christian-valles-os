import { useEffect, useRef, useState } from "react";

function OSWindow({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  zIndex,
  isActive = false,
  initialX = 0,
  initialY = 0,
  defaultOffset = 0,
}) {
  const [maximized, setMaximized] =
    useState(false);

  const [position, setPosition] = useState({
    x:
      initialX !== 0
        ? initialX
        : defaultOffset * 26,

    y:
      initialY !== 0
        ? initialY
        : defaultOffset * 18,
  });

  const positionRef = useRef(position);

  const dragData = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originalX: 0,
    originalY: 0,
  });

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handlePointerDown = (event) => {
    if (
      window.innerWidth <= 768 ||
      maximized
    ) {
      return;
    }

    if (
      event.target.closest(
        ".window-controls"
      )
    ) {
      return;
    }

    onFocus?.();

    dragData.current = {
      dragging: true,

      startX: event.clientX,
      startY: event.clientY,

      originalX: positionRef.current.x,
      originalY: positionRef.current.y,
    };

    document.body.style.userSelect =
      "none";
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragData.current.dragging) {
        return;
      }

      const deltaX =
        event.clientX -
        dragData.current.startX;

      const deltaY =
        event.clientY -
        dragData.current.startY;

      const nextX =
        dragData.current.originalX +
        deltaX;

      const nextY =
        dragData.current.originalY +
        deltaY;

      const maxX =
        window.innerWidth / 2 - 140;

      const minX =
        -window.innerWidth / 2 + 140;

      const maxY =
        window.innerHeight / 2 - 90;

      const minY =
        -window.innerHeight / 2 + 70;

      const nextPosition = {
        x: Math.min(
          Math.max(nextX, minX),
          maxX
        ),

        y: Math.min(
          Math.max(nextY, minY),
          maxY
        ),
      };

      positionRef.current =
        nextPosition;

      setPosition(nextPosition);
    };

    const handlePointerUp = () => {
      if (!dragData.current.dragging) {
        return;
      }

      dragData.current.dragging =
        false;

      document.body.style.userSelect =
        "";

      onPositionChange?.(
        positionRef.current.x,
        positionRef.current.y
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    };
  }, [onPositionChange]);

  const toggleMaximize = () => {
    onFocus?.();

    setMaximized(
      (current) => !current
    );
  };

  return (
    <div
      className={[
        "os-window",

        maximized
          ? "os-window-maximized"
          : "",

        isActive
          ? "os-window-active"
          : "os-window-inactive",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        zIndex,

        "--window-x":
          `${position.x}px`,

        "--window-y":
          `${position.y}px`,
      }}
      onPointerDown={onFocus}
    >
      <div
        className="window-titlebar"
        onPointerDown={
          handlePointerDown
        }
        onDoubleClick={
          toggleMaximize
        }
      >
        <span className="window-title">
          {title}
        </span>

        <div className="window-controls">
          <button
            className="window-control minimize"
            onClick={onMinimize}
            aria-label="Minimize"
          >
            —
          </button>

          <button
            className="window-control maximize"
            onClick={toggleMaximize}
            aria-label={
              maximized
                ? "Restore"
                : "Maximize"
            }
          >
            {maximized ? "❐" : "□"}
          </button>

          <button
            className="window-control close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default OSWindow;