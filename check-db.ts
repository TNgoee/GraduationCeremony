import "dotenv/config";
import { connectDB } from "./server/db";
import { COLLECTIONS } from "./shared/schema";

async function checkDatabase() {
  try {
    console.log("🔍 Đang kiểm tra kết nối MongoDB...\n");
    
    const db = await connectDB();
    console.log("✅ Đã kết nối MongoDB thành công!\n");
    
    // Kiểm tra collections
    const collections = await db.listCollections().toArray();
    console.log("📊 Collections có sẵn:", collections.map(c => c.name).join(", ") || "Chưa có collection nào\n");
    
    // Kiểm tra số lượng documents
    const rsvpsCount = await db.collection(COLLECTIONS.RSVPS).countDocuments();
    const guestbookCount = await db.collection(COLLECTIONS.GUESTBOOK_ENTRIES).countDocuments();
    const galleryCount = await db.collection(COLLECTIONS.GALLERY_IMAGES).countDocuments();
    
    console.log(`📝 RSVPs: ${rsvpsCount} bản ghi`);
    console.log(`📝 Guestbook entries: ${guestbookCount} bản ghi`);
    console.log(`📝 Gallery images: ${galleryCount} bản ghi\n`);
    
    if (rsvpsCount === 0 && guestbookCount === 0 && galleryCount === 0) {
      console.log("⚠️  Database chưa có dữ liệu. Hãy thử tạo một số dữ liệu mẫu hoặc thêm dữ liệu qua form trên website.\n");
    }
    
    // Test query
    console.log("🧪 Đang test query...");
    const testRsvps = await db.collection(COLLECTIONS.RSVPS).find({}).limit(1).toArray();
    console.log("✅ Query test thành công!\n");
    
    if (testRsvps.length > 0) {
      console.log("📄 Mẫu dữ liệu RSVP:");
      console.log(JSON.stringify(testRsvps[0], null, 2));
    }
    
  } catch (error) {
    console.error("❌ Lỗi khi kiểm tra database:", error);
    if (error instanceof Error) {
      console.error("Chi tiết:", error.message);
    }
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

checkDatabase();

