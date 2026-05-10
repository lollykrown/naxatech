import { Syne, Outfit } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Naxatech | Technology Services for Your Business',
  description:
    'Nigeria-based IT services company delivering web development, cloud solutions, cybersecurity, and digital transformation.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
