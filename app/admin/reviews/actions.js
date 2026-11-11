'use server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { endSession, isAdmin, passwordMatches, startSession } from '@/lib/adminAuth'
import { deleteReview, setFeatured, setReviewStatus } from '@/lib/db'
import { rateLimited } from '@/lib/mail'

export async function login(_prev, formData) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (await rateLimited('admin-login', ip, 5, 15 * 60_000)) return { error: 'Too many attempts. Try again in a few minutes.' }
  if (!passwordMatches(formData.get('password'))) return { error: 'Incorrect password.' }
  await startSession()
  redirect('/admin/reviews')
}

export async function logout() {
  await endSession()
  redirect('/admin/reviews')
}

const refreshSite = () => {
  revalidatePath('/', 'layout')
}

export async function moderate(formData) {
  if (!(await isAdmin())) redirect('/admin/reviews')
  const id = Number(formData.get('id'))
  const action = formData.get('action')
  if (!Number.isInteger(id)) return
  if (action === 'feature' || action === 'unfeature') await setFeatured(id, action === 'feature')
  else if (action === 'delete') await deleteReview(id)
  else if (['approved', 'rejected', 'pending'].includes(action)) await setReviewStatus(id, action)
  refreshSite()
  revalidatePath('/admin/reviews')
}
