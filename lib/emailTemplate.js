// Branded, email-client-safe HTML (tables + inline styles) shared by the contact and review emails.
import { esc } from '@/lib/mail'

const BRAND = '#0e7cb5'
const INK = '#080c18'
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"

const multiline = s => esc(s).replace(/\n/g, '<br>')

// rows: [label, value] pairs. message: { label, text }. Optional: stars (1-5), replyTo, note.
export function renderEmail({ preheader, kicker, title, rows = [], message, stars, replyTo, replySubject, note, action }) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8ecf3;width:130px;vertical-align:top;font:600 12px/1.4 ${FONT};letter-spacing:.06em;text-transform:uppercase;color:#6b7690;">${esc(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8ecf3;vertical-align:top;font:15px/1.5 ${FONT};color:${INK};">${value}</td>
        </tr>`
    )
    .join('')

  const starsHtml = stars
    ? `<div style="font-size:26px;letter-spacing:3px;line-height:1;padding:4px 0 18px;">
         <span style="color:#f5a623;">${'★'.repeat(stars)}</span><span style="color:#d5dbe8;">${'☆'.repeat(5 - stars)}</span>
         <span style="font:600 14px ${FONT};color:#6b7690;letter-spacing:0;margin-left:6px;">${stars}/5</span>
       </div>`
    : ''

  const messageHtml = message
    ? `<p style="margin:26px 0 8px;font:600 12px/1.4 ${FONT};letter-spacing:.06em;text-transform:uppercase;color:#6b7690;">${esc(message.label)}</p>
       <div style="background:#f4f7fb;border-left:4px solid ${BRAND};border-radius:6px;padding:16px 18px;font:15px/1.65 ${FONT};color:${INK};">${multiline(message.text)}</div>`
    : ''

  const replyHtml = replyTo
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td style="background:${BRAND};border-radius:8px;">
         <a href="mailto:${esc(replyTo)}?subject=${encodeURIComponent(replySubject || 'Re: your message to Naxatech')}" style="display:inline-block;padding:12px 24px;font:600 14px ${FONT};color:#ffffff;text-decoration:none;">Reply to ${esc(replyTo)}</a>
       </td></tr></table>`
    : ''

  const actionHtml = action
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px;"><tr><td style="background:${INK};border-radius:8px;">
         <a href="${esc(action.href)}" style="display:inline-block;padding:12px 24px;font:600 14px ${FONT};color:#ffffff;text-decoration:none;">${esc(action.label)}</a>
       </td></tr></table>`
    : ''

  const noteHtml = note
    ? `<p style="margin:24px 0 0;padding:12px 14px;background:#fff8e6;border-radius:6px;font:13px/1.5 ${FONT};color:#7a5b00;">${note}</p>`
    : ''

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#eef2f7;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader || title)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
        <tr><td style="background:${INK};padding:22px 32px;border-bottom:4px solid ${BRAND};">
          <span style="font:800 22px ${FONT};letter-spacing:-.01em;color:#ffffff;">Naxa<span style="color:#38b6f0;">tech</span></span>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 6px;font:700 12px ${FONT};letter-spacing:.1em;text-transform:uppercase;color:${BRAND};">${esc(kicker)}</p>
          <h1 style="margin:0 0 20px;font:700 24px/1.25 ${FONT};color:${INK};">${esc(title)}</h1>
          ${starsHtml}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8ecf3;">${rowsHtml}</table>
          ${messageHtml}
          ${replyHtml}
          ${actionHtml}
          ${noteHtml}
        </td></tr>
        <tr><td style="background:#f4f7fb;padding:18px 32px;font:12px/1.5 ${FONT};color:#8a93ad;">
          Sent automatically from the contact forms on naxatech.org. Replying to this email goes to the sender.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

// Plain-text twin (better deliverability, and for clients that block HTML).
export function renderText({ title, rows = [], message, stars, note }) {
  return [
    title,
    '',
    stars ? `Rating: ${stars}/5` : null,
    ...rows.map(([l, v]) => `${l}: ${String(v).replace(/<[^>]+>/g, '')}`),
    message ? `\n${message.label}:\n${message.text}` : null,
    note ? `\n${note.replace(/<[^>]+>/g, '')}` : null,
  ]
    .filter(x => x !== null)
    .join('\n')
}
