import { useState } from "react";
import { Mail, Send } from "lucide-react";

function Contact() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Message could not be sent.");
      formElement.reset();
      setStatus("sent");
      setMessage("Message received. I’ll get back to you as soon as possible.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Message could not be sent. Please email christian@cvos.dev.");
    }
  };

  return (
    <div className="contact-app contact-v2">
      <div className="contact-v2-intro">
        <p className="app-eyebrow">SECURE MESSAGE CHANNEL</p>
        <h1>Let’s build something.</h1>
        <p>Send a project inquiry, opportunity, or professional message directly to my CVOS inbox.</p>
        <a className="contact-v2-email" href="mailto:christian@cvos.dev"><Mail size={17} /> christian@cvos.dev</a>
        <div className="contact-v2-links">
          <a href="https://github.com/Critchh" target="_blank" rel="noreferrer"><span>&lt;/&gt;</span> GitHub</a>
          <a href="https://www.linkedin.com/in/christian-pol-valles-58a2a2249/" target="_blank" rel="noreferrer"><span>in</span> LinkedIn</a>
        </div>
      </div>

      <form className="contact-v2-form" onSubmit={submit}>
        <div className="contact-field-row">
          <label>Name<input name="name" required maxLength={80} autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
        </div>
        <label>Subject<input name="subject" required maxLength={120} /></label>
        <label>Message<textarea name="message" required minLength={20} maxLength={3000} rows={7} /></label>
        <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="contact-form-footer">
          <span>Protected by validation, rate limiting, and a spam trap.</span>
          <button className={`contact-send-button${status === "sending" ? " is-sending" : ""}`} type="submit" disabled={status === "sending"}>
            <span className="contact-send-label">Send message</span>
            <span className="contact-send-processing"><i aria-hidden="true" /> Processing…</span>
            <Send className="contact-send-icon" size={16} aria-hidden="true" />
          </button>
        </div>
        {message && <p className={`contact-form-status ${status}`} role="status">{message}</p>}
      </form>
    </div>
  );
}

export default Contact;
