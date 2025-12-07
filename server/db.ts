import "dotenv/config";
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI must be set. Did you forget to provision a database?",
    );
  }

  if (!client) {
    // Log connection info (hide password for security)
    const uriForLog = process.env.MONGODB_URI.replace(/:[^:@]+@/, ":****@");
    console.log(`🔗 Connecting to MongoDB: ${uriForLog}`);
    client = new MongoClient(process.env.MONGODB_URI);
  }

  if (!dbInstance) {
    try {
      if (!client) throw new Error("MongoClient failed to initialize");

      await client.connect();
      const dbName = process.env.MONGODB_DB_NAME || "graduation_ceremony";
      dbInstance = client.db(dbName);
      console.log(`✅ Connected to MongoDB Atlas - Database: ${dbName}`);
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  }
  return dbInstance;
}

export const db = {
  async getDb(): Promise<Db> {
    return await connectDB();
  },
};

export default db;
