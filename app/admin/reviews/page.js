import { adminConfigured, isAdmin } from '@/lib/adminAuth'
import { listReviews } from '@/lib/db'
import LoginForm from './LoginForm'
import { logout, moderate } from './actions'

export const metadata = { title: 'Review moderation', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const TABS = ['pending', 'approved', 'rejected']

function Shell({ children }) {
  return <main id="main" className="min-h-screen bg-slate-50 text-slate-900 px-4 py-12"><div className="max-w-3xl mx-auto">{children}</div></main>
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
    return <Shell><h1 className="text-2xl font-bold mb-3">Admin not configured</h1><p>Set the <code>ADMIN_PASSWORD</code> environment variable and restart.</p></Shell>
  }
  if (!(await isAdmin())) {
    return <Shell><div className="max-w-sm mx-auto bg-white border border-slate-200 rounded-2xl p-8"><h1 className="text-xl font-bold mb-6">Naxatech admin</h1><LoginForm /></div></Shell>
  }

  const { status: raw } = await searchParams
  const status = TABS.includes(raw) ? raw : 'pending'
  let rows = []
  let dbError = ''
  try {
    rows = await listReviews(status)
  } catch (e) {
    dbError = e.message
  }

  return (
    <Shell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <form action={logout}><button className="text-[13px] text-slate-500 underline">Sign out</button></form>
      </div>
      <nav className="flex gap-2 mb-6" aria-label="Review status">
        {TABS.map(t => (
          <a key={t} href={`/admin/reviews?status=${t}`} aria-current={t === status ? 'page' : undefined}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold capitalize ${t === status ? 'bg-brand text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>{t}</a>
        ))}
      </nav>

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
