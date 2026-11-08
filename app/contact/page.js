import Shell from '@/components/Shell'
import Contact from '@/components/Contact'
import JsonLd from '@/components/JsonLd'
import { breadcrumbs } from '@/lib/jsonld'

export const metadata = {
  title: 'Contact Us | Naxatech',
  description:
    'Tell Naxatech about your project. Get a tailored proposal within 24 hours. Offices in Lagos, Nigeria and Sunderland, UK.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <Shell>
      <JsonLd data={breadcrumbs([['Contact Us', '/contact']])} />
        <header className="relative bg-ink pt-36 pb-16 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase mb-4">Get In Touch</p>
            <h1 className="font-display font-extrabold text-white text-[44px] lg:text-[64px] leading-[1.05] tracking-tight mb-5">
              Start your project <span className="text-gradient">today</span>
            </h1>
            <p className="text-slate-body text-[16px] leading-relaxed max-w-xl">
              Tell us what you need and we'll reply within 24 hours with a tailored proposal.
            </p>
          </div>
        </header>
        <Contact standalone />
    </Shell>
  )
}
