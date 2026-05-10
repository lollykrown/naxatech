'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const reasons = [
  {
    num: '01',
    title: 'Local Expertise, Global Standards',
    desc: 'We understand the Nigerian market — its infrastructure, regulations, and nuances — while delivering solutions at international quality levels.',
  },
  {
    num: '02',
    title: 'Dedicated Project Teams',
    desc: 'Your project gets a named team: a project manager, tech lead, and engineers who own your outcome from kickoff to deployment.',
  },
  {
    num: '03',
    title: 'Agile & Transparent Process',
    desc: 'Weekly sprints, live dashboards, and honest status updates. You always know where your project stands.',
  },
  {
    num: '04',
    title: 'Post-Launch Support',
    desc: '90-day warranty on all projects, plus flexible retainer plans for ongoing support, updates, and infrastructure management.',
  },
  {
    num: '05',
    title: 'Affordable Without Compromise',
    desc: 'Competitive pricing structured for Nigerian businesses. We offer instalment payment plans and flexible engagement models.',
  },
];

export default function WhyUs() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" ref={ref} className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-glow-sm opacity-30 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: heading + image */}
          <div>
            <div className="reveal flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-orange" />
              <span className="text-orange text-[11px] font-bold tracking-[0.25em] uppercase">Why Naxatech</span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-8">
              The Partner That<br />
              <span className="text-orange">Actually Delivers</span>
            </h2>

            <div className="reveal reveal-delay-2 relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl shadow-black/40">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80"
                alt="Team collaboration"
                width={600}
                height={380}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-ink-4/90 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange/15 border border-orange/25 flex items-center justify-center text-orange shrink-0">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-text font-semibold text-sm">Trusted by 50+ businesses</p>
                  <p className="text-slate-muted text-[12px]">Across fintech, healthcare, logistics, and more</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: reasons list */}
          <div className="space-y-0">
            {reasons.map((r, i) => (
              <div
                key={r.num}
                className={`reveal reveal-delay-${i + 1} group border-b border-white/[0.05] py-7 flex gap-5 items-start hover:bg-ink-2 hover:px-4 rounded-xl transition-all duration-300 cursor-default`}
              >
                <span className="font-display font-black text-[13px] text-orange/50 group-hover:text-orange transition-colors mt-0.5 shrink-0 w-7">
                  {r.num}
                </span>
                <div>
                  <h4 className="font-display font-bold text-[16px] text-slate-text mb-1.5 group-hover:text-white transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-slate-muted text-[13px] leading-relaxed">{r.desc}</p>
                </div>
                <svg
                  className="ml-auto shrink-0 text-slate-dim group-hover:text-orange transition-colors mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
