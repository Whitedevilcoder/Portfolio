import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { category: "Languages", items: ["JavaScript (ES6+)", "Solidity", "Python", "C++"] },
    { category: "MERN Stack", items: ["MongoDB", "Express.js", "React.js", "Node.js"] },
    { category: "Blockchain", items: ["Hardhat", "Ethers.js", "IPFS", "Smart Contracts"] },
    { category: "Tools", items: ["Git/GitHub", "Docker", "VS Code", "Figma"] }
  ];

  const funFacts = [
    "I own a goldfish 🐠",
    "I'm building an AI named ISABELLE 🤖",
    "I love decentralized tech 🔗",
    "I live in Bhilai, India 🇮🇳"
  ];

  return (
    <section id="about-me" className="py-20 px-8 md:px-32 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white"><span className="text-cyber-purple">/</span>about-me</h2>
        <div className="h-px w-32 bg-cyber-purple/50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Column: Bio */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-gray-400 font-mono space-y-6"
        >
          <p>
            Hello, I'm <span className="text-white">Praveen</span>!
          </p>
          <p>
            I’m a self-taught full-stack developer based in Bhilai, Chhattisgarh. 
            I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
          </p>
          <p>
            Transforming my creativity and knowledge into a websites has been my passion for over a year. 
            I have been helping various clients to establish their presence online. 
            I always strive to learn about the newest technologies and frameworks.
          </p>
        </motion.div>

        {/* Right Column: Skills & Fun Facts */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          {/* Skills Grid */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6"><span className="text-cyber-purple">#</span>skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="border border-gray-700 p-4 hover:border-cyber-purple transition-colors">
                  <h4 className="text-white font-bold mb-2 text-sm">{skillGroup.category}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {skillGroup.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div>
             <h3 className="text-xl font-bold text-white mb-6"><span className="text-cyber-purple">#</span>my-fun-facts</h3>
             <div className="flex flex-wrap gap-2">
               {funFacts.map((fact) => (
                 <span key={fact} className="border border-gray-700 text-gray-400 px-3 py-1 text-sm hover:text-white hover:border-cyber-purple transition-colors cursor-default">
                   {fact}
                 </span>
               ))}
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;