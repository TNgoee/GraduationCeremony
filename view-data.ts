import Database from "better-sqlite3";

const db = new Database("data.db");

console.log("\n=== RSVPS ===");
const rsvps = db.prepare("SELECT * FROM rsvps").all();
console.table(rsvps);

console.log("\n=== GUESTBOOK ENTRIES ===");
const guestbook = db.prepare("SELECT * FROM guestbook_entries").all();
console.table(guestbook);

console.log("\n=== GALLERY IMAGES ===");
const gallery = db.prepare("SELECT * FROM gallery_images").all();
console.table(gallery);

db.close();
