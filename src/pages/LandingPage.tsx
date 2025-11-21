import Header from '../components/landing/Header'
import Hero from '../components/landing/Hero'
import FeatureCards from '../components/landing/FeatureCards'
import Testimonials from '../components/landing/Testimonials'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <Hero />
      <FeatureCards />
      <Testimonials />
      <Footer />
    </div>
  )
}

