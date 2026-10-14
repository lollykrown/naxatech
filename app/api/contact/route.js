import { NextResponse } from 'next/server'

const MAX = { name: 120, email: 254, company: 160, service: 80, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort per-instance rate limit (use a shared store if you scale out).
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: pretend success so bots don't retry.
  if (body.website) return NextResponse.json({ ok: true })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (limited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const data = {}
  for (const [key, max] of Object.entries(MAX)) {
    const v = typeof body[key] === 'string' ? body[key].trim() : ''
    if (v.length > max) return NextResponse.json({ error: `${key} is too long.` }, { status: 400 })
    data[key] = v
  }
  if (!data.name || !data.message) {
    return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact form: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not set')
    return NextResponse.json({ error: 'Messaging is temporarily unavailable. Please email us directly.' }, { status: 503 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: data.email,
      subject: `New enquiry from ${data.name.replace(/[\r\n]/g, ' ')}`,
      html: `<p><b>Name:</b> ${esc(data.name)}</p>
<p><b>Email:</b> ${esc(data.email)}</p>
<p><b>Company:</b> ${esc(data.company || '-')}</p>
<p><b>Service:</b> ${esc(data.service || '-')}</p>
<p><b>Message:</b></p><p>${esc(data.message).replace(/\n/g, '<br>')}</p>`,
    }),
  })

  if (!res.ok) {
    console.error('Contact form: Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
