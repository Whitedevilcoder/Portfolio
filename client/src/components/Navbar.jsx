import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-cyber-black/90 backdrop-blur-sm border-b border-cyber-gray">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-white font-mono font-bold text-xl flex items-center gap-2"
      >
        <span className="text-cyber-purple">&lt;</span>
        Praveen
        <span className="text-cyber-purple">/&gt;</span>
      </motion.div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 font-mono text-gray-400 text-sm">
        {['#home', '#works', '#about-me', '#contacts'].map((item, i) => (
          <motion.li 
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <a href={item} className="hover:text-white transition-colors">
              <span className="text-cyber-purple">#</span>{item.replace('#', '')}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
