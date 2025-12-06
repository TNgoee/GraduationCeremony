import sql from "mssql";

console.log("🔄 Starting automatic database creation...\n");

// Connection to master database first to create graduation database
const masterConfig: sql.config = {
  server: "NGOEE\\SQLEXPRESS",
  database: "master",
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
    connectTimeout: 15000,
    requestTimeout: 15000,
    useUTC: false,
  },
};

const dbName = process.env.DB_NAME || "Graduation";

// Define tables
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

async function createDatabase() {
  const masterPool = new sql.ConnectionPool(masterConfig);
  const dbPool = new sql.ConnectionPool({
    ...masterConfig,
    database: dbName,
  });

  try {
    // Connect to master
    console.log("📡 Connecting to master database...");
    await masterPool.connect();
    console.log("✓ Connected to master database\n");

    // Create database if not exists
    console.log(`📁 Creating database '${dbName}' if not exists...`);
    const createDbSql = `
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'${dbName}')
      BEGIN
        CREATE DATABASE [${dbName}];
        PRINT 'Database created: ${dbName}';
      END
      ELSE
      BEGIN
        PRINT 'Database already exists: ${dbName}';
      END
    `;

    await masterPool.request().query(createDbSql);
    console.log(`✓ Database '${dbName}' ready\n`);

    // Close master connection
    await masterPool.close();

    // Wait a bit for database to be ready
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Connect to the new database
    console.log(`📡 Connecting to '${dbName}' database...`);
    await dbPool.connect();
    console.log(`✓ Connected to '${dbName}' database\n`);

    // Create tables
    console.log("📊 Creating tables...\n");
    for (const table of tables) {
      try {
        console.log(`⏳ Creating table '${table.name}'...`);
        await dbPool.request().query(table.sql);
        console.log(`✓ Table '${table.name}' created/verified`);
      } catch (error: any) {
        console.error(`✗ Error creating table '${table.name}':`, error.message);
      }
    }

    console.log("\n✅ Database creation completed successfully!");
    console.log(`\n📍 Database: ${dbName}`);
    console.log("📍 Server: (local)\\SQLEXPRESS");
    console.log("📊 Tables created: users, rsvps, guestbook_entries, gallery_images");

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    try {
      await masterPool.close();
      await dbPool.close();
    } catch (e) {
      // ignore
    }
  }
}

createDatabase();
