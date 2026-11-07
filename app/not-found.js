import Link from 'next/link'

export const metadata = {
  title: 'Page not found | Naxatech',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex items-center justify-center bg-ink px-6 text-center">
      <div>
        <p className="font-display font-bold text-acid text-[12px] tracking-[0.2em] uppercase mb-4">Error 404</p>
        <h1 className="font-display font-extrabold text-white text-[44px] lg:text-[64px] leading-none mb-6">
          Page not found
        </h1>
        <p className="text-slate-body text-[16px] max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has moved. Head back home or get in touch and we'll help.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="px-7 py-3.5 bg-acid text-ink font-display font-bold text-[14px] rounded hover:bg-yellow-300">
            Back to home
          </Link>
          <Link href="/#contact" className="px-7 py-3.5 border border-white/20 text-white font-display font-semibold text-[14px] rounded hover:border-acid">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  )
}
