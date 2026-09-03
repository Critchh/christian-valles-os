import portfolio from "../../data/portfolio";

function Resume() {
  return (
    <div className="resume-app">
      <div className="resume-header">
        <div>
          <p className="app-eyebrow">PROFESSIONAL PROFILE</p>
          <h1>Resume</h1>
          <p className="resume-subtitle">
            Information Technology • Development • Technical Support
          </p>
        </div>

        <div className="resume-actions">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-button primary"
          >
            View Resume
          </a>

          <a
            href="/resume.pdf"
            download
            className="resume-button"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="resume-grid">
        <section className="resume-card">
          <p className="resume-section-label">EDUCATION</p>

          {portfolio.education.map((item, index) => (
            <div className="resume-entry" key={index}>
              <h3>{item.program}</h3>
              <p>{item.school}</p>
              <span>{item.status}</span>
            </div>
          ))}
        </section>

        <section className="resume-card">
          <p className="resume-section-label">CERTIFICATIONS</p>

          {portfolio.certifications.map((certification) => (
            <div className="certification-item" key={certification}>
              <span className="certification-dot"></span>
              <p>{certification}</p>
            </div>
          ))}
        </section>

        <section className="resume-card resume-card-wide">
          <p className="resume-section-label">EXPERIENCE</p>

          <div className="resume-entry">
            <h3>Remote Customer Service Representative</h3>
            <p>ITM Marketing</p>
            <span>May 2026 – Present</span>

            <ul>
              <li>Tier 1 customer and technical support</li>
              <li>Salesforce CRM case documentation</li>
              <li>Account, login, payment, and website troubleshooting</li>
              <li>Multi-system and cloud-based workflow support</li>
            </ul>
          </div>

          <div className="resume-entry">
            <h3>Operations Customer Expert</h3>
            <p>Teleperformance</p>
            <span>Feb 2026 – May 2026</span>

            <ul>
              <li>Technical and customer support</li>
              <li>Salesforce CRM case management</li>
              <li>Account access and software troubleshooting</li>
            </ul>
          </div>

          <div className="resume-entry">
            <h3>Assistant Store Manager</h3>
            <p>Pizza Hut · McAllen, Texas</p>
            <span>Nov 2023 – Apr 2025</span>

            <ul>
              <li>Managed customer service, retention, complaints, refund requests, and questions by phone and in store</li>
              <li>Oversaw product quality and overall store efficiency during assigned shifts</li>
              <li>Managed registers, balanced daily drawers, and minimized transaction discrepancies</li>
              <li>Mentored new employees on company policies, procedures, and operational best practices</li>
            </ul>
          </div>
        </section>

        <section className="resume-card resume-card-wide">
          <p className="resume-section-label">TECHNICAL SKILLS</p>

          <div className="resume-skills">
            {Object.values(portfolio.skills)
              .flat()
              .map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resume;
