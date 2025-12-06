import Database from "better-sqlite3";
import path from "path";

// Use SQLite for persistent storage
const dbPath = path.join(process.cwd(), "data.db");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    numberOfGuests INTEGER DEFAULT 1,
    dietaryRestrictions TEXT,
    specialRequests TEXT,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS guestbook_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    email TEXT,
    is_approved INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    imageUrl TEXT NOT NULL,
    thumbnailUrl TEXT,
    category TEXT DEFAULT 'general',
    uploadedBy TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("✓ Connected to SQLite database");

export default db;
