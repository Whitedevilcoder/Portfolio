import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import API_URL from '../api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true); // <--- New Loading State

  
  // FETCH DATA FROM YOUR BACKEND
  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)  
      .then(res => {
        setProjects(res.data);
        setLoading(false); // <--- Stop loading when data arrives
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false); // <--- Stop loading even if there is an error
      });
  }, []);

  // Filter Logic
  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="works" className="py-20 px-8 md:px-32 max-w-7xl mx-auto min-h-screen bg-cyber-black">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white"><span className="text-cyber-purple">/</span>projects</h2>
          <div className="h-px w-32 bg-cyber-purple/50"></div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8 font-mono text-sm">
        {['ALL', 'WEB', 'BLOCKCHAIN'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1 border transition-all ${
              filter === cat 
                ? 'border-cyber-purple text-cyber-purple' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- THE LOADING SPINNER SECTION --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-6">
          {/* Spinning Ring */}
          <div className="w-16 h-16 border-4 border-cyber-purple border-t-transparent rounded-full animate-spin"></div>
          
          {/* Typing Text Effect */}
          <p className="text-cyber-purple font-mono text-sm animate-pulse">
            &gt; Establishing Uplink to Server... <br />
            Hacking the server to show the details of the projects 
          </p>
          <p className="text-gray-600 font-mono text-xs">
            (This may take 30s for the first connection)
          </p>
        </div>
      ) : (
        /* --- THE PROJECTS GRID (Only shows when loaded) --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-700 bg-cyber-gray p-6 hover:border-cyber-purple transition-colors flex flex-col h-full group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-purple transition-colors">{project.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-xs text-cyber-purple bg-cyber-purple/10 px-2 py-1 rounded border border-cyber-purple/20">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex gap-4 mt-auto">
                  <a href={project.liveLink || "#"} className="text-cyber-purple text-sm font-mono hover:underline border border-cyber-purple px-3 py-1 hover:bg-cyber-purple hover:text-black transition-all">
                    Live &lt;~&gt;
                  </a>
                  <a href={project.githubLink} className="text-gray-500 text-sm font-mono hover:text-white transition-colors py-1">
                    Source &gt;
                  </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </section>
  );
};

export default Projects;