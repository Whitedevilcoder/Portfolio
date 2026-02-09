import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact'; // <--- Import this

function App() {
  return (
    <div className="bg-cyber-black min-h-screen text-white selection:bg-cyber-purple selection:text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Contact /> {/* <--- Add this line */}
    </div>
  );
}

export default App;