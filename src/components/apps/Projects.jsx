import { useState } from "react";
import projects from "../../data/projects";

function Projects({ initialProjectId = null, displayMode = "detail" }) {
  const [selectedProject, setSelectedProject] = useState(() =>
    projects.find((project) => project.id === initialProjectId) || null
  );

  // ==============================
  // PROJECT DETAIL VIEW
  // ==============================

  if (selectedProject) {
    if (displayMode === "case-study" && selectedProject.caseStudy) {
      return <CvosCaseStudy project={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    return (
      <div className="project-detail">

        <button
          className="project-back"
          onClick={() => setSelectedProject(null)}
        >
          ← Back to Projects
        </button>

        <div className="project-detail-header">

          <div>
            <p className="app-eyebrow">
              {selectedProject.category}
            </p>

            <h1>
              {selectedProject.title}
            </h1>

            <span className="project-detail-status">
              {selectedProject.status}
            </span>
          </div>

        </div>

        <p className="project-detail-description">
          {selectedProject.description}
        </p>

        {selectedProject.image && (
          <figure className="project-detail-visual">
            <div className="project-detail-visual-frame">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} project preview`}
              />
            </div>
            <figcaption>PROJECT ARTIFACT · ORIGINAL INTERFACE</figcaption>
          </figure>
        )}

        <div className="project-detail-actions">

          {selectedProject.liveDemo && (
            <a
              href={selectedProject.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="project-link primary"
            >
              Launch Project ↗
            </a>
          )}

          {selectedProject.github && (
            <a
              href={selectedProject.github}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              View GitHub ↗
            </a>
          )}

        </div>

        <div className="project-detail-grid">

          <section className="project-detail-card">
            <p className="project-detail-label">
              THE PROBLEM
            </p>

            <p>
              {selectedProject.problem}
            </p>
          </section>


          <section className="project-detail-card">
            <p className="project-detail-label">
              THE SOLUTION
            </p>

            <p>
              {selectedProject.solution}
            </p>
          </section>

        </div>


        <section className="project-detail-section">

          <p className="project-detail-label">
            TECHNOLOGIES
          </p>

          <div className="technology-list">

            {selectedProject.technologies.map(
              (technology) => (
                <span key={technology}>
                  {technology}
                </span>
              )
            )}

          </div>

        </section>


        <section className="project-detail-section">

          <p className="project-detail-label">
            KEY FEATURES
          </p>

          <div className="project-feature-grid">

            {selectedProject.features.map(
              (feature) => (
                <div
                  className="project-feature"
                  key={feature}
                >
                  <span>+</span>

                  <p>
                    {feature}
                  </p>
                </div>
              )
            )}

          </div>

        </section>


        {selectedProject.note && (
          <div className="project-note">
            <span>PROJECT NOTE</span>

            <p>
              {selectedProject.note}
            </p>
          </div>
        )}

      </div>
    );
  }


  // ==============================
  // PROJECT LIBRARY
  // ==============================

  return (
    <div className="projects-app">

      <div className="projects-header">

        <p className="app-eyebrow">
          FEATURED WORK
        </p>

        <h1>
          Projects
        </h1>

        <p>
          Selected applications and development projects.
        </p>

      </div>


      <div className="project-grid">

        {projects.map((project) => (

          <article
            className="project-card"
            key={project.id}
          >

            <div className="project-card-top">

              <div className="project-meta">

                <span>
                  {project.category}
                </span>

                <span>
                  {project.status}
                </span>

              </div>


              <h2>
                {project.title}
              </h2>


              <p>
                {project.description}
              </p>

            </div>


            <div>

              <div className="technology-list">

                {project.technologies
                  .slice(0, 4)
                  .map((technology) => (

                    <span key={technology}>
                      {technology}
                    </span>

                  ))}

              </div>


              <div className="project-actions">

                <button
                  onClick={() =>
                    setSelectedProject(project)
                  }
                >
                  View Project →
                </button>

              </div>

            </div>

          </article>

        ))}

      </div>

    </div>
  );
}

function CvosCaseStudy({ project, onBack }) {
  const { caseStudy } = project;

  return (
    <article className="cvos-case-study">
      <button className="project-back" onClick={onBack}>← Project library</button>

      <header className="cvos-case-hero">
        <div>
          <p className="app-eyebrow">PRODUCT CASE STUDY · CVOS</p>
          <h1>{project.title}</h1>
          <p>{caseStudy.summary}</p>
        </div>
        <div className="cvos-case-release"><span>CURRENT RELEASE</span><strong>{caseStudy.currentVersion}</strong><small>{project.status}</small></div>
      </header>

      <section className="cvos-case-milestones" aria-label="CVOS version history">
        {caseStudy.versions.map((version) => (
          <article className="cvos-version-card" key={version.version}>
            <div><span>{version.version}</span><small>{version.label}</small></div>
            <h2>{version.title}</h2>
            <p>{version.description}</p>
            <ul>{version.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </article>
        ))}
      </section>

      {caseStudy.snapshots?.length > 0 && (
        <section className="cvos-case-section">
          <div className="cvos-case-heading"><p className="project-detail-label">INTERFACE ARCHIVE</p><h2>How CVOS evolved visually.</h2></div>
          <div className="cvos-snapshot-grid">{caseStudy.snapshots.map((snapshot) => <figure className="cvos-snapshot" key={snapshot.version}><div className="cvos-snapshot-frame"><img src={snapshot.image} alt={`${snapshot.version} CVOS interface snapshot`} /></div><figcaption><span>{snapshot.version} · {snapshot.label}</span><p>{snapshot.description}</p></figcaption></figure>)}</div>
        </section>
      )}

      <section className="cvos-case-section">
        <div className="cvos-case-heading"><p className="project-detail-label">V2 SYSTEM FEATURES</p><h2>What the platform does now.</h2></div>
        <div className="project-feature-grid">{caseStudy.currentFeatures.map((feature) => <div className="project-feature" key={feature}><span>+</span><p>{feature}</p></div>)}</div>
      </section>

      <section className="cvos-case-section cvos-architecture">
        <div className="cvos-case-heading"><p className="project-detail-label">SYSTEM ARCHITECTURE</p><h2>Portfolio, services, and physical touchpoints.</h2></div>
        <div className="cvos-architecture-flow">{caseStudy.architecture.map((layer, index) => <div className="cvos-architecture-node" key={layer}><span>0{index + 1}</span><strong>{layer}</strong></div>)}</div>
      </section>

      <aside className="project-note cvos-case-note"><span>DEPLOYMENT MILESTONE</span><p>{caseStudy.deploymentNote}</p></aside>
    </article>
  );
}

export default Projects;
