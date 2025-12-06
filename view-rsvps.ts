import Database from "better-sqlite3";

const db = new Database("data.db");

console.log("\n=== DANH SÁCH RSVP ĐÃ ĐĂNG KÝ ===\n");

const rsvps = db.prepare("SELECT * FROM rsvps ORDER BY createdAt DESC").all();

if (rsvps.length === 0) {
  console.log("Chưa có ai đăng ký RSVP.");
} else {
  console.table(rsvps);
  console.log(`\nTổng cộng: ${rsvps.length} người đăng ký`);
  
  const totalGuests = rsvps.reduce((sum: number, rsvp: any) => sum + (rsvp.numberOfGuests || 1), 0);
  console.log(`Tổng số khách: ${totalGuests} người\n`);
}

db.close();
