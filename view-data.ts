import "dotenv/config";
import { connectDB } from "./server/db";
import { COLLECTIONS } from "./shared/schema";

async function viewAllData() {
  try {
    const db = await connectDB();
    
    console.log("\n=== RSVPS ===");
    const rsvps = await db.collection(COLLECTIONS.RSVPS).find({}).toArray();
    console.table(rsvps);
    
    console.log("\n=== GUESTBOOK ENTRIES ===");
    const guestbook = await db.collection(COLLECTIONS.GUESTBOOK_ENTRIES).find({}).toArray();
    console.table(guestbook);
    
    console.log("\n=== GALLERY IMAGES ===");
    const gallery = await db.collection(COLLECTIONS.GALLERY_IMAGES).find({}).toArray();
    console.table(gallery);
  } catch (error) {
    console.error("Lỗi khi xem dữ liệu:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

viewAllData();
