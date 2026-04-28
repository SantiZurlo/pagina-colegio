import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import NewsSection from '../components/NewsSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <NewsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default Home