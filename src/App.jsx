import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import BootScreen from "./components/BootScreen";
import OSWindow from "./components/OSWindow";
import FeedbackWidget from "./components/FeedbackWidget";

import About from "./components/apps/About";
import Projects from "./components/apps/Projects";
import Resume from "./components/apps/Resume";
import Skills from "./components/apps/Skills";
import Contact from "./components/apps/Contact";
import Assistant from "./components/apps/Assistant";
import FeedbackForm from "./components/apps/FeedbackForm";
import ParticleWave from "./components/ParticleWave";

import apps from "./data/apps";

function App() {
  const [booting, setBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [windows, setWindows] = useState({});

  const zCounter = useRef(100);

  const finishBoot = useCallback(() => {
    sessionStorage.setItem("portfolioBooted", "true");
    setBooting(false);
  }, []);

  useEffect(() => {
    const alreadyBooted =
      sessionStorage.getItem("portfolioBooted");

    if (alreadyBooted) {
      setBooting(false);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bringToFront = (windowName) => {
    zCounter.current += 1;

    setWindows((currentWindows) => ({
      ...currentWindows,

      [windowName]: {
        ...currentWindows[windowName],
        open: true,
        minimized: false,
        zIndex: zCounter.current,
      },
    }));
  };

  const openWindow = (windowName) => {
    const isMobile =
      window.innerWidth <= 768;

    zCounter.current += 1;

    if (isMobile) {
      setWindows({
        [windowName]: {
          open: true,
          minimized: false,
          zIndex: zCounter.current,
          x: 0,
          y: 0,
        },
      });

      return;
    }

    setWindows((currentWindows) => ({
      ...currentWindows,

      [windowName]: {
        ...currentWindows[windowName],

        open: true,
        minimized: false,
        zIndex: zCounter.current,

        x:
          currentWindows[windowName]?.x ??
          0,

        y:
          currentWindows[windowName]?.y ??
          0,
      },
    }));
  };

  const closeWindow = (windowName) => {
    setWindows((currentWindows) => ({
      ...currentWindows,

      [windowName]: {
        ...currentWindows[windowName],
        open: false,
        minimized: false,
      },
    }));
  };

  const minimizeWindow = (windowName) => {
    setWindows((currentWindows) => ({
      ...currentWindows,

      [windowName]: {
        ...currentWindows[windowName],
        minimized: true,
      },
    }));
  };

  const updateWindowPosition = (
    windowName,
    x,
    y
  ) => {
    setWindows((currentWindows) => ({
      ...currentWindows,

      [windowName]: {
        ...currentWindows[windowName],
        x,
        y,
      },
    }));
  };

  const activeZIndex = Math.max(
    ...Object.values(windows)
      .filter(
        (windowItem) =>
          windowItem?.open &&
          !windowItem?.minimized
      )
      .map(
        (windowItem) =>
          windowItem.zIndex || 0
      ),
    0
  );

  const windowContent = {
    About: <About />,
    Projects: <Projects />,
    Resume: <Resume />,
    Skills: <Skills />,
    Contact: <Contact />,
    "AI Assistant": <Assistant />,
    Feedback: <FeedbackForm />,
  };

  if (booting) {
    return (
      <BootScreen
        onFinish={finishBoot}
      />
    );
  }

  return (
    <main className="app">
      <section className="desktop redesign-desktop">

        {/* =========================
            TOP NAVIGATION
        ========================== */}

        <header className="cvos-nav">

          <button
            className="cvos-brand"
            onClick={() =>
              openWindow("About")
            }
            aria-label="Open About"
          >
            <span className="baybayin-logo">
              ᜃ᜔ᜊ᜔
            </span>

            <span className="cvos-brand-text">
              CVOS
            </span>
          </button>


          <nav className="cvos-nav-links">

            <button
              onClick={() =>
                openWindow("About")
              }
            >
              About
            </button>

            <button
              onClick={() =>
                openWindow("Projects")
              }
            >
              Projects
            </button>

            <button
              onClick={() =>
                openWindow("Resume")
              }
            >
              Experience
            </button>

            <button
              onClick={() =>
                openWindow("Skills")
              }
            >
              Skills
            </button>

            <button
              onClick={() =>
                openWindow("Contact")
              }
            >
              Contact
            </button>

          </nav>


          <div className="cvos-nav-status">

            <span className="status-dot"></span>

            <span>
              ONLINE
            </span>

            <span className="nav-time">
              {currentTime.toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>

          </div>

        </header>


        {/* =========================
            HERO
        ========================== */}

        <section className="cvos-hero">

          <div className="hero-main">

            <div className="hero-copy">

              <div className="hero-kicker">
                <span>
                  CHRISTIAN VALLES
                </span>

                <span>
                  INFORMATION TECHNOLOGY
                </span>
              </div>


              <h1>
                CVOS
              </h1>


              <h2>
                A personal operating system
                for my work, experience,
                and technical projects.
              </h2>


              <p className="hero-description">
                Explore projects, technical
                experience, certifications,
                client work, and an integrated
                AI assistant through an
                interactive portfolio system.
              </p>


              <div className="hero-actions">

                <button
                  className="hero-primary"
                  onClick={() =>
                    openWindow("Projects")
                  }
                >
                  Explore Projects
                </button>


                <button
                  className="hero-secondary"
                  onClick={() =>
                    openWindow("Resume")
                  }
                >
                  View Resume
                </button>

              </div>

            </div>


            {/* Placeholder for reactive
                particle wave */}

<div className="hero-visual">
  <ParticleWave />
</div>

          </div>


          {/* =========================
              RIGHT-SIDE CARDS
          ========================== */}

          <aside className="hero-side">

            <button
              className="hero-system-card ai-card"
              onClick={() =>
                openWindow(
                  "AI Assistant"
                )
              }
            >
              <div className="system-card-top">

                <span>
                  GEMINI AI
                </span>

                <span className="system-live">
                  LIVE
                </span>

              </div>


              <h3>
                Ask CVOS
              </h3>

              <p>
                Ask about projects,
                technical skills,
                certifications, or
                professional experience.
              </p>

              <span className="system-card-link">
                Open Assistant →
              </span>
            </button>


            <FeedbackWidget
              onLeaveFeedback={() =>
                openWindow(
                  "Feedback"
                )
              }
            />


            <div className="hero-system-card">

              <div className="system-card-top">

                <span>
                  SYSTEM OVERVIEW
                </span>

                <span>
                  BUILD 00
                </span>

              </div>


              <div className="system-stat">

                <span>
                  AI CORE
                </span>

                <strong>
                  GEMINI
                </strong>

              </div>


              <div className="system-stat">

                <span>
                  DATABASE
                </span>

                <strong>
                  SUPABASE
                </strong>

              </div>


              <div className="system-stat">

                <span>
                  NFC SERVICE
                </span>

                <strong className="status-green">
                  ACTIVE
                </strong>

              </div>


              <div className="system-stat">

                <span>
                  STATUS
                </span>

                <strong className="status-green">
                  ONLINE
                </strong>

              </div>

            </div>

          </aside>

        </section>


        {/* =========================
            OPEN WINDOWS
        ========================== */}

        {apps.map((app, index) => {
          const windowState =
            windows[app.id];

          if (
            !windowState?.open ||
            windowState?.minimized
          ) {
            return null;
          }

          return (
            <OSWindow
              key={app.id}
              title={app.id}
              zIndex={
                windowState.zIndex
              }
              isActive={
                windowState.zIndex ===
                activeZIndex
              }
              initialX={
                windowState.x ?? 0
              }
              initialY={
                windowState.y ?? 0
              }
              defaultOffset={index}
              onFocus={() =>
                bringToFront(app.id)
              }
              onClose={() =>
                closeWindow(app.id)
              }
              onMinimize={() =>
                minimizeWindow(app.id)
              }
              onPositionChange={(
                x,
                y
              ) =>
                updateWindowPosition(
                  app.id,
                  x,
                  y
                )
              }
            >
              {
                windowContent[
                  app.id
                ]
              }
            </OSWindow>
          );
        })}


        {/* =========================
            FEEDBACK INTERNAL WINDOW
        ========================== */}

        {windows.Feedback?.open &&
          !windows.Feedback
            ?.minimized && (
            <OSWindow
              title="Client Feedback"
              zIndex={
                windows.Feedback
                  .zIndex
              }
              isActive={
                windows.Feedback
                  .zIndex ===
                activeZIndex
              }
              initialX={
                windows.Feedback
                  .x ?? 0
              }
              initialY={
                windows.Feedback
                  .y ?? 0
              }
              defaultOffset={2}
              onFocus={() =>
                bringToFront(
                  "Feedback"
                )
              }
              onClose={() =>
                closeWindow(
                  "Feedback"
                )
              }
              onMinimize={() =>
                minimizeWindow(
                  "Feedback"
                )
              }
              onPositionChange={(
                x,
                y
              ) =>
                updateWindowPosition(
                  "Feedback",
                  x,
                  y
                )
              }
            >
              <FeedbackForm />
            </OSWindow>
          )}


        {/* =========================
            DOCK
        ========================== */}

        <nav className="dock">

          {apps.map((app) => {
            const windowState =
              windows[app.id];

            const isOpen =
              windowState?.open;

            const isMinimized =
              windowState
                ?.minimized;

            return (
              <button
                key={app.id}
                className={[
                  "dock-app",

                  isOpen
                    ? "dock-app-active"
                    : "",

                  isMinimized
                    ? "dock-app-minimized"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  openWindow(app.id)
                }
                aria-label={
                  app.label
                }
              >

                <span className="dock-icon">

                  <app.icon
                    size={20}
                    strokeWidth={1.7}
                  />

                </span>


                <span className="dock-tooltip">

                  {isMinimized
                    ? `Restore ${app.label}`
                    : app.label}

                </span>

              </button>
            );
          })}

        </nav>

      </section>
    </main>
  );
}

export default App;