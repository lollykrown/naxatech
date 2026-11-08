// Shared helpers for the form API routes (contact + reviews).
import SITE from '@/lib/site'

export const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort per-instance rate limit (use a shared store if you scale out).
const hits = new Map()
export function rateLimited(bucket, ip, max = 5, windowMs = 10 * 60_000) {
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const recent = (hits.get(key) || []).filter(t => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > max
}

export function clientIp(req) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
}

// Reads string fields, trims them and enforces max lengths. Returns { data } or { error }.
export function readFields(body, limits) {
  const data = {}
  for (const [key, max] of Object.entries(limits)) {
    const v = typeof body[key] === 'string' ? body[key].trim() : ''
    if (v.length > max) return { error: `${key} is too long.` }
    data[key] = v
  }
  return { data }
}

// Sends through Resend. Returns { ok: true } or { ok: false, status, error }.
export async function sendMail({ subject, html, text, replyTo }) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  // Recipients come from lib/site.js; CONTACT_TO_EMAIL (comma-separated) overrides if set.
  const to = CONTACT_TO_EMAIL ? CONTACT_TO_EMAIL.split(',').map(e => e.trim()).filter(Boolean) : SITE.email
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    console.error('Mail: RESEND_API_KEY / CONTACT_FROM_EMAIL not set')
    return { ok: false, status: 503, error: 'Messaging is temporarily unavailable. Please email us directly.' }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: CONTACT_FROM_EMAIL, to, reply_to: replyTo, subject, html, text }),
  })
  if (!res.ok) {
    console.error('Mail: Resend error', res.status, await res.text())
    return { ok: false, status: 502, error: 'Could not send your message. Please try again.' }
  }
  return { ok: true }
}
