export interface Rsvp {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: "pending" | "confirmed" | "declined";
  numberOfGuests: number;
  dietaryRestrictions: string | null;
  specialRequests: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  email: string | null;
  isApproved: boolean;
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  category: string;
  uploadedBy: string | null;
  createdAt: Date;
}
