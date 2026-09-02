import { useRef, useState } from "react";
import { ArrowRight, Bot, Download, FileText, FolderCode, Globe2, Mail, Paperclip, Send, Sparkles } from "lucide-react";
import "./App.css";
import "./v2.css";
import "./figma-theme.css";
import OSWindow from "./components/OSWindow";
import FeedbackWidget from "./components/FeedbackWidget";
import NfcCard from "./components/NfcCard";
import Projects from "./components/apps/Projects";
import Resume from "./components/apps/Resume";
import Skills from "./components/apps/Skills";
import Contact from "./components/apps/Contact";
import Assistant from "./components/apps/Assistant";
import FeedbackForm from "./components/apps/FeedbackForm";
import projects from "./data/projects";
import portfolio from "./data/portfolio";

const staticContent = { Projects: <Projects />, Resume: <Resume />, Skills: <Skills />, Contact: <Contact />, Feedback: <FeedbackForm /> };
const featured = projects.find((item) => item.id === "portfolio-os");
const selected = [featured, projects.find((item) => item.id === "nfc-review-system"), projects.find((item) => item.id === "car-cost-calculator")].filter(Boolean);

function App() {
  const [windows, setWindows] = useState({});
  const [assistantDraft, setAssistantDraft] = useState("");
  const [assistantSeed, setAssistantSeed] = useState("");
  const z = useRef(100);
  const open = (name) => { z.current += 1; setWindows((all) => ({ ...all, [name]: { open: true, zIndex: z.current } })); };
  const openProject = (projectId) => open(`Project:${projectId}`);
  const openCaseStudy = (projectId) => open(`CaseStudy:${projectId}`);
  const close = (name) => setWindows((all) => ({ ...all, [name]: { ...all[name], open: false } }));
  const askAssistant = (question = assistantDraft) => {
    const cleanedQuestion = question.trim();
    if (cleanedQuestion) setAssistantSeed(cleanedQuestion);
    setAssistantDraft("");
    open("AI Assistant");
  };
  const activeZ = Math.max(0, ...Object.values(windows).filter((item) => item?.open).map((item) => item.zIndex || 0));

  return (
    <main className="v2-shell">
      <header className="v2-nav"><div className="v2-nav-inner">
        <a className="v2-brand" href="#top"><img className="v2-brand-mark" src="/cvos-brand-mark.png" alt="" /><span>CVOS</span><span className="v2-version">v2.0.0</span></a>
        <nav className="v2-links"><a href="#projects">Projects</a><a href="#intelligence">AI + NFC</a><button onClick={() => open("Skills")}>Skills</button><button onClick={() => open("Resume")}>Resume</button><button onClick={() => open("Contact")}>Contact</button></nav>
        <span className="v2-status">AVAILABLE FOR OPPORTUNITIES</span>
      </div></header>

      <div className="v2-container" id="top">
        <section className="v2-hero v2-grid-bg">
          <article className="v2-panel v2-hero-copy"><p className="v2-eyebrow">CHRISTIAN VALLES OS · IT PROFESSIONAL · DEVELOPER</p><h1>I build practical systems that <span className="volt">solve</span> real problems.</h1><p className="v2-lede">I connect technology, support, and development to create useful digital experiences—from web applications to physical-digital products.</p><div className="v2-actions"><a className="v2-button primary" href="#projects">View my work <ArrowRight size={16} /></a><button className="v2-button" onClick={() => open("Contact")}>Contact me</button><AskCvosButton onClick={() => open("AI Assistant")} /></div></article>
          <article className="v2-panel v2-featured"><div className="cvos-featured-stars" aria-hidden="true"><i /><i /><i /></div><div className="cvos-featured-content"><div className="v2-panel-head"><span className="v2-label">Featured project</span><span className="v2-chip">IN DEVELOPMENT</span></div><h2>Christian Valles OS</h2><p>{featured?.description}</p><div className="v2-metrics"><Metric label="RELEASE" value="2.0" /><Metric label="AI CORE" value="GEMINI" /><Metric label="DATA" value="SUPABASE" /></div><Tags items={featured?.technologies.slice(0, 5)} /><button className="v2-project-link" onClick={() => openCaseStudy(featured.id)}>View case study &nbsp; →</button></div></article>
        </section>

        <section className="v2-trust-row" aria-label="Client feedback"><div className="v2-panel v2-testimonials"><FeedbackWidget showLeaveAction={false} onLeaveFeedback={() => open("Feedback")} /></div><article className="v2-panel v2-review-cta"><div><span className="v2-eyebrow">CLIENT EXPERIENCE</span><h2>How was your experience?</h2><p>Share a verified review from a project, support interaction, or collaboration.</p></div><button className="v2-button primary" onClick={() => open("Feedback")}>Leave a review <Sparkles size={15} /></button></article></section>

        <section className="v2-section" id="projects"><SectionHead eyebrow="SELECTED PROJECTS" title="Proof through practical work." copy="Real projects across web development, software, NFC, and customer experience." /><div className="v2-project-grid">{selected.map((project, index) => <article className="v2-panel v2-project" key={project.id}><div className="v2-panel-head"><span className="v2-project-number">0{index + 1}</span><span className="v2-chip">{project.status}</span></div><span className="v2-eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><Tags items={project.technologies.slice(0, 5)} /><button className="v2-project-link" onClick={() => openProject(project.id)}>View project &nbsp; →</button></article>)}</div></section>

        <section className="v2-section" id="intelligence"><SectionHead eyebrow="AI ASSISTANT + PORTFOLIO INTELLIGENCE" title="More than a static portfolio." copy="Ask questions, explore the system, or connect through a real NFC interface." /><div className="v2-panel v2-intelligence">
          <div className="v2-intelligence-copy"><span className="v2-label">Gemini powered</span><h3>Ask CVOS</h3><p>Get a focused overview of my work, background, skills, and experience.</p><form className="v2-ai-composer" onSubmit={(event) => { event.preventDefault(); askAssistant(); }}><textarea value={assistantDraft} onChange={(event) => setAssistantDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); askAssistant(); } }} placeholder="Ask about Christian's work... ✦" aria-label="Ask CVOS a question" /><div className="v2-ai-composer-tools"><div><button type="button" disabled title="Attachments coming soon" aria-label="Attachments coming soon"><Paperclip size={17} /></button><button type="button" disabled title="Web sources coming soon" aria-label="Web sources coming soon"><Globe2 size={17} /></button></div><button className="v2-ai-send" type="submit" aria-label="Send question" disabled={!assistantDraft.trim()}><Send size={17} /></button></div></form><div className="v2-prompts"><button onClick={() => askAssistant("What projects has Christian built?")}>Projects</button><button onClick={() => askAssistant("What are Christian's strongest skills?")}>Strongest skills</button><button onClick={() => askAssistant("Is Christian available?")}>Availability</button></div></div>
          <NfcCard />
          <div className="v2-overview"><span className="v2-eyebrow">PORTFOLIO OVERVIEW</span><div className="v2-overview-grid"><Metric label="PROJECTS" value={projects.length} /><Metric label="CERTS" value={portfolio.certifications.length} /><Metric label="FOCUS" value="IT + DEV" /><Metric label="STATUS" value="OPEN" /></div><div className="v2-overview-copy"><span className="v2-label">Core strength</span><p>Practical systems, technical troubleshooting, and clear customer-focused experiences.</p><button className="v2-project-link" onClick={() => open("Skills")}>Explore skills &nbsp; →</button></div></div>
        </div></section>

        <section className="v2-section v2-conversion"><Conversion icon={<FileText />} title="Resume & credentials" copy="Education, certifications, experience, and technical skills."><a className="v2-button primary" href="/resume.pdf" download>Download PDF <Download size={15} /></a><button className="v2-button" onClick={() => open("Resume")}>View online</button></Conversion><Conversion icon={<Mail />} title="Let’s build something" copy="Have a project in mind, an opportunity, or just want to connect?"><button className="v2-button" onClick={() => open("Contact")}>Contact me <ArrowRight size={15} /></button></Conversion></section>
        <footer className="v2-footer"><strong>CVOS · CHRISTIAN VALLES OS · 2026</strong><span>BUILT WITH REACT · VITE · INTENTIONAL CRAFT</span></footer>
      </div>

      <nav className="v2-mobile-dock" aria-label="Mobile quick navigation"><a className="active" href="#projects" aria-label="Projects"><FolderCode size={19} /></a><button aria-label="Ask CVOS" onClick={() => open("AI Assistant")}><Bot size={19} /></button><button aria-label="Resume" onClick={() => open("Resume")}><FileText size={19} /></button><button aria-label="Contact" onClick={() => open("Contact")}><Mail size={19} /></button></nav>
      <div className="v2-window-layer">{Object.entries(windows).map(([name, state], index) => {
        if (!state.open) return null;
        const isCaseStudy = name.startsWith("CaseStudy:");
        const projectId = name.startsWith("Project:") ? name.slice(8) : isCaseStudy ? name.slice(10) : null;
        const project = projectId ? projects.find((item) => item.id === projectId) : null;
        return <OSWindow key={name} title={isCaseStudy ? "CVOS Case Study" : project?.title || name} zIndex={state.zIndex} isActive={state.zIndex === activeZ} defaultOffset={index} onFocus={() => open(name)} onClose={() => close(name)} onMinimize={() => close(name)}>{projectId ? <Projects initialProjectId={projectId} displayMode={isCaseStudy ? "case-study" : "detail"} /> : name === "AI Assistant" ? <Assistant initialQuestion={assistantSeed} /> : staticContent[name]}</OSWindow>;
      })}</div>
    </main>
  );
}

function Metric({ label, value }) { return <div className="v2-metric"><span>{label}</span><strong>{value}</strong></div>; }
function Tags({ items = [] }) { return <div className="v2-tags">{items.map((item) => <span className="v2-tag" key={item}>{item}</span>)}</div>; }
function SectionHead({ eyebrow, title, copy }) { return <div className="v2-section-heading"><div><span className="v2-eyebrow">{eyebrow}</span><h2>{title}</h2></div><p>{copy}</p></div>; }
function Conversion({ icon, title, copy, children }) { return <article className="v2-panel v2-conversion-card">{icon}<h3>{title}</h3><p>{copy}</p><div className="v2-actions">{children}</div></article>; }
function AskCvosButton({ onClick }) {
  return <button className="v2-ask-button" type="button" onClick={onClick} aria-label="Ask CVOS"><Sparkles size={18} aria-hidden="true" /><span>{[..."ASK CVOS"].map((letter, index) => <span className="v2-ask-letter" style={{ "--letter-index": index }} key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>)}</span></button>;
}

export default App;
