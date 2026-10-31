import { MongoClient } from 'mongodb';

// Uses standard MONGODB_URI to keep your password secure
const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export default async function handler(req, res) {
  try {
    const database = (await clientPromise).db("portfolio");
    const projects = await database.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Serverless Error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}