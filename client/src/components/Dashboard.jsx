import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '', // We will split this string into an array later
    liveLink: '',
    githubLink: '',
    image: '', // Just a URL for now
    category: 'WEB'
  });

  // 1. Fetch Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects`);
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // 2. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submit (Add Project)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Convert "React, Node, Mongo" string -> ["React", "Node", "Mongo"] array
      const formattedData = {
        ...formData,
        techStack: formData.techStack.split(',').map(item => item.trim())
      };

      const res = await axios.post(`${API_URL}/api/projects`, formattedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update UI instantly
      setProjects([res.data, ...projects]);
      
      // Clear Form
      setFormData({
        title: '', description: '', techStack: '', liveLink: '', githubLink: '', image: '', category: 'WEB'
      });

      alert("Project Added Successfully! 🚀");

    } catch (err) {
      alert("Error adding project. Check your token!");
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white font-mono p-4 md:p-8 pt-24 relative z-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 border-b border-gray-700 pb-4 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-cyber-purple text-center md:text-left">
          /Admin/Dashboard
        </h1>
        <button onClick={handleLogout} className="text-sm bg-red-500/10 text-red-500 px-4 py-2 border border-red-500 hover:bg-red-500 hover:text-white transition-all w-full md:w-auto">
          Logout
        </button>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      {/* On Mobile: 1 Column. On Desktop: 2 Columns (1fr 2fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: ADD FORM --- */}
        <div className="lg:col-span-1 bg-cyber-gray p-6 border border-gray-700 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4 text-cyber-purple">&lt;Add New /&gt;</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none" />
            
            <select name="category" value={formData.category} onChange={handleChange}
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none">
              <option value="WEB">Web Development</option>
              <option value="BLOCKCHAIN">Blockchain</option>
              <option value="AI">Artificial Intelligence</option>
            </select>

            <textarea name="description" placeholder="Description" rows="3" value={formData.description} onChange={handleChange} required
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none" />

            <input name="techStack" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={handleChange} required
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none" />
            <p className="text-xs text-gray-500">Ex: React, Node, MongoDB</p>

            <input name="image" placeholder="Image URL (https://...)" value={formData.image} onChange={handleChange}
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none" />

            <div className="flex gap-2">
              <input name="liveLink" placeholder="Live Link" value={formData.liveLink} onChange={handleChange}
                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none" />
              <input name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange}
                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none" />
            </div>

            <button type="submit" className="w-full bg-cyber-purple text-black font-bold py-2 hover:bg-white transition-colors">
              PUBLISH PROJECT +
            </button>
          </form>
        </div>

        {/* --- RIGHT COLUMN: PROJECT LIST --- */}
        <div className="lg:col-span-2">
          <h2 className="text-xl mb-6">Existing Projects ({projects.length})</h2>
          
          {loading ? <p className="animate-pulse">Scanning Database...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(project => (
                <div key={project._id} className="bg-cyber-gray p-4 border border-gray-700 hover:border-cyber-purple transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-white group-hover:text-cyber-purple truncate">{project.title}</h3>
                      <span className="text-xs border border-cyber-purple/30 px-2 py-0.5 rounded text-cyber-purple/80">{project.category}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-4 line-clamp-2">{project.description}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="w-full bg-red-500/10 text-red-500 border border-red-500/50 py-1 text-sm hover:bg-red-500 hover:text-white transition-all"
                  >
                    Delete Project
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;