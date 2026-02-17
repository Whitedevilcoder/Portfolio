import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Fetch Projects on Load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects`)
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // 2. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Show the VIP Badge
      });
      // Remove from list immediately
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to delete. You might need to log in again.");
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white font-mono p-8 pt-24 relative z-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-cyber-purple">/Admin/Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500/10 text-red-500 px-4 py-2 border border-red-500 hover:bg-red-500 hover:text-white transition-all">
          Logout
        </button>
      </div>

      {/* Projects List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl mb-6">Current Projects ({projects.length})</h2>
        
        {loading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project._id} className="bg-cyber-gray p-4 border border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.category}</p>
                </div>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                >
                  Delete X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;