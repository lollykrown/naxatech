'use client'
import { useActionState } from 'react'
import { login } from './actions'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null)
  return (
    <form action={action} className="space-y-4">
      <label htmlFor="password" className="block text-[13px] font-semibold text-slate-700">Admin password</label>
      <input id="password" name="password" type="password" required autoComplete="current-password"
        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
      {state?.error && <p role="alert" className="text-red-600 text-[13px]">{state.error}</p>}
      <button disabled={pending} className="w-full bg-brand text-white font-semibold rounded-lg py-3 disabled:opacity-60">
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
