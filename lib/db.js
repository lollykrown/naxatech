// Neon Postgres access for user-submitted reviews.
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL
const sql = url ? neon(url) : null

let ready
function init() {
  if (!sql) throw new Error('DATABASE_URL is not set')
  ready ||= sql`
    CREATE TABLE IF NOT EXISTS rate_limits (
      id         BIGSERIAL PRIMARY KEY,
      bucket     TEXT NOT NULL,
      key        TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`.then(() => sql`CREATE INDEX IF NOT EXISTS rate_limits_lookup ON rate_limits (bucket, key, created_at)`)
    .then(() => sql`
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
    )`)
    .then(() => sql`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false`)
    .catch(e => { ready = undefined; throw e })
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
    SET status = ${status}, featured = (featured AND ${status === 'approved'}), approved_at = ${status === 'approved' ? new Date().toISOString() : null}
    WHERE id = ${id}`
}

export async function deleteReview(id) {
  await init()
  await sql`DELETE FROM reviews WHERE id = ${id}`
}

// Records a hit and returns how many hits this key made in the window (including this one).
export async function countHit(bucket, key, windowMs) {
  await init()
  const [row] = await sql`
    WITH ins AS (INSERT INTO rate_limits (bucket, key) VALUES (${bucket}, ${key}))
    SELECT count(*)::int AS n FROM rate_limits
    WHERE bucket = ${bucket} AND key = ${key} AND created_at > now() - make_interval(secs => ${windowMs / 1000})`
  // The CTE's insert is invisible to the count in the same statement, so add this hit.
  if (Math.random() < 0.02) await sql`DELETE FROM rate_limits WHERE created_at < now() - interval '1 day'`
  return row.n + 1
}

export const MAX_FEATURED = 4

// Only approved reviews can be featured, and at most MAX_FEATURED at once (enforced here, not just in the UI).
export async function setFeatured(id, featured) {
  await init()
  if (!featured) {
    await sql`UPDATE reviews SET featured = false WHERE id = ${id}`
    return true
  }
  const rows = await sql`
    UPDATE reviews SET featured = true
    WHERE id = ${id} AND status = 'approved'
      AND (SELECT count(*) FROM reviews WHERE featured AND id <> ${id}) < ${MAX_FEATURED}
    RETURNING id`
  return rows.length > 0
}

export async function listFeatured() {
  await init()
  return sql`SELECT * FROM reviews WHERE featured AND status = 'approved' ORDER BY approved_at DESC NULLS LAST, created_at DESC LIMIT ${MAX_FEATURED}`
}
