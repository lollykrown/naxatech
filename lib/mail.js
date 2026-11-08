// Shared helpers for the form API routes (contact + reviews).
import { createHash } from 'node:crypto'
import SITE from '@/lib/site'
import { countHit } from '@/lib/db'

export const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// In-memory fallback, used only if the database is unreachable (per-instance, best effort).
const hits = new Map()
function memoryLimited(key, max, windowMs) {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter(t => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > max
}

// Database-backed so the limit holds across serverless instances. IPs are stored hashed.
export async function rateLimited(bucket, ip, max = 5, windowMs = 10 * 60_000) {
  try {
    const key = createHash('sha256').update(ip).digest('hex').slice(0, 32)
    return (await countHit(bucket, key, windowMs)) > max
  } catch (e) {
    console.error('Rate limit: database unavailable, using in-memory fallback:', e.message)
    return memoryLimited(`${bucket}:${ip}`, max, windowMs)
  }
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
