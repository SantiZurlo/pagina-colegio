import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
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
      <AboutSection />
      <ValoresSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default Home