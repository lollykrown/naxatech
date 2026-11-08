import dynamic from 'next/dynamic'
import Shell from '@/components/Shell'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import JsonLd from '@/components/JsonLd'
import { organization, website } from '@/lib/jsonld'
import { getTestimonials } from '@/lib/testimonials'

// Below-the-fold sections are split into their own chunks (still server-rendered).
const Services = dynamic(() => import('@/components/Services'))
const About = dynamic(() => import('@/components/About'))
const Work = dynamic(() => import('@/components/Work'))
const Process = dynamic(() => import('@/components/Process'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const CTA = dynamic(() => import('@/components/CTA'))
const Contact = dynamic(() => import('@/components/Contact'))

export default async function Home() {
  const testimonials = await getTestimonials()
  return (
    <Shell>
      <JsonLd data={[organization, website]} />
      <Hero />
      <TrustedBy />
      <Services />
      <About />
      <Work limit={3} />
      <Process />
      <Testimonials items={testimonials} />
      <CTA />
      <Contact />
    </Shell>
  )
}
