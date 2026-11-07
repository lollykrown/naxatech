import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'

export default function Shell({ children }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <StickyCTA />
    </>
  )
}
