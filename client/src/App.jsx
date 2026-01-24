import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects'; // <--- You have this import

function App() {
  return (
    <div className="bg-cyber-black min-h-screen text-white selection:bg-cyber-purple selection:text-white">
      
      {/* 1. The Navbar */}
      <Navbar />
      
      {/* 2. The Main "Iron Man" Screen */}
      <Hero />

      {/* 3. THIS IS THE MISSING PIECE! */}
      {/* You must put this tag here for the section to appear */}
      <Projects /> 

    </div>
  );
}

export default App;