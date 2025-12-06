import "dotenv/config";
import { connectDB } from "./server/db";
import { COLLECTIONS } from "./shared/schema";

async function approveAllGuestbookEntries() {
  try {
    const db = await connectDB();
    
    // Duyệt tất cả lời chúc
    const result = await db
      .collection(COLLECTIONS.GUESTBOOK_ENTRIES)
      .updateMany({}, { $set: { isApproved: true } });
    
    console.log(`✓ Đã duyệt ${result.modifiedCount} lời chúc!`);
    
    // Kiểm tra
    const guestbook = await db
      .collection(COLLECTIONS.GUESTBOOK_ENTRIES)
      .find({})
      .toArray();
    
    console.table(guestbook);
  } catch (error) {
    console.error("Lỗi khi duyệt lời chúc:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

approveAllGuestbookEntries();
