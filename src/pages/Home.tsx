import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import NewsSection from '../components/NewsSection'
import AboutSection from '../components/AboutSection'
import ValoresSection from '../components/ValoresSection'
import InstagramSection from '../components/InstagramSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <NewsSection />
      <AboutSection />
      <ValoresSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default Home