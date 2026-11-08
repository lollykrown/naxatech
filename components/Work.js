'use client'
import { useState } from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import projects from '@/lib/projects'

const PREVIEW_TAGS = 5

function Thumbnail({ src, title, live, liveLabel, priority }) {
  const [failed, setFailed] = useState(false)
  // The whole image is clickable when there's a live link. The text link in the card footer
  // gives keyboard and screen-reader users the same destination, so this one is skipped for them.
  const Wrapper = live ? 'a' : 'div'
  const link = live ? { href: live, target: '_blank', rel: 'noopener noreferrer', tabIndex: -1, 'aria-hidden': true } : {}
  return (
    <Wrapper {...link} className="relative block overflow-hidden">
      {failed || !src ? (
        <div className="w-full aspect-[4/3] bg-ink-3 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105" aria-hidden="true">
          <span className="font-display font-black text-[40px] text-acid/80">{title.slice(0, 2).toUpperCase()}</span>
        </div>
      ) : (
        <Image src={src} alt={`${title} screenshot`} width={800} height={600}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          onError={() => setFailed(true)}
          className="w-full aspect-[4/3] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 group-hover:object-bottom" />
      )}
      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      {live && (
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-display font-semibold text-slate-900 shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-acid transition duration-300" aria-hidden="true">
          {liveLabel || 'Visit site'} <ArrowUpRight size={13} />
        </span>
      )}
    </Wrapper>
  )
}

function ProjectCard({ p, i, priority, Heading = 'h3' }) {
  const [open, setOpen] = useState(false)
  const paragraphs = p.longDescription.split('\n').map(s => s.trim()).filter(Boolean)
  const shown = open ? p.tech : p.tech.slice(0, PREVIEW_TAGS)
  const hidden = p.tech.length - PREVIEW_TAGS

  return (
    <m.article
      // Above-the-fold cards render immediately: an opacity-0 start would delay LCP until hydration.
      initial={priority ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
      className="group flex flex-col border border-slate-200 bg-white hover:bg-brand transition-colors duration-300 rounded-xl overflow-hidden">
      <Thumbnail src={p.thumbnail} title={p.title} live={p.live} liveLabel={p.liveLabel} priority={priority} />
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[11px] font-display font-semibold tracking-widest uppercase text-amber-700 group-hover:text-white transition-colors mb-2">
          {p.year} · {p.role}
        </p>
        <Heading className="font-display font-bold text-[18px] text-slate-900 group-hover:text-white transition-colors leading-tight mb-1">
          {p.title}
        </Heading>
        <p className="text-[12px] text-slate-500 group-hover:text-white/90 transition-colors mb-3">
          {p.client}{p.duration ? ` · ${p.duration}` : ''}
        </p>

        <div className="text-[13px] leading-relaxed text-slate-600 group-hover:text-white transition-colors space-y-3 mb-4">
          {open
            ? paragraphs.map((para, k) => <p key={k}>{para}</p>)
            : <p className="line-clamp-4">{paragraphs[0]}</p>}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {shown.map(t => (
            <span key={t} className="px-2 py-0.5 text-[11px] font-display font-semibold rounded bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors">{t}</span>
          ))}
          {!open && hidden > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-display font-semibold text-slate-500 group-hover:text-white transition-colors">+{hidden} more</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 text-[12px] font-display font-semibold">
          <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
            className="text-slate-700 group-hover:text-white underline-offset-4 hover:underline transition-colors">
            {open ? 'Show less' : 'Read more'}
          </button>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-700 group-hover:text-white transition-colors">
              {p.liveLabel || 'Visit site'} <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </m.article>
  )
}

// priorityCount: how many leading images are above the fold (preloaded, not lazy-loaded)
export default function Work({ limit, items, standalone = false, priorityCount = 0 }) {
  if (!projects.length) return null
  const list = items ?? (limit ? projects.slice(0, limit) : projects)
  const hasMore = limit && projects.length > limit

  return (
    <section id="work" className={`${standalone ? 'pb-28 pt-16' : 'py-28'} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {!standalone && (
          <m.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
              <span className="text-amber-700 text-[11px] font-display font-bold tracking-[0.2em] uppercase">Our Work</span>
              <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            </div>
            <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
              <span className="text-slate-900">Projects We're</span><br />
              <span className="text-gradient-light">Proud Of</span>
            </h2>
            <p className="text-slate-600 mt-4 text-[15px] max-w-120 mx-auto leading-relaxed">
              Websites, mobile apps and platforms we've built for clients in Nigeria and the UK.
            </p>
          </m.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {list.map((p, i) => <ProjectCard key={p.title} p={p} i={i} priority={i < priorityCount} Heading={standalone ? 'h2' : 'h3'} />)}
        </div>

        {hasMore && (
          <div className="mt-14 text-center">
            <Link href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded hover:bg-yellow-300 transition-colors">
              View all projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
