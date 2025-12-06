import Database from "better-sqlite3";
import path from "path";

// Path tới database của bạn
const dbPath = path.join(process.cwd(), "data.db");
const db = new Database(dbPath);

console.log("🔄 Resetting database...");

db.exec(`
  DELETE FROM rsvps;
  DELETE FROM guestbook_entries;
  DELETE FROM gallery_images;

  -- Reset AUTOINCREMENT
  DELETE FROM sqlite_sequence WHERE name IN ('rsvps', 'guestbook_entries', 'gallery_images');
`);

console.log("✓ Database reset hoàn tất!");
