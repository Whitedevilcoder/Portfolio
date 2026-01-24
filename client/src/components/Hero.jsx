import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
<section id="home" className="min-h-screen flex flex-col justify-center px-8 md:px-32 relative overflow-hidden pt-20">      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="z-10 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Praveen is a <span className="text-cyber-purple">MERN Stack</span> and <span className="text-cyber-purple">Blockchain</span> Developer.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 font-mono mb-8 max-w-xl"
        >
          He crafts responsive decentralized applications where technologies meet creativity.
        </motion.p>

        <motion.a 
          href="#contacts"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-cyber-purple text-white px-6 py-2 font-mono hover:bg-cyber-purple/20 transition-all inline-block"
        >
          Contact me !!
        </motion.a>
      </div>

      {/* Decorative "Status" Badge */}
      <div className="absolute bottom-10 right-10 border border-gray-700 p-4 bg-cyber-black flex items-center gap-3">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-gray-400 font-mono text-sm">Currently working on Portfolio</span>
      </div>
    </section>
  );
};

export default Hero;