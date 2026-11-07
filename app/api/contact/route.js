import { NextResponse } from 'next/server'
import { EMAIL_RE, clientIp, esc, rateLimited, readFields, sendMail } from '@/lib/mail'

const LIMITS = { name: 120, email: 254, company: 160, service: 80, message: 5000 }

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: pretend success so bots don't retry.
  if (body.website) return NextResponse.json({ ok: true })

  if (rateLimited('contact', clientIp(req))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { data, error } = readFields(body, LIMITS)
  if (error) return NextResponse.json({ error }, { status: 400 })
  if (!data.name || !data.message) {
    return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const result = await sendMail({
    subject: `New enquiry from ${data.name.replace(/[\r\n]/g, ' ')}`,
    replyTo: data.email,
    html: `<p><b>Name:</b> ${esc(data.name)}</p>
<p><b>Email:</b> ${esc(data.email)}</p>
<p><b>Company:</b> ${esc(data.company || '-')}</p>
<p><b>Service:</b> ${esc(data.service || '-')}</p>
<p><b>Message:</b></p><p>${esc(data.message).replace(/\n/g, '<br>')}</p>`,
  })
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })
  return NextResponse.json({ ok: true })
}
