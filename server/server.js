require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/Project');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(express.json()); // Allows server to accept JSON data
app.use(cors()); // Allows your frontend (React) to talk to this backend

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- API ROUTES ---

// 1. GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST a new project (We will use this to upload your resume data)
app.post('/api/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    techStack: req.body.techStack,
    category: req.body.category,
    liveLink: req.body.liveLink,
    githubLink: req.body.githubLink,
    image: req.body.image
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST: Receive a new message
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save(); // Save to MongoDB
    res.status(201).json({ message: "Message Sent Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});


app.get('/seed-db', async (req, res) => {
  try {
    // 1. Clear old data
    await Project.deleteMany({});
    
    // 2. The Resume Data
    const sampleProjects = [
       {
        title: "Connect Music",
        description: "A web app that allows users to transfer music playlists seamlessly between Spotify and YouTube. Implemented secure authentication using OAuth 2.0.",
        techStack: ["React.js", "Node.js", "Spotify API"],
        category: "WEB",
        liveLink: "#",
        githubLink: "#"
      },
      {
        title: "Decentralized Supply Chain",
        description: "A transparent supply chain solution tracking product movement from manufacturer to consumer using smart contracts.",
        techStack: ["Solidity", "React.js", "Web3.js"],
        category: "BLOCKCHAIN",
        liveLink: "#",
        githubLink: "#"
      },
      {
        title: "Decentralized Social Media",
        description: "Censorship-resistant social media DApp where users create and interact with posts stored on the blockchain.",
        techStack: ["React.js", "Solidity", "IPFS"],
        category: "BLOCKCHAIN",
        liveLink: "#",
        githubLink: "#"
      },
      {
        title: "Dark Theme Extension",
        description: "Browser extension to apply dark mode on websites with customizable brightness and contrast.",
        techStack: ["JavaScript", "HTML5"],
        category: "WEB",
        liveLink: "#",
        githubLink: "#"
      }
    ];

    // 3. Insert new data
    await Project.insertMany(sampleProjects);
    
    res.send("✅ Database Seeded Successfully!");
  } catch (err) {
    res.status(500).send("❌ Seeding Failed: " + err.message);
  }
});
// -----------------------------

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));