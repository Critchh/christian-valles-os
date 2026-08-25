function Contact() {
  return (
    <div className="contact-app">
      <p className="app-eyebrow">CONNECT</p>

      <h1>Contact</h1>

      <p className="contact-intro">
        Interested in working together, discussing a project,
        or connecting professionally?
      </p>

      <div className="contact-grid">
        <a
          href="mailto:christianpol.valles@gmail.com"
          className="contact-card"
        >
          <span className="contact-icon">@</span>

          <div>
            <p className="contact-label">EMAIL</p>
            <h3>christianpol.valles@gmail.com</h3>
          </div>
        </a>

        <a
          href="https://github.com/Critchh"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span className="contact-icon">&lt;/&gt;</span>

          <div>
            <p className="contact-label">GITHUB</p>
            <h3>github.com/Critchh</h3>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/christian-pol-valles-58a2a2249/"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span className="contact-icon">in</span>

          <div>
            <p className="contact-label">LINKEDIN</p>
            <h3>Connect professionally</h3>
          </div>
        </a>

        <a
          href="/christian-valles.vcf"
          download
          className="contact-card"
        >
          <span className="contact-icon">+</span>

          <div>
            <p className="contact-label">CONTACT CARD</p>
            <h3>Save Contact</h3>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Contact;