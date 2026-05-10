const items = [
  'Web Development',
  'Mobile Apps',
  'Cloud Infrastructure',
  'Cybersecurity',
  'IT Consulting',
  'Software Engineering',
  'Data Analytics',
  'IT Support',
  'UI/UX Design',
  'DevOps',
  'Network Solutions',
  'Digital Transformation',
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="relative border-y border-white/[0.06] bg-ink-2 py-4 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ink-2 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ink-2 to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-slate-dim px-6">
              {item}
            </span>
            <span className="text-orange text-[8px]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
