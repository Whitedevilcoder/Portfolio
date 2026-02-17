import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to your backend
      // NOTE: Make sure this URL matches your backend (localhost or Render)
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      
      // Save the "VIP Badge" (Token) in your browser's local storage
      localStorage.setItem('token', res.data.token);
      
      // Redirect to the Admin Dashboard (we will build this next)
      navigate('/dashboard');
      
    } catch (err) {
      setError('Invalid Credentials. Access Denied. ❌');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center text-white font-mono">
      <div className="border border-gray-700 p-8 bg-cyber-gray w-96 shadow-[0_0_20px_rgba(192,132,252,0.2)]">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyber-purple">&lt;Admin /&gt;</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">USERNAME</label>
            <input 
              type="text" 
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
            <input 
              type="password" 
              className="w-full bg-black border border-gray-700 p-2 text-white focus:border-cyber-purple outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-cyber-purple text-black font-bold py-2 mt-4 hover:bg-white transition-colors"
          >
            ENTER SYSTEM &gt;
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;