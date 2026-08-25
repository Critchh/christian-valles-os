import portfolio from "../../data/portfolio";

function Skills() {
  return (
    <div className="skills-app">

      <p className="app-eyebrow">
        TECHNICAL PROFILE
      </p>

      <h1>Skills</h1>

      <div className="skills-grid">

        {Object.entries(portfolio.skills).map(
          ([category, skills]) => (
            <section
              className="skill-section"
              key={category}
            >

              <h3>
                {category}
              </h3>

              <div className="skill-tags">

                {skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}

              </div>

            </section>
          )
        )}

      </div>

    </div>
  );
}

export default Skills;