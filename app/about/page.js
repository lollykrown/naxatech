import Link from 'next/link'
import Shell from '@/components/Shell'
import PageHeader from '@/components/PageHeader'
import CTA from '@/components/CTA'
import JsonLd from '@/components/JsonLd'
import { breadcrumbs } from '@/lib/jsonld'
import { about, values } from '@/lib/content'

export const metadata = {
  title: 'About Us | Naxatech',
  description:
    'NAXATECH is a fast growing world-wide information and technology company formed by highly skilled, innovative and experienced tech experts, registered in Nigeria and the United Kingdom.',
  alternates: { canonical: '/about' },
}

function Eyebrow({ children }) {
  return <p className="text-amber-700 text-[11px] font-display font-bold tracking-[0.2em] uppercase mb-3">{children}</p>
}

export default function AboutPage() {
  return (
    <Shell>
      <JsonLd data={breadcrumbs([['About Us', '/about']])} />
      <PageHeader eyebrow="About Us" title="A World-Wide" highlight="IT Company">
        {about.intro}
      </PageHeader>

      {/* Story + offer */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-display font-extrabold text-[32px] lg:text-[40px] leading-tight text-slate-900 mb-6">
              Formed by tech experts
            </h2>
            <div className="space-y-4 text-slate-600 text-[15px] leading-loose">
              {about.story.map(p => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div>
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="font-display font-extrabold text-[32px] lg:text-[40px] leading-tight text-slate-900 mb-6">
              Your partner for information technology services
            </h2>
            <div className="space-y-4 text-slate-600 text-[15px] leading-loose">
              {about.offer.map(p => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Eyebrow>Our Mission</Eyebrow>
          <p className="font-display font-bold text-[22px] lg:text-[28px] leading-snug text-slate-900">{about.mission}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <Eyebrow>Our Values</Eyebrow>
            <p className="text-slate-600 text-[15px] max-w-2xl mx-auto">{about.valuesIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="group border border-slate-200 bg-white hover:bg-brand transition-colors duration-300 rounded-xl p-7">
                <h3 className="font-display font-bold text-[18px] text-slate-900 group-hover:text-white transition-colors mb-2">{v.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-500 group-hover:text-white/90 transition-colors">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-extrabold text-[28px] lg:text-[36px] leading-tight text-slate-900 mb-4">
            Are you starting your career in tech, or want to transition into it?
          </h2>
          <p className="text-slate-600 text-[15px] mb-8">
            We are enthusiastic about helping our clients achieve their goals, especially when it comes to IT services.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded hover:bg-yellow-300 transition-colors">
            Join our community
          </Link>
        </div>
      </section>
      <CTA />
    </Shell>
  )
}
