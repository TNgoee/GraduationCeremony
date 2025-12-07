import type { Express } from "express";
import { createServer, type Server } from "http";
import { ObjectId } from "mongodb";
import { COLLECTIONS, type RSVP, type GuestbookEntry, type GalleryImage } from "../shared/schema";
import db from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // RSVP Routes
  app.get("/api/rsvps", async (req, res) => {
    try {
      const database = await db.getDb();
      const rsvpsData = await database
        .collection<RSVP>(COLLECTIONS.RSVPS)
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      // Convert _id to id for frontend compatibility
      const formattedData = rsvpsData.map((rsvp) => {
        const { _id, ...rest } = rsvp;
        return {
          ...rest,
          id: _id?.toString(),
          createdAt: rsvp.createdAt ? new Date(rsvp.createdAt).toISOString() : new Date().toISOString(),
        };
      });

      res.json(formattedData);
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

      const database = await db.getDb();
      const newRSVP: RSVP = {
        name,
        email,
        phone: phone || null,
        numberOfGuests: numberOfGuests || 1,
        dietaryRestrictions: dietaryRestrictions || null,
        specialRequests: specialRequests || null,
        status: "pending",
        createdAt: new Date(),
      };

      const result = await database.collection<RSVP>(COLLECTIONS.RSVPS).insertOne(newRSVP);

      res.json({ success: true, id: result.insertedId.toString() });
    } catch (error) {
      console.error("Error creating RSVP:", error);
      res.status(500).json({ error: "Failed to create RSVP" });
    }
  });

  // Guestbook Routes
  app.get("/api/guestbook", async (req, res) => {
    try {
      const database = await db.getDb();
      const entries = await database
        .collection<GuestbookEntry>(COLLECTIONS.GUESTBOOK_ENTRIES)
        .find({ isApproved: true })
        .sort({ createdAt: -1 })
        .toArray();

      // Convert _id to id for frontend compatibility
      const formattedData = entries.map((entry) => {
        const { _id, ...rest } = entry;
        return {
          ...rest,
          id: _id?.toString(),
          createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : new Date().toISOString(),
        };
      });

      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching guestbook entries:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error("Error details:", { errorMessage, errorStack });
      res.status(500).json({
        error: "Failed to fetch guestbook entries",
        message: errorMessage
      });
    }
  });

  app.post("/api/guestbook", async (req, res) => {
    try {
      const { name, message, email } = req.body;

      if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required" });
      }

      const database = await db.getDb();
      const newEntry: GuestbookEntry = {
        name,
        message,
        email: email || null,
        isApproved: true, // Auto-approve for now, or change to false if moderation is needed
        createdAt: new Date(),
      };

      const result = await database.collection<GuestbookEntry>(COLLECTIONS.GUESTBOOK_ENTRIES).insertOne(newEntry);

      res.json({ success: true, id: result.insertedId.toString() });
    } catch (error) {
      console.error("Error creating guestbook entry:", error);
      res.status(500).json({ error: "Failed to create guestbook entry" });
    }
  });

  // Gallery Routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const database = await db.getDb();
      const images = await database
        .collection<GalleryImage>(COLLECTIONS.GALLERY_IMAGES)
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      // Convert _id to id for frontend compatibility
      const formattedData = images.map((image) => {
        const { _id, ...rest } = image;
        return {
          ...rest,
          id: _id?.toString(),
          createdAt: image.createdAt ? new Date(image.createdAt).toISOString() : new Date().toISOString(),
        };
      });

      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const database = await db.getDb();
      const images = await database
        .collection<GalleryImage>(COLLECTIONS.GALLERY_IMAGES)
        .find({ category })
        .sort({ createdAt: -1 })
        .toArray();

      // Convert _id to id for frontend compatibility
      const formattedData = images.map((image) => {
        const { _id, ...rest } = image;
        return {
          ...rest,
          id: _id?.toString(),
          createdAt: image.createdAt ? new Date(image.createdAt).toISOString() : new Date().toISOString(),
        };
      });

      res.json(formattedData);
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

      const database = await db.getDb();
      const newImage: GalleryImage = {
        title,
        description: description || null,
        imageUrl,
        thumbnailUrl: thumbnailUrl || null,
        category: category || "general",
        uploadedBy: uploadedBy || null,
        createdAt: new Date(),
      };

      const result = await database.collection<GalleryImage>(COLLECTIONS.GALLERY_IMAGES).insertOne(newImage);

      res.json({ success: true, id: result.insertedId.toString() });
    } catch (error) {
      console.error("Error creating gallery image:", error);
      res.status(500).json({ error: "Failed to create gallery image" });
    }
  });

  return httpServer;
}
