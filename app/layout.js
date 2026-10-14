import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import SITE from '@/lib/site';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://naxatech.org';

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const description =
  'Nigeria-based IT services company delivering web development, cloud solutions, cybersecurity, and digital transformation.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Naxatech | Technology Services for Your Business',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Naxatech',
    title: 'Naxatech | Technology Services for Your Business',
    description,
    locale: 'en_NG',
    images: [{ url: '/logo.png', alt: 'Naxatech' }],
  },
  twitter: {
    card: 'summary',
    title: 'Naxatech | Technology Services for Your Business',
    description,
    images: ['/logo.png'],
  },
};

export const viewport = {
  themeColor: '#080C18',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Naxatech',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: SITE.email[0],
  description,
  address: { '@type': 'PostalAddress', streetAddress: SITE.addresses[0], addressLocality: 'Lagos', addressCountry: 'NG' },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
