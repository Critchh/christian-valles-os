import portfolio from "../../data/portfolio";

function About() {
  return (
    <div className="about-app">

      <p className="app-eyebrow">
        ABOUT
      </p>

      <h1>
        {portfolio.name}
      </h1>

      <h3>
        {portfolio.headline}
      </h3>

      <div className="about-divider"></div>

      {portfolio.about.map((paragraph, index) => (
        <p key={index}>
          {paragraph}
        </p>
      ))}

    </div>
  );
}

export default About;