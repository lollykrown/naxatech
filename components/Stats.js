'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: '+', label: 'Clients Served', desc: 'Across Nigeria and West Africa' },
  { value: 10, suffix: '+', label: 'Years Experience', desc: 'In technology and IT services' },
  { value: 200, suffix: '+', label: 'Projects Delivered', desc: 'On time and within budget' },
  { value: 99, suffix: '%', label: 'Client Satisfaction', desc: 'Based on post-project reviews' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, desc, started }) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="text-center p-8 border-r border-white/[0.05] last:border-r-0">
      <p className="font-display font-black text-5xl md:text-6xl text-orange leading-none mb-2">
        {count}{suffix}
      </p>
      <p className="font-display font-bold text-slate-text text-[15px] mb-1">{label}</p>
      <p className="text-slate-muted text-[12px]">{desc}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-white/[0.05] bg-ink-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-glow opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
