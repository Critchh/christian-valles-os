import { useState } from "react";
import projects from "../../data/projects";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // ==============================
  // PROJECT DETAIL VIEW
  // ==============================

  if (selectedProject) {
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

export default Projects;