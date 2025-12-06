import "dotenv/config";

console.log("🔍 Kiểm tra MongoDB Connection String...\n");

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI không được tìm thấy!");
  process.exit(1);
}

// Hide password for security
const uriForLog = uri.replace(/:[^:@]+@/, ":****@");
console.log(`📋 MONGODB_URI: ${uriForLog}`);

if (uri.includes("localhost") || uri.includes("127.0.0.1")) {
  console.log("⚠️  WARNING: Đang sử dụng MongoDB local!");
} else if (uri.includes("mongodb+srv://") || uri.includes("mongodb.net")) {
  console.log("✅ Đang sử dụng MongoDB Atlas (Cloud)");
} else {
  console.log("ℹ️  Connection string không rõ ràng");
}

console.log(`\n📋 Database name: ${process.env.MONGODB_DB_NAME || "graduation_ceremony"}`);

