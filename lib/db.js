// Neon Postgres access for user-submitted reviews.
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL
const sql = url ? neon(url) : null

let ready
function init() {
  if (!sql) throw new Error('DATABASE_URL is not set')
  ready ||= sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      role        TEXT NOT NULL DEFAULT '',
      email       TEXT NOT NULL,
      rating      INT  NOT NULL CHECK (rating BETWEEN 1 AND 5),
      review      TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      approved_at TIMESTAMPTZ
    )`.catch(e => { ready = undefined; throw e })
  return ready
}

export async function addReview({ name, role, email, rating, review }) {
  await init()
  const [row] = await sql`
    INSERT INTO reviews (name, role, email, rating, review)
    VALUES (${name}, ${role}, ${email}, ${rating}, ${review})
    RETURNING id`
  return row.id
}

export async function listReviews(status) {
  await init()
  return status
    ? sql`SELECT * FROM reviews WHERE status = ${status} ORDER BY created_at DESC`
    : sql`SELECT * FROM reviews ORDER BY created_at DESC`
}

export async function setReviewStatus(id, status) {
  await init()
  await sql`
    UPDATE reviews
    SET status = ${status}, approved_at = ${status === 'approved' ? new Date().toISOString() : null}
    WHERE id = ${id}`
}

export async function deleteReview(id) {
  await init()
  await sql`DELETE FROM reviews WHERE id = ${id}`
}
