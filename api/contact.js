/* global process */
import nodemailer from "nodemailer";

const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_MESSAGES = 4;

const clean = (value, max) => String(value || "").trim().slice(0, max);
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

function rateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_MESSAGES;
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });

  const ip = clean(request.headers["x-forwarded-for"]?.split(",")[0] || "unknown", 80);
  if (rateLimited(ip)) return response.status(429).json({ error: "Too many messages. Please try again later." });

  const name = clean(request.body?.name, 80);
  const email = clean(request.body?.email, 120).toLowerCase();
  const subject = clean(request.body?.subject, 120);
  const message = clean(request.body?.message, 3000);
  const website = clean(request.body?.website, 200);

  if (website) return response.status(200).json({ ok: true });
  if (!name || !subject || message.length < 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: "Please complete every field with a valid email and message." });
  }

  const { NEO_SMTP_PORT, NEO_SMTP_USER, NEO_SMTP_PASS } = process.env;
  const NEO_SMTP_HOST = process.env.NEO_SMTP_HOST || "smtp0001.neo.space";
  if (!NEO_SMTP_USER || !NEO_SMTP_PASS) {
    return response.status(503).json({ error: "The secure message channel is being configured. Please email christian@cvos.dev." });
  }

  const transporter = nodemailer.createTransport({
    host: NEO_SMTP_HOST,
    port: Number(NEO_SMTP_PORT || 465),
    secure: Number(NEO_SMTP_PORT || 465) === 465,
    auth: { user: NEO_SMTP_USER, pass: NEO_SMTP_PASS },
  });

  await transporter.sendMail({
    from: `CVOS Contact <${NEO_SMTP_USER}>`,
    to: process.env.CONTACT_TO || "christian@cvos.dev",
    replyTo: email,
    subject: `[CVOS] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<h2>New CVOS message</h2><p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  });

  return response.status(200).json({ ok: true });
}
