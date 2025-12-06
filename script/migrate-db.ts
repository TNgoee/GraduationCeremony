import sql from "mssql";
import { users, rsvps, guestbookEntries, galleryImages } from "../shared/schema";

console.log("🔄 Starting database migration...");

// SQL Server connection config
const server = process.env.DB_SERVER || "localhost\\SQLEXPRESS";
const config: sql.config = {
  server: server,
  database: process.env.DB_NAME || "Graduation",
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    trustServerCertificate: true,
    encrypt: false,
    connectTimeout: 45000,
    requestTimeout: 45000,
    enableKeepAlive: true,
  },
};

console.log("📍 Server:", config.server);
console.log("📍 Database:", config.database);
console.log("📍 Using authentication:", process.env.DB_USER ? "SQL Server Auth" : "Trusted Connection");

const pool = new sql.ConnectionPool(config);

// Define tables with SQL Server syntax
const tables = [
  {
    name: "users",
    sql: `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
      CREATE TABLE [users] (
        [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
        [username] TEXT NOT NULL UNIQUE,
        [password] TEXT NOT NULL
      )
    `,
  },
  {
    name: "rsvps",
    sql: `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='rsvps' and xtype='U')
      CREATE TABLE [rsvps] (
        [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
        [name] TEXT NOT NULL,
        [email] TEXT NOT NULL,
        [phone] TEXT,
        [status] TEXT NOT NULL DEFAULT 'pending',
        [number_of_guests] INT DEFAULT 1,
        [dietary_restrictions] TEXT,
        [special_requests] TEXT,
        [created_at] DATETIME2 DEFAULT GETDATE(),
        [updated_at] DATETIME2 DEFAULT GETDATE()
      )
    `,
  },
  {
    name: "guestbook_entries",
    sql: `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='guestbook_entries' and xtype='U')
      CREATE TABLE [guestbook_entries] (
        [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
        [name] TEXT NOT NULL,
        [message] TEXT NOT NULL,
        [email] TEXT,
        [is_approved] BIT DEFAULT 0,
        [created_at] DATETIME2 DEFAULT GETDATE()
      )
    `,
  },
  {
    name: "gallery_images",
    sql: `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='gallery_images' and xtype='U')
      CREATE TABLE [gallery_images] (
        [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
        [title] TEXT NOT NULL,
        [description] TEXT,
        [image_url] TEXT NOT NULL,
        [thumbnail_url] TEXT,
        [category] TEXT DEFAULT 'general',
        [uploaded_by] TEXT,
        [created_at] DATETIME2 DEFAULT GETDATE()
      )
    `,
  },
];

async function migrateDatabase() {
  try {
    console.log("📡 Connecting to SQL Server...");
    await pool.connect();
    console.log("✓ Connected to SQL Server");

    for (const table of tables) {
      try {
        console.log(`⏳ Creating table '${table.name}'...`);
        await pool.request().query(table.sql);
        console.log(`✓ Table '${table.name}' created/verified`);
      } catch (error: any) {
        console.error(`✗ Error creating table '${table.name}':`, error.message);
      }
    }

    console.log("\n✅ Database migration completed successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Connection failed:", error.message);
    process.exit(1);
  } finally {
    try {
      await pool.close();
      console.log("Disconnected from SQL Server");
    } catch (e) {
      console.error("Error closing connection:", e);
    }
  }
}

migrateDatabase();
