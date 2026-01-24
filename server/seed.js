require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

// Connect to Local DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🌱 Connected to DB for Seeding..."))
  .catch(err => console.log(err));

const projects = [
  {
    title: "Connect Music",
    description: "A web app that allows users to transfer music playlists seamlessly between Spotify and YouTube. Implemented secure authentication using OAuth 2.0 and achieved 95% transfer accuracy using fuzzy matching.",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "OAuth", "Spotify API"],
    category: "WEB",
    liveLink: "", // Add if you have one
    githubLink: "https://github.com/WhiteDevilCoder" 
  },
  {
    title: "Decentralized Supply Chain",
    description: "A transparent supply chain solution tracking product movement from manufacturer to consumer. Used smart contracts to record production, shipping, and delivery events on the blockchain.",
    techStack: ["Solidity", "React.js", "Web3.js", "Ethereum", "Truffle"],
    category: "BLOCKCHAIN",
    liveLink: "",
    githubLink: "https://github.com/WhiteDevilCoder"
  },
  {
    title: "Decentralized Social Media",
    description: "Censorship-resistant social media DApp where users create and interact with posts stored on the blockchain. Integrated IPFS for decentralized media storage.",
    techStack: ["React.js", "Solidity", "Ether.js", "IPFS", "Hardhat"],
    category: "BLOCKCHAIN",
    liveLink: "",
    githubLink: "https://github.com/WhiteDevilCoder"
  },
  {
    title: "Dark Theme Extension",
    description: "Browser extension to apply dark mode on websites with customizable brightness and contrast. Used content scripts for real-time theme injection.",
    techStack: ["JavaScript", "HTML5", "CSS3"],
    category: "WEB",
    liveLink: "",
    githubLink: "https://github.com/WhiteDevilCoder"
  }
];

const seedDB = async () => {
  await Project.deleteMany({}); // Clears old data so we don't have duplicates
  await Project.insertMany(projects);
  console.log("✅ Resume Projects Added to Database!");
  mongoose.connection.close();
};

seedDB();