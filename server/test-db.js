require('dotenv').config();
const mongoose = require('mongoose');

console.log("🔍 Testing connection to:", process.env.MONGO_URI.split('@')[1]); // Logs host only for safety

async function test() {
    try {
        // We add a timeout so the script doesn't hang forever if the network is blocking it
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 
        });
        
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        
        // Check if we can actually "see" the database
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const info = await admin.buildInfo();
        console.log("📁 MongoDB Version:", info.version);

        await mongoose.disconnect();
        console.log("👋 Disconnected safely.");
    } catch (err) {
        console.error("❌ CONNECTION FAILED!");
        console.error("Error Name:", err.name);
        console.error("Message:", err.message);
        
        if (err.message.includes('querySrv ESERVFAIL') || err.message.includes('ECONNREFUSED')) {
            console.log("\n💡 DIAGNOSIS: This is a DNS or Firewall issue.");
            console.log("1. Check if your IP is whitelisted in Atlas (Network Access).");
            console.log("2. Try switching your WiFi or using a mobile hotspot.");
        }
    }
}

test();