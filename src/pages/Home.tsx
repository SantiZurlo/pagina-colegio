import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import NewsSection from '../components/NewsSection'
import AboutSection from '../components/AboutSection'
import TeachersSection from '../components/TeacherSection'
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
      <TeachersSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default Home