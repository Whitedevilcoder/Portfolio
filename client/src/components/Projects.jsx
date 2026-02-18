import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  // --- FETCH LOGIC ---
  useEffect(() => {
    // Minimum 1.5s load time for the cool animation
    const timer = new Promise(resolve => setTimeout(resolve, 1500));
    const fetcher = axios.get(`${API_URL}/api/projects`);

    Promise.all([timer, fetcher])
      .then(([_, res]) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return filter === 'ALL' 
      ? projects 
      : projects.filter(p => p.category === filter);
  }, [filter, projects]);

  return (
    <section id="works" className="py-20 px-8 md:px-32 max-w-7xl mx-auto min-h-screen bg-cyber-black relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white"><span className="text-cyber-purple">/</span>projects</h2>
          <div className="h-px w-32 bg-cyber-purple/50"></div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8 font-mono text-sm overflow-x-auto pb-2">
        {['ALL', 'WEB', 'AI', 'BLOCKCHAIN'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1 border transition-all whitespace-nowrap ${
              filter === cat 
                ? 'border-cyber-purple text-cyber-purple' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- CONTENT AREA --- */}
      <AnimatePresence mode='wait'>
        {loading ? (
          /* LOADING SCREEN */
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-64 space-y-6"
          >
            <div className="w-16 h-16 border-4 border-cyber-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyber-purple font-mono text-sm animate-pulse text-center leading-relaxed">
              &gt; Establishing Uplink to Server... <br />
              Hacking the server to show the details of the projects
            </p>
            <p className="text-gray-600 font-mono text-xs">
              (This may take 30s for the first connection)
            </p>
          </motion.div>
        ) : (
          /* GRID */
          <motion.div 
            key="grid"
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project._id}
                  layout 
                  /* --- SCROLL ANIMATION RESTORED HERE --- */
                  initial={{ opacity: 0, y: 50 }}         // Start: Invisible and 50px down
                  whileInView={{ opacity: 1, y: 0 }}      // End: Visible and in place
                  viewport={{ once: false, amount: 0.2 }}  // Trigger when 20% visible, only once
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
                  exit={{ opacity: 0, scale: 0.9 }}       // Smooth exit when filtering
                  /* ------------------------------------ */
                  className="border border-gray-700 bg-cyber-gray hover:border-cyber-purple transition-all flex flex-col h-full group overflow-hidden"
                >
                  
                  {/* IMAGE AREA */}
                  <div className="h-48 w-full bg-gray-900 overflow-hidden relative border-b border-gray-700 shrink-0">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
                        <span className="text-cyber-purple font-mono text-2xl font-bold opacity-30">
                          &lt;/{project.category}&gt;
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/80 text-cyber-purple text-xs px-2 py-1 border border-cyber-purple/30 backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-purple transition-colors truncate">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden content-start">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs text-cyber-purple bg-cyber-purple/10 px-2 py-1 rounded border border-cyber-purple/20">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex gap-4 mt-auto pt-4 border-t border-gray-800">
                      <a href={project.liveLink || "#"} target="_blank" rel="noreferrer" className="text-cyber-purple text-sm font-mono hover:underline border border-cyber-purple px-3 py-1 hover:bg-cyber-purple hover:text-black transition-all">
                        Live &lt;~&gt;
                      </a>
                      <a href={project.githubLink || "#"} target="_blank" rel="noreferrer" className="text-gray-500 text-sm font-mono hover:text-white transition-colors flex items-center gap-1">
                        Source &gt;
                      </a>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;