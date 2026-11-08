import Image from 'next/image'
import clients from '@/lib/clients'

function Logo({ client, hidden = false }) {
  return (
    <li aria-hidden={hidden || undefined}
      className="shrink-0 mr-6 w-40 sm:w-44 aspect-[3/2] rounded-xl overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Image src={client.logo} alt={hidden ? '' : client.name} width={480} height={320}
        sizes="176px" className="h-full w-full object-cover" />
    </li>
  )
}

export default function TrustedBy() {
  if (!clients.length) return null

  return (
    <section aria-labelledby="trusted-by" className="relative bg-white py-14 overflow-hidden border-b border-slate-200">
      <h2 id="trusted-by" className="text-center font-display font-bold text-[12px] tracking-[0.25em] uppercase text-slate-500 mb-8">
        Trusted by
      </h2>

      {/* Marquee: the list is rendered twice so the loop is seamless. Pauses on hover, static grid for reduced motion. */}
      <div className="group relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
        <ul className="flex w-max animate-marquee [animation-duration:40s] group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6 motion-reduce:gap-y-6">
          {clients.map(c => <Logo key={c.name} client={c} />)}
          {clients.map(c => <Logo key={`${c.name}-dup`} client={c} hidden />)}
        </ul>
      </div>
    </section>
  )
}
