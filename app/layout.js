import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
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
  'Nigeria-based IT services company delivering software development (web, mobile and backend), cybersecurity, IT consulting and ICT support.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Naxatech | Technology Services for Your Business',
  description,
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  icons: { apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Naxatech',
    title: 'Naxatech | Technology Services for Your Business',
    description,
    locale: 'en_NG',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'The Naxatech team at work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naxatech | Technology Services for Your Business',
    description,
    images: ['/og.jpg'],
  },
};

export const viewport = {
  themeColor: '#080C18',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="font-body">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-acid focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
