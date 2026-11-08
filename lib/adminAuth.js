// Single-password admin auth: the cookie holds an HMAC of the password, never the password.
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const COOKIE = 'nx_admin'

const token = () => createHmac('sha256', process.env.ADMIN_PASSWORD).update('naxatech-admin-session').digest('hex')

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD)

export function passwordMatches(input) {
  const a = createHmac('sha256', 'cmp').update(String(input)).digest()
  const b = createHmac('sha256', 'cmp').update(process.env.ADMIN_PASSWORD || '').digest()
  return adminConfigured() && timingSafeEqual(a, b)
}

export async function isAdmin() {
  if (!adminConfigured()) return false
  const value = (await cookies()).get(COOKIE)?.value || ''
  const expected = token()
  return value.length === expected.length && timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}

export async function startSession() {
  ;(await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function endSession() {
  ;(await cookies()).delete({ name: COOKIE, path: '/admin' })
}
