// Builders for schema.org JSON-LD. Contact details come from lib/site.js.
import SITE from '@/lib/site'
import { services } from '@/lib/content'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://naxatech.org'

const COUNTRY_CODES = { Nigeria: 'NG', 'United Kingdom': 'GB' }

const description =
  'Naxatech is an IT services company registered in Nigeria and the United Kingdom, delivering software development (web, mobile and backend), cybersecurity, IT consulting and ICT support.'

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Naxatech',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og.jpg`,
  description,
  email: SITE.email,
  telephone: [...SITE.phoneNigeria.split(',').map(n => n.trim()), SITE.phoneUk],
  sameAs: [SITE.instagram, SITE.x],
  areaServed: SITE.country.map(name => ({ '@type': 'Country', name })),
  address: SITE.addresses.map((streetAddress, i) => ({
    '@type': 'PostalAddress',
    streetAddress,
    addressCountry: COUNTRY_CODES[SITE.country[i]],
  })),
  knowsAbout: services.map(s => s.title),
}

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Naxatech',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

// crumbs: [[name, path], ...] after Home.
export const breadcrumbs = crumbs => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...crumbs].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path === '/' ? '' : path}`,
  })),
})

export const serviceList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.desc,
      serviceType: s.title,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: SITE.country.map(name => ({ '@type': 'Country', name })),
    },
  })),
}
