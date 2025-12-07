import "dotenv/config";
import { readFileSync } from "fs";
import { resolve } from "path";

console.log("🔍 Testing environment variables...\n");

// Read .env file directly
try {
  const envPath = resolve(process.cwd(), ".env");
  const envContent = readFileSync(envPath, "utf-8");
  console.log("📄 Content of .env file:");
  console.log(envContent);
  console.log("\n");
} catch (error) {
  console.error("❌ Cannot read .env file:", error);
}

// Check environment variables
console.log("🔍 Environment variables in process.env:");
console.log("  MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Not set");
if (process.env.MONGODB_URI) {
  const uriForLog = process.env.MONGODB_URI.replace(/:[^:@]+@/, ":****@");
  console.log("  URI value:", uriForLog);
  
  if (process.env.MONGODB_URI.includes("localhost")) {
    console.log("  ⚠️  WARNING: Using localhost instead of Atlas!");
  } else if (process.env.MONGODB_URI.includes("mongodb+srv://")) {
    console.log("  ✅ Using MongoDB Atlas");
  }
}
console.log("  MONGODB_DB_NAME:", process.env.MONGODB_DB_NAME || "graduation_ceremony (default)");



