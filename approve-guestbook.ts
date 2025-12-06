import Database from "better-sqlite3";

const db = new Database("data.db");

// Duyệt tất cả lời chúc
db.prepare("UPDATE guestbook_entries SET is_approved = 1").run();

console.log("✓ Đã duyệt tất cả lời chúc!");

// Kiểm tra
const guestbook = db.prepare("SELECT * FROM guestbook_entries").all();
console.table(guestbook);

db.close();
