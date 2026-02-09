import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Requires react-icons

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-cyber-black py-8 mt-20">
      <div className="max-w-7xl mx-auto px-8 md:px-32 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <span className="text-cyber-purple font-bold">&lt;Praveen /&gt;</span>
            <span className="text-gray-400 text-sm">praveen@portfolio.com</span>
          </div>
          <p className="text-gray-500 text-xs">Web Designer and Full-Stack Developer</p>
        </div>

        {/* Right Side: Copyright & Socials */}
        <div className="text-center md:text-right">
          <h3 className="text-white font-bold text-lg mb-2">Media</h3>
          <div className="flex gap-4 justify-center md:justify-end text-gray-400">
            <a href="https://github.com/Whitedevilcoder" className="hover:text-cyber-purple transition-colors"><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/praveen-kumar6405/" className="hover:text-cyber-purple transition-colors"><FaLinkedin size={20} /></a>
            <a href="https://x.com/PraveenKumar680" className="hover:text-cyber-purple transition-colors"><FaTwitter size={20} /></a>
            <a href="https://www.instagram.com/itzspraveenhere/" className="hover:text-cyber-purple transition-colors"><FaInstagram size={20} /></a>
          </div>
          <p className="text-gray-600 text-xs mt-4">© Copyright 2026. Made by Praveen.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;