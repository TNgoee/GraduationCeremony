@echo off
setlocal enabledelayedexpansion

echo 🔄 Starting automatic database creation...
echo.

set "SERVER=(local)\SQLEXPRESS"
set "DB_NAME=Graduation"

echo 📡 Connecting to SQL Server...
echo 📍 Server: %SERVER%
echo 📍 Database: %DB_NAME%
echo.

REM Create database
echo 📁 Creating database...
sqlcmd -S %SERVER% -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'%DB_NAME%') CREATE DATABASE [%DB_NAME%]"

if !errorlevel! equ 0 (
    echo ✓ Database created/verified
) else (
    echo ✗ Failed to create database
    exit /b 1
)

echo.
echo 📊 Creating tables...
echo.

REM Create users table
echo ⏳ Creating table 'users'...
sqlcmd -S %SERVER% -d %DB_NAME% -Q ^
"IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U') ^
CREATE TABLE [users] ( ^
  [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(), ^
  [username] VARCHAR(255) NOT NULL UNIQUE, ^
  [password] VARCHAR(MAX) NOT NULL ^
)"

if !errorlevel! equ 0 (
    echo ✓ Table 'users' created/verified
)

REM Create rsvps table
echo ⏳ Creating table 'rsvps'...
sqlcmd -S %SERVER% -d %DB_NAME% -Q ^
"IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='rsvps' and xtype='U') ^
CREATE TABLE [rsvps] ( ^
  [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(), ^
  [name] TEXT NOT NULL, ^
  [email] TEXT NOT NULL, ^
  [phone] TEXT, ^
  [status] TEXT NOT NULL DEFAULT 'pending', ^
  [number_of_guests] INT DEFAULT 1, ^
  [dietary_restrictions] TEXT, ^
  [special_requests] TEXT, ^
  [created_at] DATETIME2 DEFAULT GETDATE(), ^
  [updated_at] DATETIME2 DEFAULT GETDATE() ^
)"

if !errorlevel! equ 0 (
    echo ✓ Table 'rsvps' created/verified
)

REM Create guestbook_entries table
echo ⏳ Creating table 'guestbook_entries'...
sqlcmd -S %SERVER% -d %DB_NAME% -Q ^
"IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='guestbook_entries' and xtype='U') ^
CREATE TABLE [guestbook_entries] ( ^
  [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(), ^
  [name] TEXT NOT NULL, ^
  [message] TEXT NOT NULL, ^
  [email] TEXT, ^
  [is_approved] BIT DEFAULT 0, ^
  [created_at] DATETIME2 DEFAULT GETDATE() ^
)"

if !errorlevel! equ 0 (
    echo ✓ Table 'guestbook_entries' created/verified
)

REM Create gallery_images table
echo ⏳ Creating table 'gallery_images'...
sqlcmd -S %SERVER% -d %DB_NAME% -Q ^
"IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='gallery_images' and xtype='U') ^
CREATE TABLE [gallery_images] ( ^
  [id] VARCHAR(36) PRIMARY KEY DEFAULT NEWID(), ^
  [title] TEXT NOT NULL, ^
  [description] TEXT, ^
  [image_url] TEXT NOT NULL, ^
  [thumbnail_url] TEXT, ^
  [category] TEXT DEFAULT 'general', ^
  [uploaded_by] TEXT, ^
  [created_at] DATETIME2 DEFAULT GETDATE() ^
)"

if !errorlevel! equ 0 (
    echo ✓ Table 'gallery_images' created/verified
)

echo.
echo ✅ Database creation completed successfully!
echo.
echo 📍 Database: %DB_NAME%
echo 📍 Server: %SERVER%
echo 📊 Tables created: users, rsvps, guestbook_entries, gallery_images
echo.

endlocal
