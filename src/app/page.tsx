import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 36px 120px' }}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
        <Footer />
      </main>
      <Chatbot />
    </>
  )
}
