import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export default async function handler(req, res) {
  try {
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: "MONGODB_URI is missing in Vercel Environment Variables" });
    }

    if (!clientPromise) {
      client = new MongoClient(process.env.MONGODB_URI);
      clientPromise = client.connect();
    }
    
    const database = (await clientPromise).db("portfolio");
    const projects = await database.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
    
    res.status(200).json(projects);
  } catch (error) {
    console.error("Serverless Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}