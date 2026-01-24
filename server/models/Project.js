const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  techStack: [{ 
    type: String 
  }], // Example: ["React", "Node.js", "Solidity"]
  category: { 
    type: String, 
    enum: ['WEB', 'BLOCKCHAIN', 'AI', 'IOT'], // Categories based on your interests
    default: 'WEB' 
  },
  liveLink: { type: String },
  githubLink: { type: String },
  image: { 
    type: String,
    default: "https://via.placeholder.com/400x300/000000/ffffff?text=No+Image" // Fallback image
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Project', projectSchema);