export default function PageHeader({ eyebrow, title, highlight, children }) {
  return (
    <header className="relative bg-ink pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase mb-4">{eyebrow}</p>
        <h1 className="font-display font-extrabold text-white text-[44px] lg:text-[64px] leading-[1.05] tracking-tight mb-5">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>
        {children && <p className="text-slate-body text-[16px] leading-relaxed max-w-2xl">{children}</p>}
      </div>
    </header>
  )
}
