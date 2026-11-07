import { NextResponse } from 'next/server'
import { EMAIL_RE, clientIp, esc, rateLimited, readFields, sendMail } from '@/lib/mail'

const LIMITS = { name: 120, email: 254, role: 160, review: 1500 }

// Reviews are emailed to you for approval, never published automatically.
export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (body.website) return NextResponse.json({ ok: true })

  if (rateLimited('review', clientIp(req), 3)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { data, error } = readFields(body, LIMITS)
  if (error) return NextResponse.json({ error }, { status: 400 })
  const rating = Number(body.rating)
  if (!data.name || data.review.length < 10) {
    return NextResponse.json({ error: 'Please add your name and a short review (at least 10 characters).' }, { status: 400 })
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Please choose a rating from 1 to 5.' }, { status: 400 })
  }

  const result = await sendMail({
    subject: `New review (${rating}/5) from ${data.name.replace(/[\r\n]/g, ' ')}`,
    replyTo: data.email,
    html: `<p><b>Rating:</b> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)</p>
<p><b>Name:</b> ${esc(data.name)}</p>
<p><b>Role / company:</b> ${esc(data.role || '-')}</p>
<p><b>Email (not for publishing):</b> ${esc(data.email)}</p>
<p><b>Review:</b></p><p>${esc(data.review).replace(/\n/g, '<br>')}</p>
<p><i>Pending approval. To publish it, add it to lib/content.js.</i></p>`,
  })
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })
  return NextResponse.json({ ok: true })
}
