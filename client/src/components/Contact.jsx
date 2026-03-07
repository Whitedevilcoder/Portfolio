import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import API_URL from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // To show success/error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await axios.post(`${ API_URL }/api/contact`, formData);
      setStatus('Message Transmitted Successfully! ✅');
      setFormData({ name: '', email: '', message: '' }); // Clear form immediately

      // RESET BUTTON AFTER 3 SECONDS
      setTimeout(() => {
        setStatus('');
      }, 3000);

    } catch (err) {
      setStatus('Transmission Failed. Try again. ❌');

      // RESET BUTTON AFTER 3 SECONDS (So they can try again)
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  };

  return (
    <section id="contacts" className="py-20 px-8 md:px-32 max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-white">
            Let's <span className="text-cyber-purple">Connect</span>
          </h2>
          <p className="text-gray-400 font-mono">
            Have a project in mind? Want to collaborate on a DApp? Or just want to say hi? Drop a signal into the network.
          </p>

          <div className="border border-gray-700 p-6 bg-cyber-gray/50 font-mono text-sm space-y-4">
            <p className="text-cyber-green">&gt; System Status: Online</p>
            <p className="text-gray-400">&gt; Location: Remote / Earth</p>
            <p className="text-gray-400">&gt; Response Time: &lt; 24h</p>
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name Input */}
          <div>
            <label className="block text-cyber-purple font-mono text-sm mb-2">/User/Name</label>
            <input
              type="text"
              required
              className="w-full bg-black border border-gray-700 p-3 text-white focus:border-cyber-purple focus:outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-cyber-purple font-mono text-sm mb-2">/User/Email</label>
            <input
              type="email"
              required
              className="w-full bg-black border border-gray-700 p-3 text-white focus:border-cyber-purple focus:outline-none transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-cyber-purple font-mono text-sm mb-2">/Message/Content</label>
            <textarea
              rows="5"
              required
              className="w-full bg-black border border-gray-700 p-3 text-white focus:border-cyber-purple focus:outline-none transition-colors"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyber-purple/10 border border-cyber-purple text-cyber-purple py-3 font-mono hover:bg-cyber-purple hover:text-black transition-all"
          >
            {status ? status : "Send Transmission >"}
          </button>
        </motion.form>

      </div>
    </section>
  );
};

export default Contact;