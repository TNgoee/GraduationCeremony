import "dotenv/config";
import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "MONGODB_URI must be set. Did you forget to provision a database?",
  );
}

// Log connection info (hide password for security)
const uriForLog = process.env.MONGODB_URI.replace(/:[^:@]+@/, ":****@");
console.log(`🔗 Connecting to MongoDB: ${uriForLog}`);

const client = new MongoClient(process.env.MONGODB_URI);
let dbInstance: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (!dbInstance) {
    await client.connect();
    const dbName = process.env.MONGODB_DB_NAME || "graduation_ceremony";
    dbInstance = client.db(dbName);
    console.log(`✅ Connected to MongoDB Atlas - Database: ${dbName}`);
  }
  return dbInstance;
}

export const db = {
  async getDb(): Promise<Db> {
    return await connectDB();
  },
};

export default db;
