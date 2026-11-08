import Shell from '@/components/Shell'
import PageHeader from '@/components/PageHeader'
import ServicesList from '@/components/ServicesList'
import CTA from '@/components/CTA'
import JsonLd from '@/components/JsonLd'
import { breadcrumbs, serviceList } from '@/lib/jsonld'

export const metadata = {
  title: 'Services | Naxatech',
  description:
    'Software development (web, mobile and backend), ERP consulting, e-invoicing integration, cyber security, ICT support, IT consulting, penetration testing and product services from Naxatech.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <Shell>
      <JsonLd data={[breadcrumbs([['Services', '/services']]), serviceList]} />
      <PageHeader eyebrow="Our Services" title="Explore Our" highlight="Services">
        Welcome to the NAXATECH services page. Here you get a look and feel of all our services. Our skilled team
        excels in crafting and delivering top-notch services to meet our clients' specific requirements.
      </PageHeader>
      <ServicesList />
      <CTA />
    </Shell>
  )
}
