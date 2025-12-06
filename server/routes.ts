import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import db from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // RSVP Routes
  app.get("/api/rsvps", async (req, res) => {
    try {
      const rsvps = db.prepare("SELECT * FROM rsvps ORDER BY createdAt DESC").all();
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
  });

  app.post("/api/rsvps", async (req, res) => {
    try {
      const { name, email, phone, numberOfGuests, dietaryRestrictions, specialRequests } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const stmt = db.prepare(
        `INSERT INTO rsvps (name, email, phone, numberOfGuests, dietaryRestrictions, specialRequests, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      );
      
      const result = stmt.run(
        name,
        email,
        phone || null,
        numberOfGuests || 1,
        dietaryRestrictions || null,
        specialRequests || null,
        "pending"
      );

      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      console.error("Error creating RSVP:", error);
      res.status(500).json({ error: "Failed to create RSVP" });
    }
  });

  // Guestbook Routes
  app.get("/api/guestbook", async (req, res) => {
    try {
      const entries = db.prepare(
        "SELECT * FROM guestbook_entries WHERE is_approved = 1 ORDER BY createdAt DESC"
      ).all();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching guestbook entries:", error);
      res.status(500).json({ error: "Failed to fetch guestbook entries" });
    }
  });

  app.post("/api/guestbook", async (req, res) => {
    try {
      const { name, message, email } = req.body;

      if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required" });
      }

      const stmt = db.prepare(
        `INSERT INTO guestbook_entries (name, message, email, is_approved)
         VALUES (?, ?, ?, ?)`
      );

      const result = stmt.run(name, message, email || null, 1);

      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      console.error("Error creating guestbook entry:", error);
      res.status(500).json({ error: "Failed to create guestbook entry" });
    }
  });

  // Gallery Routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = db.prepare("SELECT * FROM gallery_images ORDER BY createdAt DESC").all();
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const images = db.prepare(
        "SELECT * FROM gallery_images WHERE category = ? ORDER BY createdAt DESC"
      ).all(category);
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const { title, description, imageUrl, thumbnailUrl, category, uploadedBy } = req.body;

      if (!title || !imageUrl) {
        return res.status(400).json({ error: "Title and imageUrl are required" });
      }

      const stmt = db.prepare(
        `INSERT INTO gallery_images (title, description, imageUrl, thumbnailUrl, category, uploadedBy)
         VALUES (?, ?, ?, ?, ?, ?)`
      );

      const result = stmt.run(
        title,
        description || null,
        imageUrl,
        thumbnailUrl || null,
        category || "general",
        uploadedBy || null
      );

      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      console.error("Error creating gallery image:", error);
      res.status(500).json({ error: "Failed to create gallery image" });
    }
  });

  return httpServer;
}
