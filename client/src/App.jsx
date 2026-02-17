import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Background from './components/Background';
import Login from './components/Login';         // <--- Import Login
import Dashboard from './components/Dashboard'; // <--- Import Dashboard

// 1. We wrap your main page content in a "Home" component
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Projects />
    <div className="h-20"></div>
    <About />
    <div className="h-20"></div>
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <div className="bg-cyber-black min-h-screen text-white relative overflow-x-hidden">
      
      {/* 2. The 3D Background stays visible on ALL pages */}
      <Background /> 

      <ScrollToTop />

      {/* 3. The Router switches the content inside the z-10 wrapper */}
      <div className="relative z-10">
        <Routes>
          {/* If user visits "/", show the Portfolio */}
          <Route path="/" element={<Home />} />
          
          {/* If user visits "/admin", show the Login Screen */}
          <Route path="/admin" element={<Login />} />
          
          {/* If user visits "/dashboard", show the Admin Panel */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;