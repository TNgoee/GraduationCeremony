import sql from "mssql";

const connectionString = process.env.MSSQL_CONNECTION_STRING || 
  `Server=localhost\\SQLEXPRESS;Database=Graduation;Trusted_Connection=true;TrustServerCertificate=true;`;

const setupDB = async () => {
  const pool = new sql.ConnectionPool(connectionString);
  
  try {
    await pool.connect();
    console.log("Connected to SQL Server");
    
    // Create rsvps table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'rsvps')
      BEGIN
        CREATE TABLE rsvps (
          id INT PRIMARY KEY IDENTITY(1,1),
          name NVARCHAR(MAX) NOT NULL,
          email NVARCHAR(MAX) NOT NULL,
          phone NVARCHAR(MAX),
          numberOfGuests INT DEFAULT 1,
          dietaryRestrictions NVARCHAR(MAX),
          specialRequests NVARCHAR(MAX),
          status NVARCHAR(MAX) DEFAULT 'pending'
        )
      END
    `);
    console.log("✓ rsvps table ready");
    
    // Create guestbook_entries table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'guestbook_entries')
      BEGIN
        CREATE TABLE guestbook_entries (
          id INT PRIMARY KEY IDENTITY(1,1),
          name NVARCHAR(MAX) NOT NULL,
          message NVARCHAR(MAX) NOT NULL,
          email NVARCHAR(MAX),
          is_approved BIT DEFAULT 0
        )
      END
    `);
    console.log("✓ guestbook_entries table ready");
    
    // Create gallery_images table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'gallery_images')
      BEGIN
        CREATE TABLE gallery_images (
          id INT PRIMARY KEY IDENTITY(1,1),
          title NVARCHAR(MAX) NOT NULL,
          description NVARCHAR(MAX),
          imageUrl NVARCHAR(MAX) NOT NULL,
          thumbnailUrl NVARCHAR(MAX),
          category NVARCHAR(MAX) DEFAULT 'general',
          uploadedBy NVARCHAR(MAX)
        )
      END
    `);
    console.log("✓ gallery_images table ready");
    
    console.log("✓ Database setup complete!");
    await pool.close();
  } catch (error) {
    console.error("Database setup error:", error);
    process.exit(1);
  }
};

setupDB();
