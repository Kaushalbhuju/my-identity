import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Photography from './components/Photography';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import MouseSpotlight from './components/ui/MouseSpotlight';

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-200 noise-overlay">
      <MouseSpotlight />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Photography />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
