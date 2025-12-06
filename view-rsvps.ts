import "dotenv/config";
import { connectDB } from "./server/db";
import { COLLECTIONS } from "./shared/schema";

async function viewRSVPs() {
  try {
    const db = await connectDB();
    
    console.log("\n=== DANH SÁCH RSVP ĐÃ ĐĂNG KÝ ===\n");
    
    const rsvps = await db
      .collection(COLLECTIONS.RSVPS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    if (rsvps.length === 0) {
      console.log("Chưa có ai đăng ký RSVP.");
    } else {
      console.table(rsvps);
      console.log(`\nTổng cộng: ${rsvps.length} người đăng ký`);
      
      const totalGuests = rsvps.reduce((sum: number, rsvp: any) => sum + (rsvp.numberOfGuests || 1), 0);
      console.log(`Tổng số khách: ${totalGuests} người\n`);
    }
  } catch (error) {
    console.error("Lỗi khi xem RSVPs:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

viewRSVPs();
