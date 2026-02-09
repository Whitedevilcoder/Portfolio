import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';          // <--- New
import Contact from './components/Contact';
import Footer from './components/Footer';        // <--- New
import ScrollToTop from './components/ScrollToTop'; // <--- New
import Background from './components/Background'; // <--- Import


function App() {
  return (
    <div className="bg-cyber-black min-h-screen text-white relative">
      
      {/* The 3D Background (Fixed Position) */}
      <Background /> 

      {/* Your Main Content (Scrollable) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Projects />
        <div className="h-20"></div>
        <About />
        <div className="h-20"></div>
        <Contact />
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
}

export default App;