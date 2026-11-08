import { NextResponse } from 'next/server'
import { renderEmail, renderText } from '@/lib/emailTemplate'
import { addReview } from '@/lib/db'
import { EMAIL_RE, clientIp, esc, rateLimited, readFields, sendMail } from '@/lib/mail'

const LIMITS = { name: 120, email: 254, role: 160, review: 1500 }

// Reviews are saved as 'pending' and emailed to you; they only go live once approved in /admin/reviews.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://naxatech.org'
export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (body.website) return NextResponse.json({ ok: true })

  if (await rateLimited('review', clientIp(req), 3)) {
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

  let saved = true
  try {
    await addReview({ name: data.name, role: data.role, email: data.email, rating, review: data.review })
  } catch (e) {
    saved = false
    console.error('Review: could not save to database:', e.message)
  }

  const mail = {
    kicker: 'New review',
    title: `${data.name} left a ${rating}-star review`,
    preheader: data.review.slice(0, 110),
    stars: rating,
    rows: [
      ['Name', esc(data.name)],
      ['Role / company', esc(data.role || '-')],
      ['Email', `<a href="mailto:${esc(data.email)}" style="color:#0e7cb5;">${esc(data.email)}</a> <span style="color:#8a93ad;">(not for publishing)</span>`],
    ],
    message: { label: 'Review', text: data.review },
    replyTo: data.email,
    replySubject: 'Thank you for your review of Naxatech',
    action: saved ? { label: 'Review & approve', href: `${SITE_URL}/admin/reviews` } : undefined,
    note: saved
      ? '<b>Pending approval.</b> It will not appear on the site until you approve it.'
      : '<b>Not saved to the database</b> (it was unavailable). To publish this review, add it to <code>lib/content.js</code>.',
  }
  const result = await sendMail({
    subject: `New review (${rating}/5) from ${data.name.replace(/[\r\n]/g, ' ')}`,
    replyTo: data.email,
    html: renderEmail(mail),
    text: renderText(mail),
  })
  // Succeed if the review reached you by at least one route (database or email).
  if (!result.ok && !saved) return NextResponse.json({ error: result.error }, { status: result.status })
  if (!result.ok) console.error('Review: saved but notification email failed')
  return NextResponse.json({ ok: true })
}
