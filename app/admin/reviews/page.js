import SiteShell from '@/components/Shell'
import PageHeader from '@/components/PageHeader'
import { adminConfigured, isAdmin } from '@/lib/adminAuth'
import { listReviews, listFeatured, MAX_FEATURED } from '@/lib/db'
import LoginForm from './LoginForm'
import { logout, moderate } from './actions'

export const metadata = { title: 'Review moderation', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const TABS = ['pending', 'approved', 'rejected']

function Shell({ children, title = 'Review moderation', intro }) {
  return (
    <SiteShell>
      <PageHeader eyebrow="Admin" title={title.split(' ')[0]} highlight={title.split(' ').slice(1).join(' ')}>{intro}</PageHeader>
      <section className="bg-slate-100 text-slate-900 px-6 py-14 min-h-[40vh]"><div className="max-w-3xl mx-auto">{children}</div></section>
    </SiteShell>
  )
}

function FeaturedSwitch({ id, on, canTurnOn, approved }) {
  const disabled = !on && (!approved || !canTurnOn)
  const hint = !approved ? 'Approve to feature' : !on && !canTurnOn ? `Limit of ${MAX_FEATURED} reached` : on ? 'Shown on the home page' : 'Show on the home page'
  return (
    <form action={moderate} className="flex items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <button name="action" value={on ? 'unfeature' : 'feature'} role="switch" aria-checked={on} aria-label="Featured on home page" disabled={disabled}
        className={`relative h-6 w-11 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${on ? 'bg-brand' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
      <span className="text-[13px] text-slate-600">Featured on home <span className="text-slate-400">· {hint}</span></span>
    </form>
  )
}

function ActionButton({ id, action, label, className }) {
  return (
    <form action={moderate}>
      <input type="hidden" name="id" value={id} />
      <button name="action" value={action} className={`px-4 py-2 rounded-lg text-[13px] font-semibold ${className}`}>{label}</button>
    </form>
  )
}

export default async function AdminReviews({ searchParams }) {
  if (!adminConfigured()) {
    return <Shell title="Admin setup"><p>Set the <code>ADMIN_PASSWORD</code> environment variable and restart.</p></Shell>
  }
  if (!(await isAdmin())) {
    return <Shell title="Admin sign in"><div className="max-w-sm mx-auto bg-white border border-slate-200 rounded-2xl p-8"><LoginForm /></div></Shell>
  }

  const { status: raw } = await searchParams
  const status = TABS.includes(raw) ? raw : 'pending'
  let rows = []
  let featuredCount = 0
  let dbError = ''
  try {
    rows = await listReviews(status)
    featuredCount = (await listFeatured()).length
  } catch (e) {
    dbError = e.message
  }

  return (
    <Shell intro="Approve, reject or delete reviews submitted through the website.">
      <div className="flex justify-end mb-4">
        <form action={logout}><button className="text-[13px] text-slate-500 underline">Sign out</button></form>
      </div>
      <nav className="flex gap-2 mb-6" aria-label="Review status">
        {TABS.map(t => (
          <a key={t} href={`/admin/reviews?status=${t}`} aria-current={t === status ? 'page' : undefined}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold capitalize ${t === status ? 'bg-brand text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>{t}</a>
        ))}
      </nav>

      <p className="text-[13px] text-slate-600 mb-4" aria-live="polite">Featured on the home page: <b>{featuredCount}</b> of {MAX_FEATURED}. If none are featured, the home page shows the newest testimonials.</p>

      {dbError && <p role="alert" className="bg-red-50 text-red-700 rounded-lg p-4 mb-4 text-[14px]">Database error: {dbError}</p>}
      {!dbError && rows.length === 0 && <p className="text-slate-500">No {status} reviews.</p>}

      <ul className="space-y-4">
        {rows.map(r => (
          <li key={r.id} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-semibold">{r.name}{r.role && <span className="font-normal text-slate-500"> · {r.role}</span>}</p>
                <p className="text-[13px] text-slate-500"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a> · {new Date(r.created_at).toLocaleString('en-GB')}</p>
              </div>
              <span className="text-amber-500 text-lg whitespace-nowrap" role="img" aria-label={`${r.rating} out of 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p className="text-[15px] leading-relaxed whitespace-pre-line mb-5">{r.review}</p>
            <div className="mb-4 pb-4 border-b border-slate-100">
              <FeaturedSwitch id={r.id} on={r.featured} approved={r.status === 'approved'} canTurnOn={featuredCount < MAX_FEATURED} />
            </div>
            <div className="flex flex-wrap gap-2">
              {r.status !== 'approved' && <ActionButton id={r.id} action="approved" label="Approve" className="bg-brand text-white" />}
              {r.status !== 'rejected' && <ActionButton id={r.id} action="rejected" label="Reject" className="bg-slate-200 text-slate-800" />}
              {r.status !== 'pending' && <ActionButton id={r.id} action="pending" label="Move to pending" className="bg-slate-200 text-slate-800" />}
              <ActionButton id={r.id} action="delete" label="Delete" className="bg-red-50 text-red-700" />
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  )
}
