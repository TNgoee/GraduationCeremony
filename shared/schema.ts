import { z } from "zod";
import { ObjectId } from "mongodb";

// User Schema
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export interface User {
  _id?: ObjectId;
  id?: string;
  username: string;
  password: string;
}

// RSVP Schema
export interface RSVP {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  numberOfGuests?: number;
  dietaryRestrictions?: string | null;
  specialRequests?: string | null;
  status?: string;
  createdAt?: Date;
}

// Guestbook Entry Schema
export interface GuestbookEntry {
  _id?: ObjectId;
  id?: string;
  name: string;
  message: string;
  email?: string | null;
  isApproved?: boolean;
  createdAt?: Date;
}

// Gallery Image Schema
export interface GalleryImage {
  _id?: ObjectId;
  id?: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  thumbnailUrl?: string | null;
  category?: string;
  uploadedBy?: string | null;
  createdAt?: Date;
}

// Collection names
export const COLLECTIONS = {
  USERS: "users",
  RSVPS: "rsvps",
  GUESTBOOK_ENTRIES: "guestbook_entries",
  GALLERY_IMAGES: "gallery_images",
} as const;
